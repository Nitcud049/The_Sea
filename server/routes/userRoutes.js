const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

const {
    requireAuth,
    requireAdmin
} = userController;

// ==========================================
// 1. ĐĂNG NHẬP GOOGLE
// Không yêu cầu token của website trước khi đăng nhập.
// ==========================================

router.post(
    '/google-login',
    userController.googleLogin
);

// ==========================================
// 2. ĐĂNG NHẬP EMAIL + OTP
// ==========================================

router.post(
    '/send-otp-google',
    userController.sendOtpGoogle
);

router.post(
    '/verify-google',
    userController.verifyGoogle
);

// ==========================================
// 3. ĐĂNG KÝ TÀI KHOẢN + OTP
// ==========================================

router.post(
    '/send-otp-register',
    userController.sendOtpRegister
);

router.post(
    '/register',
    userController.register
);

// ==========================================
// 4. QUÊN MẬT KHẨU + OTP
// ==========================================

router.post(
    '/send-otp-forgot',
    userController.sendOtpForgot
);

router.post(
    '/reset-password',
    userController.resetPassword
);

// ==========================================
// 5. ĐĂNG NHẬP BẰNG TÊN ĐĂNG NHẬP / MẬT KHẨU
// ==========================================

router.post(
    '/login',
    userController.login
);

// ==========================================
// 6. DANH SÁCH NGƯỜI DÙNG
// Chỉ Admin được truy cập.
// ==========================================

router.get(
    '/users',
    requireAuth,
    requireAdmin,
    userController.getAllUsers
);

// ==========================================
// 7. CẬP NHẬT HỒ SƠ
// Phải đăng nhập.
// Controller kiểm tra: chính chủ hoặc Admin.
// ==========================================

router.put(
    '/users/:id',
    requireAuth,
    userController.updateUser
);

// ==========================================
// 8. XÓA KHÁCH HÀNG
// Chỉ Admin được thao tác.
// Controller ngăn xóa tài khoản Admin.
// ==========================================

router.delete(
    '/users/:id',
    requireAuth,
    requireAdmin,
    userController.deleteUser
);

// ==========================================
// 9. THÊM / BỎ SẢN PHẨM YÊU THÍCH
// Phải đăng nhập.
// Controller kiểm tra: chính chủ hoặc Admin.
// ==========================================

router.post(
    '/users/:id/wishlist',
    requireAuth,
    userController.toggleWishlist
);

module.exports = router;