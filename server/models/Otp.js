const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 180 } // Tự động xóa khỏi MongoDB sau 3 phút (180 giây)
});

module.exports = mongoose.model('Otp', otpSchema);