const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  gender: { type: String, required: true },
  category: { type: String, required: true },
  isNewProduct: { type: Boolean, default: false },
  isSale: { type: Boolean, default: false },
  description: { type: String, default: "" },
  reviews: { type: Array, default: [] },

  likesCount: { type: Number, default: 0 },
  
  // ==========================================
  // CẤU TRÚC MÀU SẮC ĐÃ ĐƯỢC MỞ KHÓA
  // ==========================================
  
  // 1. Màu gốc của sản phẩm (Mặc định)
  defaultColorName: { type: String, default: "" },
  defaultColorCode: { type: String, default: "#ffffff" },
  
  // 2. Danh sách các màu biến thể (Thêm vào)
  colors: [{
    colorName: { type: String },
    colorCode: { type: String }, // Trường này bắt buộc phải có để nhận mã HEX
    colorImage: { type: String }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);