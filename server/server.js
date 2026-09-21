const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// 1. CẤU HÌNH MIDDLEWARE
app.use(cors());
app.use(express.json());

// 2. IMPORT CÁC ROUTES ĐÃ TÁCH
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
// 3. GẮN (MOUNT) ROUTES VÀO URL
app.use('/api', userRoutes); 
app.use('/api/products', productRoutes); 
app.use('/api/orders', orderRoutes);
app.use(reviewRoutes);
// ==========================================
// 4. API: CẤU HÌNH (SETTINGS) & ADMIN THỐNG KÊ
// (Các API nhỏ gọn giữ lại đây để tránh phải tạo thêm file)
// ==========================================
const Settings = require('./models/Settings');
const Product = require('./models/Product');

// Homepage Settings
app.get('/api/settings/homepage', async (req, res) => {
    try {
        const settings = await Settings.findOne({ name: 'homepage' });
        res.status(200).json(settings ? settings.config : null);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

const requireAdminGuard = (req, res, next) => {
    if (req.headers['x-user-role'] === 'admin') next();
    else res.status(403).json({ success: false, message: "🚨 Kẻ gian xâm nhập! Yêu cầu quyền Admin." });
};

app.post('/api/settings/homepage', requireAdminGuard, async (req, res) => {
    try {
        let settings = await Settings.findOne({ name: 'homepage' });
        if (!settings) settings = new Settings({ name: 'homepage', config: req.body.config });
        else settings.config = req.body.config;
        await settings.save();
        res.status(200).json({ success: true });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

// Admin Thống kê
app.get('/api/admin/top-liked-products', async (req, res) => {
    try { res.status(200).json(await Product.find().sort({ likesCount: -1 }).limit(10)); } 
    catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

app.get('/api/admin/generate-fake-likes', async (req, res) => {
    try {
        const products = await Product.find();
        for (let p of products) { 
            p.likesCount = Math.floor(Math.random() * 490) + 10; 
            await p.save(); 
        }
        res.json({ success: true, message: "Đã cập nhật lượt tim ngẫu nhiên!" });
    } catch (error) { res.status(500).json({ success: false, message: "Lỗi máy chủ" }); }
});

// ==========================================
// 5. KẾT NỐI DATABASE & CHẠY SERVER
// ==========================================
mongoose.connect('mongodb://127.0.0.1:27017/shop_quanao')
  .then(() => console.log("MongoDB Connected Chuẩn! Đã sẵn sàng."))
  .catch(err => console.log("Lỗi kết nối DB:", err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server đang chạy tại http://localhost:${PORT}`));