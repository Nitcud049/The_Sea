const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Quản lý mã OTP qua đây
    phone: { type: String, required: true, unique: true }, // Chống trùng số điện thoại
    address: { type: String, required: true },
    wishlist: { type: [String], default: [] }
});

module.exports = mongoose.model('User', userSchema);