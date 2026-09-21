const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        name: String,
        phone: String,
        address: String,
        email: String, 
    },
    items: Array,
    total: Number,
    
    username: String,
    paymentInfo: {
        method: String,
        bank: String,
        amountPaid: Number
    },
    status: { type: String, default: 'Chờ xử lý' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);