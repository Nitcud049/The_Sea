import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function MyOrdersPage({
  currentUser,
  formatPrice,
  handleLogout,
  setShowProfileModal,
  setShowLoginModal
}) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'overview', label: 'Tổng quan' },
    { id: 'profile', label: 'Tài khoản của tôi' },
    { id: 'orders', label: 'Đơn hàng của tôi' },
    { id: 'wishlist', label: 'Danh sách yêu thích của tôi' },
    { id: 'appointments', label: 'Cuộc hẹn của tôi' }
  ];

  useEffect(() => {
    if (currentUser) {
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
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const handleTabClick = (tabId) => {
    if (tabId === 'overview') {
      navigate('/account');
    } else if (tabId === 'profile') {
      navigate('/profile');
    } else if (tabId === 'wishlist') {
      navigate('/wishlist');
    } else if (tabId === 'appointments') {
      navigate('/book-appointment');
    }
  };

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!currentUser) {
    return (
      <div style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 20px 80px',
        backgroundColor: '#fafafa',
        textAlign: 'center',
        fontFamily: "'Jost', sans-serif"
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '500',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: '16px',
          fontFamily: "'Playfair Display', serif"
        }}>
          Đơn hàng của tôi
        </h2>
        <p style={{ color: '#666', fontSize: '15px', marginBottom: '32px' }}>
          Vui lòng đăng nhập để xem lịch sử và quản lý đơn đặt hàng của bạn.
        </p>
        <button
          onClick={() => setShowLoginModal && setShowLoginModal(true)}
          style={{
            height: '48px',
            padding: '0 40px',
            backgroundColor: '#000000',
            color: '#ffffff',
            borderRadius: '9999px',
            border: 'none',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Đăng nhập ngay
        </button>
      </div>
    );
  }

  const displayName = currentUser.name || currentUser.username || currentUser.email?.split('@')[0] || 'Tài khoản';

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '90vh', color: '#111111', fontFamily: "'Jost', sans-serif" }}>
      {/* 1. TOP TABS MENU */}
      <div style={{
        borderBottom: '1px solid #e5e5e5',
        borderTop: '1px solid #e5e5e5',
        backgroundColor: '#ffffff',
        overflowX: 'auto',
        whiteSpace: 'nowrap'
      }}>
        <div style={{
          display: 'flex',
          maxWidth: '1240px',
          margin: '0 auto',
          minWidth: '720px'
        }}>
          {tabs.map((tab) => {
            const isActive = tab.id === 'orders';
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                style={{
                  flex: 1,
                  padding: '16px 14px',
                  background: 'none',
                  border: 'none',
                  borderRight: '1px solid #e5e5e5',
                  borderBottom: isActive ? '3px solid #000000' : '3px solid transparent',
                  color: isActive ? '#000000' : '#444444',
                  fontSize: '13px',
                  fontWeight: isActive ? '600' : '400',
                  letterSpacing: '0.3px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  backgroundColor: isActive ? '#fafafa' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = '#f7f7f7';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. USER NAME HEADING */}
      <div style={{ textAlign: 'center', padding: '42px 20px 24px' }}>
        <h1 style={{
          fontSize: '26px',
          fontWeight: '500',
          letterSpacing: '0.8px',
          color: '#111111',
          margin: 0
        }}>
          {displayName}
        </h1>
        <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#666' }}>
          Đơn hàng của tôi
        </p>
      </div>

      {/* 3. MAIN ORDERS CONTAINER */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 30px 60px',
        boxSizing: 'border-box'
      }}>
        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            border: '1px solid #e5e5e5',
            backgroundColor: '#ffffff'
          }}>
            <div style={{ fontSize: '14px', color: '#666' }}>Đang tải danh sách đơn hàng...</div>
          </div>
        ) : orders.length === 0 ? (
          <div style={{
            border: '1px solid #e5e5e5',
            backgroundColor: '#ffffff',
            padding: '60px 30px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: '#111111',
              marginBottom: '12px'
            }}>
              HIỆN KHÔNG CÓ ĐƠN ĐẶT HÀNG NÀO
            </div>
            <p style={{ color: '#777', fontSize: '14px', marginBottom: '32px' }}>
              Khám phá các bộ sưu tập thời trang mới nhất và đặt hàng ngay hôm nay.
            </p>
            <button
              onClick={() => navigate('/homepage')}
              style={{
                height: '46px',
                padding: '0 36px',
                backgroundColor: '#000000',
                color: '#ffffff',
                border: 'none',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: '500',
                letterSpacing: '0.5px',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#262626')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#000000')}
            >
              Bắt đầu mua hàng
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                    border: '1px solid #e5e5e5',
                    backgroundColor: '#ffffff',
                    padding: '24px 28px',
                    transition: 'border-color 0.2s ease'
                  }}
                >
                  {/* Order Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: '16px',
                    borderBottom: '1px solid #f0f0f0'
                  }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#111', letterSpacing: '0.5px' }}>
                        MÃ ĐƠN HÀNG: #{String(order._id).slice(-8).toUpperCase()}
                      </div>
                      <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
                        Ngày đặt: {orderDate}
                      </div>
                    </div>
                    <span style={{
                      padding: '4px 14px',
                      borderRadius: '9999px',
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: badge.bg,
                      color: badge.color
                    }}>
                      {badge.label}
                    </span>
                  </div>

                  {/* Order Items */}
                  <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {order.items && order.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '16px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{
                                width: '56px',
                                height: '56px',
                                objectFit: 'cover',
                                border: '1px solid #eee'
                              }}
                            />
                          )}
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: '500', color: '#111' }}>
                              {item.name}
                            </div>
                            <div style={{ fontSize: '12px', color: '#777', marginTop: '3px' }}>
                              {item.selectedColor && `Màu: ${item.selectedColor} • `}Số lượng: x{item.quantity}
                            </div>
                          </div>
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#111' }}>
                          {formatPrice ? formatPrice(item.price * item.quantity) : `${item.price * item.quantity}`}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div style={{
                    paddingTop: '16px',
                    borderTop: '1px solid #f0f0f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}>
                    <div style={{ fontSize: '13px', color: '#666' }}>
                      Hình thức: <span style={{ color: '#111', fontWeight: '500' }}>{order.paymentMethod === 'deposit' ? 'Đặt cọc 25%' : 'Thanh toán 100%'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '13px', color: '#777' }}>Tổng thanh toán:</span>
                      <span style={{ fontSize: '16px', fontWeight: '700', color: '#111' }}>
                        {formatPrice ? formatPrice(order.total) : `${order.total}`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 4. BOTTOM BAR: Điều khoản & Nút Đăng xuất / Lên đầu trang */}
        <div style={{
          marginTop: '60px',
          paddingTop: '24px',
          borderTop: '1px solid #eeeeee',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <Link
              to="/legal/privacy"
              style={{
                color: '#111111',
                fontSize: '13px',
                textDecoration: 'underline',
                letterSpacing: '0.4px'
              }}
            >
              Điều khoản và Điều kiện
            </Link>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <button
              onClick={handleLogout}
              style={{
                height: '42px',
                padding: '0 28px',
                backgroundColor: '#dcdcdc',
                color: '#111111',
                border: '1px solid #999999',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#cecece';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#dcdcdc';
              }}
            >
              Đăng xuất
            </button>

            <button
              onClick={scrollToTop}
              style={{
                height: '42px',
                padding: '0 20px',
                backgroundColor: 'transparent',
                color: '#333333',
                border: '1px solid #999999',
                borderRadius: '9999px',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <span>Quay lại đầu trang</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyOrdersPage;
