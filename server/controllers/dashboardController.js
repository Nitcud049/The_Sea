const Order = require('../models/Order');
const Product = require('../models/Product');

const getDashboardStats = async (req, res) => {
    try {
        // Chỉ lấy các đơn hàng mang lại doanh thu thực tế
        const validOrders = await Order.find({ 
            status: { $in: ['confirmed', 'shipping', 'completed'] } 
        });
        
        let totalRevenue = 0; // Tổng tiền thu về
        let totalProductsSold = 0; // Tổng số lượng sản phẩm bán ra
        const dailySales = {}; // Lưu trữ dữ liệu nhóm theo ngày

        validOrders.forEach(order => {
            // 1. Cộng dồn tổng tiền thu về
            totalRevenue += (order.total || 0);

            // 2. Tính số sản phẩm bán ra 
            // (Giả sử mảng chứa sản phẩm trong Order của bạn tên là 'cart', 'items' hoặc 'products')
            const orderItems = order.items || []; // Đã biết chắc chắn tên mảng là "items"
            let itemsInOrder = 0;
            orderItems.forEach(item => {
                const qty = item.quantity || 1;
                totalProductsSold += qty;
                itemsInOrder += qty;
            });

            // 3. Phân nhóm doanh số bán hàng theo ngày (Format YYYY-MM-DD)
            if (order.createdAt) {
                const date = order.createdAt.toISOString().split('T')[0];
                
                if (!dailySales[date]) {
                    dailySales[date] = { revenue: 0, orders: 0, productsSold: 0 };
                }
                
                dailySales[date].revenue += (order.total || 0);
                dailySales[date].orders += 1; // Số đơn trong ngày
                dailySales[date].productsSold += itemsInOrder; // Số SP bán ra trong ngày
            }
        });

        // Chuyển Object theo ngày thành Mảng (Array) để Frontend dễ đưa vào biểu đồ (Chart.js / Recharts)
        const dailyStatsArray = Object.keys(dailySales).map(date => ({
            date,
            revenue: dailySales[date].revenue,
            orders: dailySales[date].orders,
            productsSold: dailySales[date].productsSold
        })).sort((a, b) => new Date(a.date) - new Date(b.date)); // Sắp xếp ngày từ cũ đến mới

        const totalProductsInStock = await Product.countDocuments();

        res.status(200).json({
            success: true,
            overview: {
                totalRevenue,         // Tổng tiền thu về toàn thời gian
                totalOrders: validOrders.length, // Tổng số đơn thành công
                totalProductsSold,    // Tổng số lượng sản phẩm đã bán ra
                totalProductsInStock  // Tổng số mẫu mã trong kho
            },
            dailyStats: dailyStatsArray // Mảng thống kê theo từng ngày
        });
    } catch (error) {
        console.error("🔥 Lỗi thống kê doanh thu:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Lấy danh sách sản phẩm được yêu thích nhất...
// (Giữ nguyên phần getTopLikedProducts như cũ)