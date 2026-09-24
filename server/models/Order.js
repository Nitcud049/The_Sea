const mongoose = require('mongoose');

// Không cho lưu NaN, Infinity hoặc số âm.
const nonNegativeMoney = {
    validator: (value) => {
        return (
            value === undefined ||
            (
                typeof value === 'number' &&
                Number.isFinite(value) &&
                value >= 0
            )
        );
    },
    message: 'Số tiền phải là số hữu hạn và không âm'
};

const positiveRate = {
    validator: (value) => {
        return (
            value === undefined ||
            (
                typeof value === 'number' &&
                Number.isFinite(value) &&
                value > 0
            )
        );
    },
    message: 'Tỷ giá phải là số hữu hạn và lớn hơn 0'
};

const orderSchema = new mongoose.Schema(
    {
        customer: {
            name: String,
            phone: String,
            address: String,
            email: String
        },

        // Giữ nguyên cấu trúc để không làm mất thông tin màu,
        // ảnh và cartItemKey của các dòng sản phẩm.
        items: {
            type: Array,
            default: []
        },

        // Tổng đơn theo đơn vị USD đối với đơn đã chuẩn hóa.
        total: {
            type: Number,
            required: true,
            validate: nonNegativeMoney
        },

        // Không mặc định USD cho đơn cũ chưa xác định đơn vị.
        currency: {
            type: String,
            enum: ['USD'],
            default: undefined
        },

        // Controller lấy giá trị này từ orderPricing.
        // Ví dụ hiện tại: "usd-base-v1".
        moneyVersion: {
            type: String,
            default: undefined
        },

        // Tiền tệ khách chọn để hiển thị khi đặt đơn.
        displayCurrency: {
            type: String,
            enum: ['USD', 'VND', 'EUR', 'JPY'],
            default: undefined
        },

        // Tỷ giá được lưu tại thời điểm đặt đơn.
        exchangeRates: {
            USD: {
                type: Number,
                validate: {
                    validator: (value) => {
                        return value === undefined || value === 1;
                    },
                    message: 'Tỷ giá USD cơ sở phải bằng 1'
                }
            },
            VND: {
                type: Number,
                validate: positiveRate
            },
            EUR: {
                type: Number,
                validate: positiveRate
            },
            JPY: {
                type: Number,
                validate: positiveRate
            }
        },

        paymentReference: String,

        username: String,

        paymentInfo: {
            method: String,
            bank: String,

            // USD: khoản yêu cầu khách thanh toán ban đầu.
            amountDue: {
                type: Number,
                validate: nonNegativeMoney
            },

            // USD: khoản cửa hàng đã xác nhận nhận được.
            // Không đặt default ở schema để tránh biến dữ liệu
            // thiếu của đơn cũ thành một khoản 0 đã xác định.
            // createOrder đã chủ động gán 0 cho đơn mới.
            amountPaid: {
                type: Number,
                default: undefined,
                validate: nonNegativeMoney
            }
        },

        idempotencyKey: {
            type: String,
            unique: true,
            sparse: true,
            select: false
        },

        status: {
            type: String,
            default: 'processing'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Order', orderSchema);