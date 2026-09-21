const mongoose = require('mongoose');

const dailySalesStatisticSchema = new mongoose.Schema({
    reportDate: { 
        type: String, 
        required: true, 
        unique: true 
    }, // Định dạng ngày: 'YYYY-MM-DD'
    totalOrders: { type: Number, default: 0 },     // Tổng số đơn hàng trong ngày
    totalItemsSold: { type: Number, default: 0 },  // Tổng số lượng món hàng bán ra
    totalRevenue: { type: Number, default: 0 },    // Tổng doanh thu
    totalCost: { type: Number, default: 0 },       // Tổng giá vốn
    totalProfit: { type: Number, default: 0 }      // Lợi nhuận gộp
}, { 
    timestamps: true 
});

module.exports = mongoose.model('DailySalesStatistic', dailySalesStatisticSchema);