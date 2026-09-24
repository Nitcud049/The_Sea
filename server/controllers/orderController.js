const mongoose = require('mongoose');
const Order = require('../models/Order');

const {
    sendOrderStatusEmail
} = require('../services/orderEmail');

const {
    buildOrderPricing
} = require('../services/orderPricing');

// Chỉ chấp nhận số tiền hợp lệ, không suy đoán đơn vị.
const isValidAmount = (value) => {
    return (
        typeof value === 'number' &&
        Number.isFinite(value) &&
        value >= 0
    );
};

// Gửi email sau khi cập nhật DB.
// Lỗi email không biến một lần cập nhật thành thất bại.
const queueOrderStatusEmail = (order, status) => {
    if (!order.customer?.email) return;

    Promise.resolve()
        .then(() => sendOrderStatusEmail(order, status))
        .catch(() => {
            console.error(
                'Không gửi được email trạng thái đơn:',
                String(order._id)
            );
        });
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({
            createdAt: -1
        });

        return res.json(orders);
    } catch (error) {
        console.error('Lỗi lấy danh sách đơn hàng:', error);

        return res.status(500).json({
            success: false,
            message: 'Không thể tải danh sách đơn hàng'
        });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const { username } = req.query;

        if (!username) {
            return res.json([]);
        }

        const myOrders = await Order.find({
            username
        }).sort({
            createdAt: -1
        });

        return res.json(myOrders);
    } catch (error) {
        console.error('Lỗi lấy đơn hàng cá nhân:', error);

        return res.status(500).json({
            success: false,
            message: 'Không thể tải đơn hàng'
        });
    }
};

// Tạo đơn hàng.
// Giá và số tiền yêu cầu thanh toán do orderPricing tính.
const createOrder = async (req, res) => {
    try {
        const {
            customer = {},
            username = null,
            paymentInfo = {},
            displayCurrency,
            idempotencyKey
        } = req.body;

        if (idempotencyKey) {
            const existingOrder = await Order.findOne({
                idempotencyKey
            });

            if (existingOrder) {
                return res.status(200).json({
                    success: true,
                    duplicate: true,
                    orderId: existingOrder._id
                });
            }
        }

        const customerEmail = String(customer.email || '')
            .trim()
            .toLowerCase();

        const validEmail = /^\S+@\S+\.\S+$/.test(
            customerEmail
        );

        if (
            !customer.name ||
            !customer.phone ||
            !customer.address ||
            !validEmail
        ) {
            return res.status(400).json({
                success: false,
                message: 'Thông tin khách hàng không hợp lệ'
            });
        }

        if (!paymentInfo.bank) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng chọn ngân hàng thanh toán'
            });
        }

        const pricing = await buildOrderPricing({
            items: req.body.items,
            paymentMethod: paymentInfo.method,
            displayCurrency,
            idempotencyKey
        });

        const orderData = {
            customer: {
                ...customer,
                email: customerEmail
            },

            username,
            items: pricing.items,

            // Dữ liệu gốc luôn là USD.
            total: pricing.total,
            currency: pricing.currency,
            moneyVersion: pricing.moneyVersion,

            displayCurrency: pricing.displayCurrency,
            exchangeRates: pricing.exchangeRates,
            paymentReference: pricing.paymentReference,

            paymentInfo: {
                method: pricing.paymentMethod,
                bank: paymentInfo.bank,

                // Khoản khách cần thanh toán, tính bằng USD.
                amountDue: pricing.amountDue,

                // Chưa xác nhận nhận tiền khi mới tạo đơn.
                amountPaid: 0
            },

            idempotencyKey,
            status: 'processing'
        };

        const order = new Order(orderData);
        await order.save();

        return res.status(201).json({
            success: true,
            orderId: order._id,
            paymentQuote: pricing
        });
    } catch (error) {
        // Chỉ trả duplicate thành công khi thực sự tìm thấy đơn.
        if (error.code === 11000 && req.body.idempotencyKey) {
            try {
                const existingOrder = await Order.findOne({
                    idempotencyKey: req.body.idempotencyKey
                });

                if (existingOrder) {
                    return res.status(200).json({
                        success: true,
                        duplicate: true,
                        orderId: existingOrder._id
                    });
                }
            } catch (lookupError) {
                console.error(
                    'Lỗi tra cứu đơn trùng:',
                    lookupError
                );
            }
        }

        console.error('Lỗi tạo đơn:', error);

        const statusCode =
            Number.isInteger(error.statusCode) &&
            error.statusCode >= 400 &&
            error.statusCode <= 599
                ? error.statusCode
                : 500;

        return res.status(statusCode).json({
            success: false,
            message: error.message || 'Không thể tạo đơn hàng'
        });
    }
};

const getOrderQuote = async (req, res) => {
    try {
        const pricing = await buildOrderPricing(req.body);

        return res.status(200).json({
            success: true,
            paymentQuote: pricing
        });
    } catch (error) {
        const statusCode =
            Number.isInteger(error.statusCode) &&
            error.statusCode >= 400 &&
            error.statusCode <= 599
                ? error.statusCode
                : 500;

        return res.status(statusCode).json({
            success: false,
            message: error.message || 'Không thể tính giá đơn hàng'
        });
    }
};

// Route gọi hàm này phải được bảo vệ bằng middleware xác thực Admin.
// Chọn "confirmed" có nghĩa Admin đã kiểm tra nhận đủ amountDue.
const updateOrderStatus = async (req, res) => {
    try {
        const {
            status,
            confirmRemainingPayment
        } = req.body;

        const allowedStatuses = [
            'processing',
            'confirmed',
            'shipping',
            'completed',
            'cancelled'
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Trạng thái không hợp lệ'
            });
        }

        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: 'Mã đơn hàng không hợp lệ'
            });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy đơn hàng'
            });
        }

        const currentStatus =
            order.status === 'pending'
                ? 'processing'
                : order.status;

        const transitions = {
            processing: ['confirmed', 'cancelled'],
            confirmed: ['shipping', 'cancelled'],
            shipping: ['completed', 'cancelled'],
            completed: [],
            cancelled: []
        };

        // Cho phép chọn lại trạng thái hiện tại.
        // Riêng confirmed có thể sửa đơn từng bị đổi trạng thái
        // nhưng chưa ghi nhận khoản tiền trong DB.
        if (
            status !== currentStatus &&
            !(transitions[currentStatus] || []).includes(status)
        ) {
            return res.status(409).json({
                success: false,
                message:
                    `Không thể chuyển từ "${currentStatus}" sang "${status}"`
            });
        }

        if (
            status === currentStatus &&
            status !== 'confirmed'
        ) {
            // Không ghi lại DB và không gửi lại email.
            return res.status(200).json(order);
        }

        const currency = String(order.currency || '')
            .trim()
            .toUpperCase();

        const isUSD =
            currency === 'USD' ||
            (
                !currency &&
                order.moneyVersion === 'usd-base-v1'
            );

        const total = order.total;
        const amountDue = order.paymentInfo?.amountDue;
        const amountPaid = order.paymentInfo?.amountPaid;

        const validMoney =
            isUSD &&
            isValidAmount(total) &&
            isValidAmount(amountDue) &&
            isValidAmount(amountPaid) &&
            amountDue <= total &&
            amountPaid <= total;

        const updates = {
            status
        };

        // Hủy đơn không tự hoàn tiền hoặc xóa tiền đã nhận.
        if (status !== 'cancelled') {
            if (!validMoney) {
                return res.status(409).json({
                    success: false,
                    message:
                        'Dữ liệu tiền của đơn chưa hợp lệ hoặc chưa được chuẩn hóa USD. Vui lòng kiểm tra trước khi xác nhận.'
                });
            }

            if (status === 'confirmed') {
                // Không cộng thêm tiền mỗi lần xác nhận.
                // Không giảm tiền nếu trước đó đã nhận nhiều hơn amountDue.
                const nextAmountPaid = Math.max(
                    amountPaid,
                    amountDue
                );

                if (
                    currentStatus === 'confirmed' &&
                    nextAmountPaid === amountPaid
                ) {
                    return res.status(200).json(order);
                }

                updates['paymentInfo.amountPaid'] =
                    nextAmountPaid;
            }

            if (status === 'shipping') {
                if (amountPaid < amountDue) {
                    return res.status(409).json({
                        success: false,
                        message:
                            'Chưa ghi nhận đủ khoản thanh toán ban đầu. Hãy xác nhận nhận tiền trước khi giao hàng.'
                    });
                }
            }

            if (status === 'completed') {
                const remainingUSD = total - amountPaid;

                if (
                    remainingUSD > 0 &&
                    confirmRemainingPayment !== true
                ) {
                    return res.status(409).json({
                        success: false,
                        code: 'REMAINING_PAYMENT_CONFIRMATION_REQUIRED',
                        message:
                            'Đơn còn tiền phải thu. Cần xác nhận đã nhận đủ tiền còn lại trước khi hoàn tất.',
                        remainingUSD
                    });
                }

                // Chỉ ghi nhận toàn bộ khi không còn nợ,
                // hoặc Admin đã xác nhận thu đủ phần còn lại.
                updates['paymentInfo.amountPaid'] = total;
            }
        }

        // Điều kiện cập nhật chống ghi đè khi hai thao tác
        // cùng sửa một đơn dựa trên dữ liệu khác nhau.
        const filter = {
            _id: order._id,
            status: order.status
        };

        if (order.updatedAt) {
            filter.updatedAt = order.updatedAt;
        }

        if (status !== 'cancelled') {
            filter.total = total;
            filter['paymentInfo.amountDue'] = amountDue;
            filter['paymentInfo.amountPaid'] = amountPaid;
        }

        // Trạng thái và tiền được ghi cùng một lần trên một document.
        const updatedOrder = await Order.findOneAndUpdate(
            filter,
            {
                $set: updates
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedOrder) {
            return res.status(409).json({
                success: false,
                message:
                    'Đơn hàng vừa được cập nhật ở thao tác khác. Hãy làm mới danh sách và thử lại.'
            });
        }

        // Không gửi email tiền tệ cho đơn cũ chưa xác định dữ liệu.
        if (validMoney) {
            queueOrderStatusEmail(updatedOrder, status);
        }

        // Giữ dạng phản hồi là document đơn hàng như code cũ.
        return res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Lỗi cập nhật đơn:', error);

        return res.status(500).json({
            success: false,
            message: 'Không thể cập nhật trạng thái đơn hàng'
        });
    }
};

module.exports = {
    getAllOrders,
    getMyOrders,
    createOrder,
    getOrderQuote,
    updateOrderStatus
};