import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function AccountPage({
  currentUser,
  setCurrentUser,
  handleLogout,
  setShowProfileModal,
  setShowOrdersModal,
  setShowLoginModal,
  orders = [],
  formatPrice
}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Tổng quan' },
    { id: 'profile', label: 'Tài khoản của tôi' },
    { id: 'orders', label: 'Đơn hàng của tôi' },
    { id: 'wishlist', label: 'Danh sách yêu thích của tôi' },
    { id: 'appointments', label: 'Cuộc hẹn của tôi' }
  ];

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
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '500',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: '16px',
          fontFamily: "'Playfair Display', serif"
        }}>
          Tổng quan tài khoản
        </h2>
        <p style={{ color: '#666', fontSize: '15px', marginBottom: '32px', maxWidth: '420px' }}>
          Vui lòng đăng nhập để truy cập trang tổng quan và quản lý thông tin tài khoản của bạn.
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
            letterSpacing: '1px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#222')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#000')}
        >
          Đăng nhập ngay
        </button>
      </div>
    );
  }

  const displayName = currentUser.name || currentUser.username || currentUser.email?.split('@')[0] || 'Tài khoản';

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'profile') {
      navigate('/profile');
    } else if (tabId === 'orders') {
      navigate('/my-orders');
    } else if (tabId === 'wishlist') {
      navigate('/wishlist');
    } else if (tabId === 'appointments') {
      navigate('/book-appointment');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
          alignItems: 'stretch',
          maxWidth: '1240px',
          margin: '0 auto',
          minWidth: '720px'
        }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
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
      <div style={{ textAlign: 'center', padding: '42px 20px 32px' }}>
        <h1 style={{
          fontSize: '26px',
          fontWeight: '500',
          letterSpacing: '0.8px',
          color: '#111111',
          margin: 0
        }}>
          {displayName}
        </h1>
      </div>

      {/* 3. MAIN GRID CARDS */}
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '0 30px 40px',
        boxSizing: 'border-box'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
          gap: '28px'
        }}>
          {/* CARD 1: Tài khoản của tôi */}
          <div style={{
            border: '1px solid #e5e5e5',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              padding: '24px 28px',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <h2 
                onClick={() => navigate('/profile')}
                style={{ fontSize: '18px', fontWeight: '500', margin: 0, color: '#111111', cursor: 'pointer' }}
                title="Xem hồ sơ cá nhân"
              >
                Tài khoản của tôi
              </h2>
            </div>
            <div style={{
              padding: '28px',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div style={{ fontSize: '14px', color: '#333333', lineHeight: '1.6' }}>
                <span style={{ fontWeight: '500' }}>Đăng nhập:</span> {currentUser.email || currentUser.username}
              </div>
              <button
                onClick={() => navigate('/profile')}
                style={{
                  width: '100%',
                  height: '46px',
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: '500',
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  marginTop: '36px',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#262626')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#000000')}
              >
                Chỉnh sửa hồ sơ
              </button>
            </div>
          </div>

          {/* CARD 2: Đơn hàng của tôi */}
          <div style={{
            border: '1px solid #e5e5e5',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              padding: '24px 28px',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <h2 
                onClick={() => navigate('/my-orders')}
                style={{ fontSize: '18px', fontWeight: '500', margin: 0, color: '#111111', cursor: 'pointer' }}
                title="Xem đơn hàng của tôi"
              >
                Đơn hàng của tôi
              </h2>
            </div>
            <div style={{
              padding: '28px',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div style={{
                fontSize: '13px',
                fontWeight: '500',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: '#222222',
                paddingTop: '6px'
              }}>
                HIỆN KHÔNG CÓ ĐƠN ĐẶT HÀNG NÀO
              </div>
              <button
                onClick={() => navigate('/homepage')}
                style={{
                  width: '100%',
                  height: '46px',
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: '500',
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  marginTop: '36px',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#262626')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#000000')}
              >
                Bắt đầu mua hàng
              </button>
            </div>
          </div>

          {/* CARD 3: Danh sách yêu thích của tôi */}
          <div style={{
            border: '1px solid #e5e5e5',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              padding: '24px 28px',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: '500', margin: 0, color: '#111111' }}>
                Danh sách yêu thích của tôi
              </h2>
            </div>
            <div style={{
              padding: '28px',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '120px'
            }}>
              <div style={{ fontSize: '14px', color: '#444444', paddingTop: '6px' }}>
                Danh sách yêu thích của bạn trống.
              </div>
            </div>
          </div>

          {/* CARD 4: Cuộc hẹn của tôi */}
          <div style={{
            border: '1px solid #e5e5e5',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              padding: '24px 28px',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: '500', margin: 0, color: '#111111' }}>
                Cuộc hẹn của tôi
              </h2>
            </div>
            <div style={{
              padding: '28px',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div style={{ fontSize: '14px', color: '#444444', paddingTop: '6px' }}>
                Bạn không có cuộc hẹn nào sắp tới.
              </div>
              <button
                onClick={() => navigate('/book-appointment')}
                style={{
                  width: '100%',
                  height: '46px',
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: '500',
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  marginTop: '36px',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#262626')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#000000')}
              >
                Đặt lịch hẹn tại cửa hàng
              </button>
            </div>
          </div>
        </div>

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

export default AccountPage;
