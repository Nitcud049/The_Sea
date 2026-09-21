const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    title: { type: String, default: "Khác" },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    dob: { type: String, default: "" },
    country: { type: String, default: "Việt Nam" },
    wishlist: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);