import React, { useState } from 'react';
import { Package, ArrowRight, RefreshCw } from 'lucide-react';
import styles from '../styles/AdminPanel.module.css';

const OrderListTab = ({ orders = [], updateOrderStatus, formatPrice, onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Hàm xử lý khi bấm nút Làm mới
  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (onRefresh) {
      await onRefresh();
    }
    // Giữ hiệu ứng xoay tối thiểu 500ms để người dùng cảm nhận được thao tác
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'pending':
      case 'processing':
        return { label: 'Đang xử lý', class: styles.statusPending };
      case 'confirmed':
        return { label: 'Đã xác nhận', class: styles.statusConfirmed };
      case 'shipping':
        return { label: 'Đang giao', class: styles.statusShipping };
      case 'completed':
        return { label: 'Thành công', class: styles.statusCompleted };
      case 'cancelled':
        return { label: 'Đã hủy', class: styles.statusCancelled };
      default:
        return { label: 'Không xác định', class: styles.statusPending };
    }
  };

  // Đã cập nhật để đọc đúng cấu trúc paymentInfo từ DB
  const getPaymentDetails = (order) => {
    // 1. Kiểm tra dữ liệu nằm trong object paymentInfo (Cấu trúc chuẩn của bạn)
    if (order.paymentInfo) {
      if (typeof order.paymentInfo.amountPaid === 'number' && order.paymentInfo.amountPaid > 0) {
        // Tránh chia cho 0, làm tròn số %
        const percent = Math.round((order.paymentInfo.amountPaid / order.total) * 100);
        return { paidAmount: order.paymentInfo.amountPaid, percent };
      }
      
      if (String(order.paymentInfo.method).toLowerCase() === 'deposit') {
        const percent = 25;
        const paidAmount = (order.total * percent) / 100;
        return { paidAmount, percent };
      }
    }

    // 2. Fallback: Nếu không có paymentInfo, quét các biến ở root (phòng hờ dữ liệu cũ)
    if (typeof order.paidAmount === 'number' && order.paidAmount > 0 && order.paidAmount <= order.total) {
      const percent = Math.round((order.paidAmount / order.total) * 100);
      return { paidAmount: order.paidAmount, percent };
    }

    let percent = 100;
    const opt = String(
      order.depositPercent || 
      order.paymentPercent || 
      order.paymentOption || 
      order.depositOption || 
      order.paymentType || 
      ''
    ).toLowerCase();

    if (opt.includes('25') || opt.includes('deposit') || opt.includes('coc') || order.isDeposit === true) {
      percent = 25;
    } else if (opt.includes('50')) {
      percent = 50;
    }

    const paidAmount = (order.total * percent) / 100;
    return { paidAmount, percent };
  };

  return (
    <div className={styles.orderWrapper}>
      {/* CSS Keyframes hỗ trợ hiệu ứng xoay cho nút Refresh */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spin-animation {
          animation: spin 0.8s linear infinite;
        }
      `}</style>

      {/* Header chứa Tiêu đề + Nút Làm mới */}
      <div 
        className={styles.orderHeaderTitle} 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '20px' 
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Package size={24} color="#000" />
          <h2 style={{ margin: 0 }}>Quản Lý Đơn Hàng</h2>
        </div>

        <button 
          onClick={handleRefresh}
          disabled={isRefreshing}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: '#f8f9fa',
            border: '1px solid #000',
            borderRadius: '4px',
            cursor: isRefreshing ? 'not-allowed' : 'pointer',
            fontSize: '12px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            transition: 'all 0.2s ease',
            color: '#000'
          }}
          title="Tải lại danh sách đơn hàng mới nhất"
        >
          <RefreshCw 
            size={15} 
            className={isRefreshing ? 'spin-animation' : ''} 
          />
          {isRefreshing ? 'Đang cập nhật...' : 'Làm mới'}
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className={styles.orderTable}>
          <thead>
            <tr>
              <th className={styles.orderTh}>Mã Đơn</th>
              <th className={styles.orderTh}>Khách Hàng</th>
              <th className={styles.orderTh}>Tổng Tiền</th>
              <th className={styles.orderTh}>Đã Thanh Toán</th>
              <th className={styles.orderTh}>Trạng Thái Hiện Tại</th>
              <th className={styles.orderTh} style={{ textAlign: 'right' }}>Cập Nhật Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              [...orders].sort((a, b) => new Date(b.createdAt || b.date || 0) - new Date(a.createdAt || a.date || 0)).map(o => {
                const statusConfig = getStatusConfig(o.status);
                const { paidAmount, percent } = getPaymentDetails(o);

                return (
                  <tr key={o._id}>
                    <td className={styles.orderTd}>
                      <span className={styles.orderId}>#{o._id.substring(0, 8)}</span>
                    </td>
                    <td className={styles.orderTd}>
                      <div className={styles.customerName}>{o.customer?.name || o.username || 'Khách Vãng Lai'}</div>
                      <div className={styles.customerPhone}>{o.customer?.phone || 'Không có SĐT'}</div>
                    </td>
                    <td className={styles.orderTd}>
                      <span className={styles.orderTotal}>{formatPrice(o.total)}</span>
                    </td>

                    <td className={styles.orderTd}>
                      <div className={styles.paidAmount}>{formatPrice(paidAmount)}</div>
                      <span className={`${styles.paymentBadge} ${percent === 100 ? styles.badgeFull : styles.badgeDeposit}`}>
                        {percent === 100 ? 'Thanh toán 100%' : `Đặt cọc ${percent}%`}
                      </span>
                    </td>

                    <td className={styles.orderTd}>
                      <span className={`${styles.statusBadge} ${statusConfig.class}`}>
                        {statusConfig.label}
                      </span>
                    </td>
                    <td className={styles.orderTd} style={{ textAlign: 'right' }}>
                      <div className={styles.updateActionWrapper}>
                        <ArrowRight size={16} color="#999" />
                        <select 
                          value={o.status === 'pending' ? 'processing' : o.status} 
                          onChange={(e) => {
                            if(window.confirm('Cập nhật trạng thái và gửi email thông báo cho khách hàng?')) {
                              updateOrderStatus(o._id, e.target.value);
                            }
                          }}
                          className={styles.orderSelect}
                        >
                          <option value="processing">1. Đang xử lý</option>
                          <option value="confirmed">2. Đã xác nhận ✉️</option>
                          <option value="shipping">3. Đang giao hàng ✉️</option>
                          <option value="completed">4. Giao thành công ✉️</option>
                          <option value="cancelled">Hủy đơn hàng ✉️</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className={styles.emptyTd}>
                  Chưa có đơn hàng nào phát sinh trong hệ thống.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderListTab;