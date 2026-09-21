import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import useDashboardStats from '../hooks/useDashboardStats';

const OverviewTab = ({ orders = [], users = [], products = [] }) => {
  // Lấy dữ liệu đã được tính toán sẵn từ Hook
  const {
    totalRevenue,
    totalOrders,
    pendingOrdersCount,
    processingOrdersCount,
    completedOrdersCount,
    cancelledOrdersCount,
    totalUsers,
    totalProducts,
    outOfStockProducts,
    chartDataMonthly,
    orderStatusChartData
  } = useDashboardStats(orders, users, products);

  // Hàm format tiền tệ Việt Nam VNĐ
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount || 0);
  };

  return (
    <div style={styles.container}>
      {/* HEADER TAB */}
      <div style={styles.header}>
        <h1 style={styles.title}>Tổng quan hệ thống</h1>
        <p style={styles.subtitle}>Báo cáo số liệu kinh doanh và hoạt động của cửa hàng</p>
      </div>

      {/* THẺ CHỈ SỐ TỔNG QUAN (STAT CARDS) */}
      <div style={styles.cardGrid}>
        {/* Card 1: Doanh thu */}
        <div style={{ ...styles.card, borderLeft: '4px solid #10b981' }}>
          <div style={styles.cardInfo}>
            <span style={styles.cardTitle}>Tổng doanh thu</span>
            <span style={styles.cardValue}>{formatCurrency(totalRevenue)}</span>
            <span style={styles.cardDesc}>Tất cả đơn hàng thành công</span>
          </div>
          <div style={{ ...styles.cardIcon, backgroundColor: '#ecfdf5', color: '#10b981' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
        </div>

        {/* Card 2: Đơn hàng */}
        <div style={{ ...styles.card, borderLeft: '4px solid #3b82f6' }}>
          <div style={styles.cardInfo}>
            <span style={styles.cardTitle}>Tổng đơn hàng</span>
            <span style={styles.cardValue}>{totalOrders}</span>
            <span style={styles.cardDesc}>{completedOrdersCount} đã hoàn thành</span>
          </div>
          <div style={{ ...styles.cardIcon, backgroundColor: '#eff6ff', color: '#3b82f6' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </div>
        </div>

        {/* Card 3: Đơn chờ xử lý */}
        <div style={{ ...styles.card, borderLeft: '4px solid #f59e0b' }}>
          <div style={styles.cardInfo}>
            <span style={styles.cardTitle}>Đơn cần xử lý</span>
            <span style={styles.cardValue}>{pendingOrdersCount + processingOrdersCount}</span>
            <span style={styles.cardDesc}>{pendingOrdersCount} chờ xác nhận</span>
          </div>
          <div style={{ ...styles.cardIcon, backgroundColor: '#fffbeb', color: '#f59e0b' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
        </div>

        {/* Card 4: Khách hàng */}
        <div style={{ ...styles.card, borderLeft: '4px solid #8b5cf6' }}>
          <div style={styles.cardInfo}>
            <span style={styles.cardTitle}>Khách hàng</span>
            <span style={styles.cardValue}>{totalUsers}</span>
            <span style={styles.cardDesc}>Tài khoản зарегистрирован</span>
          </div>
          <div style={{ ...styles.cardIcon, backgroundColor: '#f5f3ff', color: '#8b5cf6' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>

        {/* Card 5: Sản phẩm */}
        <div style={{ ...styles.card, borderLeft: '4px solid #06b6d4' }}>
          <div style={styles.cardInfo}>
            <span style={styles.cardTitle}>Tổng sản phẩm</span>
            <span style={styles.cardValue}>{totalProducts}</span>
            <span style={styles.cardDesc}>{outOfStockProducts} hết hàng</span>
          </div>
          <div style={{ ...styles.cardIcon, backgroundColor: '#ecfeff', color: '#06b6d4' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* KHU VỰC BIỂU ĐỒ (CHARTS) */}
      <div style={styles.chartGrid}>
        {/* Biểu đồ Doanh thu theo tháng */}
        <div style={styles.chartCard}>
          <div style={styles.chartHeader}>
            <h3 style={styles.chartTitle}>Doanh thu năm nay</h3>
            <span style={styles.chartSubtitle}>Tính bằng Việt Nam Đồng (VNĐ)</span>
          </div>
          <div style={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={chartDataMonthly} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  tickFormatter={(val) => `${val / 1000000}M`}
                />
                <Tooltip
                  formatter={(value) => [formatCurrency(value), 'Doanh thu']}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: 'none' }}
                />
                <Area type="monotone" dataKey="doanhThu" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" name="Doanh thu" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Biểu đồ Phân bổ trạng thái đơn hàng */}
        <div style={styles.chartCard}>
          <div style={styles.chartHeader}>
            <h3 style={styles.chartTitle}>Trạng thái đơn hàng</h3>
            <span style={styles.chartSubtitle}>Phân bổ theo số lượng đơn</span>
          </div>
          <div style={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={orderStatusChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} allowDecimals={false} />
                <Tooltip
                  formatter={(value) => [`${value} đơn`, 'Số lượng']}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: 'none' }}
                />
                <Legend />
                <Bar dataKey="value" name="Số lượng đơn" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  header: {
    marginBottom: '8px'
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#0f172a',
    margin: 0
  },
  subtitle: {
    fontSize: '14px',
    color: '#64748b',
    marginTop: '4px',
    margin: 0
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
  },
  cardInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  cardTitle: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.025em'
  },
  cardValue: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#0f172a',
    margin: '6px 0 2px 0'
  },
  cardDesc: {
    fontSize: '12px',
    color: '#94a3b8'
  },
  cardIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  chartGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
    gap: '20px'
  },
  chartCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
  },
  chartHeader: {
    marginBottom: '20px'
  },
  chartTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#0f172a',
    margin: 0
  },
  chartSubtitle: {
    fontSize: '12px',
    color: '#94a3b8',
    marginTop: '2px',
    display: 'block'
  },
  chartWrapper: {
    width: '100%',
    height: '320px'
  }
};

export default OverviewTab;