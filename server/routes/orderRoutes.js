const express = require('express');

const router = express.Router();

const orderController = require('../controllers/orderController');

const {
    requireAuth,
    requireAdmin
} = require('../controllers/userController');

// ==========================================
// 1. LẤY TOÀN BỘ ĐƠN HÀNG — CHỈ ADMIN
// GET /api/orders
// ==========================================

router.get(
    '/',
    requireAuth,
    requireAdmin,
    orderController.getAllOrders
);

// ==========================================
// 2. XEM ĐƠN HÀNG CỦA TÀI KHOẢN ĐANG ĐĂNG NHẬP
// GET /api/orders/my-orders
//
// getMyOrders phải lấy username từ req.user,
// không lấy từ req.query.
// ==========================================

router.get(
    '/my-orders',
    requireAuth,
    orderController.getMyOrders
);

// ==========================================
// 3. BÁO GIÁ
// POST /api/orders/quote
//
// Khách chưa đăng nhập vẫn có thể yêu cầu báo giá.
// ==========================================

router.post(
    '/quote',
    orderController.getOrderQuote
);

// ==========================================
// 4. TẠO ĐƠN HÀNG — PHẢI ĐĂNG NHẬP
// POST /api/orders
//
// Chủ đơn lấy từ tài khoản đã được server xác thực,
// không tin username do trình duyệt gửi lên.
// ==========================================

router.post(
    '/',
    requireAuth,
    (req, res, next) => {
        if (
            !req.body ||
            typeof req.body !== 'object' ||
            Array.isArray(req.body)
        ) {
            return res.status(400).json({
                success: false,
                message: 'Dữ liệu tạo đơn hàng không hợp lệ.'
            });
        }

        req.body = {
            ...req.body,
            username: req.user.username
        };

        next();
    },
    orderController.createOrder
);

// ==========================================
// 5. CẬP NHẬT TRẠNG THÁI — CHỈ ADMIN
// PUT /api/orders/:id
//
// Giữ nguyên body, bao gồm confirmRemainingPayment,
// để controller xử lý xác nhận tiền cọc / tiền còn lại.
// ==========================================

router.put(
    '/:id',
    requireAuth,
    requireAdmin,
    orderController.updateOrderStatus
);

module.exports = router;