const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Đăng nhập Google (OAuth)
router.post('/google-login', userController.googleLogin);

// Đăng nhập Gmail + OTP
router.post('/send-otp-google', userController.sendOtpGoogle);
router.post('/verify-google', userController.verifyGoogle);

// Đăng ký mới + OTP
router.post('/send-otp-register', userController.sendOtpRegister);
router.post('/register', userController.register);

// Quên mật khẩu + OTP
router.post('/send-otp-forgot', userController.sendOtpForgot);
router.post('/reset-password', userController.resetPassword);

// Đăng nhập thường
router.post('/login', userController.login);

// Quản lý Users
router.get('/users', userController.getAllUsers);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.post('/users/:id/wishlist', userController.toggleWishlist);

module.exports = router;