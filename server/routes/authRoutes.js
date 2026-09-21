const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/send-otp-google', authController.sendOtpGoogle);
router.post('/verify-google', authController.verifyGoogle);
router.post('/send-otp-register', authController.sendOtpRegister);
router.post('/register', authController.register);
router.post('/send-otp-forgot', authController.sendOtpForgot);
router.post('/reset-password', authController.resetPassword);
router.post('/login', authController.login);

module.exports = router;