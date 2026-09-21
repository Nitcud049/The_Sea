import { useState, useEffect } from 'react';

const useDashboardStats = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    pendingOrdersCount: 0,
    processingOrdersCount: 0,
    completedOrdersCount: 0,
    cancelledOrdersCount: 0,
    totalUsers: 0,
    totalProducts: 0,
    outOfStockProducts: 0,
    chartDataMonthly: [],
    orderStatusChartData: []
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // TẠM THỜI: Sử dụng Mock Data để giao diện Overview hiển thị đầy đủ biểu đồ.
        // Sau khi hoàn thiện toàn bộ Route Backend, bạn sẽ thay thế bằng API fetch ở đây.
        // Ví dụ: const response = await fetch('/api/admin/dashboard-stats');
        
        const mockData = {
          totalRevenue: 245500000, // 245.5 triệu
          totalOrders: 128,
          pendingOrdersCount: 15,
          processingOrdersCount: 8,
          completedOrdersCount: 100,
          cancelledOrdersCount: 5,
          totalUsers: 450,
          totalProducts: 86,
          outOfStockProducts: 4,
          
          // Dữ liệu cho biểu đồ cột/đường (Doanh thu theo tháng)
          chartDataMonthly: [
            { name: 'Tháng 4', revenue: 45000000 },
            { name: 'Tháng 5', revenue: 52000000 },
            { name: 'Tháng 6', revenue: 38000000 },
            { name: 'Tháng 7', revenue: 65000000 },
            { name: 'Tháng 8', revenue: 85000000 },
            { name: 'Tháng 9', revenue: 125000000 } // Tăng vọt
          ],
          
          // Dữ liệu cho biểu đồ tròn (Trạng thái đơn hàng)
          orderStatusChartData: [
            { name: 'Chờ xác nhận', value: 15, color: '#f59e0b' }, // Cam
            { name: 'Đang xử lý', value: 8, color: '#3b82f6' },   // Xanh dương
            { name: 'Hoàn thành', value: 100, color: '#10b981' },  // Xanh lá
            { name: 'Đã hủy', value: 5, color: '#ef4444' }       // Đỏ
          ]
        };

        // Giả lập độ trễ mạng 500ms để test hiệu ứng loading
        setTimeout(() => {
          setStats(mockData);
          setIsLoading(false);
        }, 500);

      } catch (error) {
        console.error("Lỗi khi tải dữ liệu thống kê:", error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { ...stats, isLoading };
};

export default useDashboardStats;