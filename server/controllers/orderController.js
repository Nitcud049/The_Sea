const Order = require('../models/Order');
const { sendOrderStatusEmail } = require('../services/orderEmail');

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (e) { 
        res.status(500).json({ error: "Error" }); 
    }
};

const getMyOrders = async (req, res) => {
    try {
        const { username } = req.query;
        if (!username) return res.json([]);
        const myOrders = await Order.find({ username: username }).sort({ createdAt: -1 });
        res.json(myOrders);
    } catch (e) { 
        res.status(500).json({ error: "Error" }); 
    }
};

// Tạo đơn hàng (Gán mặc định processing)
const createOrder = async (req, res) => { 
    try { 
        const orderData = { ...req.body, status: 'processing' };
        const n = new Order(orderData); 
        await n.save(); 
        res.status(201).json({ success: true, orderId: n._id }); 
    } catch (err) { 
        console.error("🔥 Lỗi tạo đơn:", err);
        res.status(500).json({ success: false, message: err.message }); 
    } 
};

// Cập nhật trạng thái & Gọi Service Gửi Email
const updateOrderStatus = async (req, res) => { 
    try { 
        const { status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true }); 
        
        if (updatedOrder) {
            // Đẩy việc gửi email sang Service xử lý ngầm
            sendOrderStatusEmail(updatedOrder, status);
        }
        
        res.status(200).json(updatedOrder); 
    } catch (err) { 
        console.error("🔥 Lỗi cập nhật đơn:", err);
        res.status(500).json({ message: err.message }); 
    } 
};

module.exports = {
    getAllOrders,
    getMyOrders,
    createOrder,
    updateOrderStatus
};