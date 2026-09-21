const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    name: String,
    config: Object // Dùng kiểu Object để chứa toàn bộ cấu hình (Banner, Link, Title...)
});

module.exports = mongoose.model('Settings', settingsSchema);