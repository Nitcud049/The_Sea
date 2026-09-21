import React, { useState, useEffect } from 'react';

function OrdersModal({ showOrdersModal, setShowOrdersModal, currentUser, formatPrice }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (showOrdersModal && currentUser) {
      setLoading(true);
      const userIdentifier = currentUser.username || currentUser.email || '';
      fetch(`http://127.0.0.1:5000/api/orders/my-orders?username=${encodeURIComponent(userIdentifier)}`)
        .then(res => res.json())
        .then(data => {
          setOrders(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch(err => {
          console.error("Lỗi khi tải đơn hàng:", err);
          setLoading(false);
        });
    }
  }, [showOrdersModal, currentUser]);

  if (!showOrdersModal) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return { label: 'Đã hoàn thành', bg: '#e6f7ed', color: '#12b76a' };
      case 'shipping':
        return { label: 'Đang giao hàng', bg: '#e0f2fe', color: '#0284c7' };
      case 'cancelled':
        return { label: 'Đã hủy', bg: '#fee2e2', color: '#ef4444' };
      case 'processing':
      default:
        return { label: 'Đang xử lý', bg: '#fef3c7', color: '#d97706' };
    }
  };

  return (
    <div 
      style={{
        position: 'fixed', inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(6px)',
        zIndex: 1200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px'
      }}
      onClick={() => setShowOrdersModal(false)}
    >
      <div 
        style={{
          backgroundColor: '#ffffff',
          width: '100%', maxWidth: '650px',
          maxHeight: '85vh',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          animation: 'fadeInScale 0.25s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '22px 28px',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)'
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', letterSpacing: '0.5px', color: '#111' }}>
              Đơn hàng của tôi
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#777' }}>
              Theo dõi tình trạng các đơn hàng bạn đã đặt
            </p>
          </div>
          <button 
            onClick={() => setShowOrdersModal(false)}
            style={{
              background: '#f3f4f6', border: 'none', borderRadius: '50%',
              width: '34px', height: '34px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px', color: '#555', transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px 0', color: '#888' }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>⏳</div>
              <p style={{ fontSize: '14px' }}>Đang tải danh sách đơn hàng...</p>
            </div>
          ) : orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px', color: '#777' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛍️</div>
              <h4 style={{ margin: '0 0 8px', color: '#222', fontSize: '16px' }}>Bạn chưa có đơn hàng nào</h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#888' }}>Khám phá các bộ sưu tập thời trang mới nhất và đặt hàng ngay hôm nay!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {orders.map((order, idx) => {
                const badge = getStatusBadge(order.status);
                const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN', {
                  day: '2-digit', month: '2-digit', year: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                }) : 'N/A';

                return (
                  <div 
                    key={order._id || idx}
                    style={{
                      border: '1px solid #eaeaea',
                      borderRadius: '12px',
                      padding: '18px 20px',
                      backgroundColor: '#fff',
                      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                    }}
                  >
                    {/* Top Row: ID & Status */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div>
                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#888', letterSpacing: '0.5px' }}>
                          MÃ ĐƠN: #{String(order._id).slice(-6).toUpperCase()}
                        </span>
                        <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>
                          {orderDate}
                        </div>
                      </div>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: badge.bg,
                        color: badge.color
                      }}>
                        {badge.label}
                      </span>
                    </div>

                    {/* Order Items */}
                    <div style={{ borderTop: '1px dashed #f0f0f0', borderBottom: '1px dashed #f0f0f0', padding: '12px 0', margin: '10px 0' }}>
                      {order.items && order.items.map((item, itemIdx) => (
                        <div key={itemIdx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: itemIdx < order.items.length - 1 ? '8px' : 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {item.image && (
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                style={{ width: '42px', height: '42px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #f0f0f0' }}
                              />
                            )}
                            <div>
                              <div style={{ fontSize: '13px', fontWeight: '500', color: '#222' }}>{item.name}</div>
                              <div style={{ fontSize: '12px', color: '#777' }}>Số lượng: x{item.quantity}</div>
                            </div>
                          </div>
                          <span style={{ fontSize: '13px', fontWeight: '600', color: '#111' }}>
                            {formatPrice ? formatPrice(item.price * item.quantity) : `${item.price * item.quantity}`}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Footer Row: Total */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px' }}>
                      <span style={{ fontSize: '13px', color: '#666' }}>
                        Thanh toán: <strong style={{ color: '#333' }}>{order.paymentMethod === 'deposit' ? 'Cọc 25%' : '100%'}</strong>
                      </span>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '12px', color: '#888', marginRight: '6px' }}>Tổng thanh toán:</span>
                        <span style={{ fontSize: '15px', fontWeight: '700', color: '#111' }}>
                          {formatPrice ? formatPrice(order.total) : `${order.total}`}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrdersModal;
