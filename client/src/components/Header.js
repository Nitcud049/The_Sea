import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({
  setSidebarOpen, setIsAdminMode, currentUser, handleLogout,
  setShowLoginModal, handleAdminClick, isAdminMode,
  setShowCartModal, totalCount, setShowSearchModal,
  storeCurrency, setStoreCurrency, setShowProfileModal // Thêm prop này để mở form Profile
}) {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/homepage';

  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false); // Quản lý trạng thái mở/đóng menu tài khoản

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = isHomePage && !isScrolled && !isHovered;
  const textColor = isTransparent ? '#ffffff' : '#1a1a1a';

  // Xử lý tên hiển thị
  const getDisplayName = () => {
    if (!currentUser) return '';
    if (currentUser.username === 'admin') return 'Admin';
    if (currentUser.name && currentUser.name !== currentUser.email.split('@')[0]) return `Chào, ${currentUser.name}`;
    return `Chào, ${currentUser.email}`;
  };

  return (
    <header
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsAccountMenuOpen(false); // Đóng menu khi chuột rời khỏi header
      }}
      style={{
        position: isHomePage ? 'fixed' : 'sticky',
        top: 0, left: 0, width: '100%', height: '75px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', zIndex: 1000,
        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
        backgroundColor: isTransparent ? 'transparent' : '#ffffff',
        color: textColor,
        boxShadow: isTransparent ? 'none' : '0 1px 10px rgba(0,0,0,0.05)'
      }}
    >
      <div style={{ display: 'flex', gap: '25px', alignItems: 'center', flex: 1 }}>
        <button onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', color: textColor, cursor: 'pointer', fontSize: '12px', fontWeight: '500', padding: 0, letterSpacing: '1px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          Menu
        </button>
        <button onClick={() => setShowSearchModal(true)} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', color: textColor, cursor: 'pointer', fontSize: '12px', fontWeight: '500', padding: 0, letterSpacing: '1px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          Tìm kiếm
        </button>
      </div>

      <div style={{ flex: 1, textAlign: 'center' }}>
        <Link to="/homepage" replace={true} onClick={() => setIsAdminMode(false)} style={{ textDecoration: 'none', color: textColor, fontSize: '24px', fontFamily: "'Playfair Display', serif", letterSpacing: '3px', textTransform: 'uppercase', transition: 'color 0.4s ease' }}>
          THE SEA
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '25px', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
        <select value={storeCurrency} onChange={(e) => setStoreCurrency(e.target.value)} style={{ border: 'none', outline: 'none', cursor: 'pointer', backgroundColor: 'transparent', color: textColor, fontSize: '12px', fontWeight: '500', letterSpacing: '1px' }}>
          <option value="VND" style={{color: '#000'}}>VND đ</option><option value="USD" style={{color: '#000'}}>USD $</option><option value="EUR" style={{color: '#000'}}>EUR €</option><option value="JPY" style={{color: '#000'}}>JPY ¥</option>
        </select>

        <Link to="/contact" style={{ textDecoration: 'none', color: textColor, cursor: 'pointer', fontSize: '12px', fontWeight: '500', letterSpacing: '1px' }}>Liên hệ với chúng tôi</Link>
        <Link to="/wishlist" style={{ textDecoration: 'none', color: textColor, marginRight: '10px', cursor: 'pointer' }} title="Yêu thích">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </Link>

        {/* Khối quản lý Tài khoản mới */}
        {currentUser ? (
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setIsAccountMenuOpen(true)}
            onMouseLeave={() => setIsAccountMenuOpen(false)}
          >
            <span 
              onClick={() => {
                if(currentUser.username === 'admin') handleAdminClick();
                else setShowProfileModal(true); // Nếu không phải admin thì mở form Profile
              }} 
              style={{ cursor: 'pointer', fontSize: '12px', fontWeight: '500', letterSpacing: '1px', paddingBottom: '10px' }}
            >
              {getDisplayName()}
            </span>
            
            {/* Menu Dropdown */}
            {isAccountMenuOpen && currentUser.username !== 'admin' && (
              <div style={{
                position: 'absolute', top: '30px', right: 0,
                backgroundColor: '#ffffff', color: '#1a1a1a',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '4px',
                padding: '10px 0', minWidth: '150px', zIndex: 1001,
                display: 'flex', flexDirection: 'column'
              }}>
                <button onClick={() => {setShowProfileModal(true); setIsAccountMenuOpen(false);}} style={{ padding: '10px 20px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '500', width: '100%' }}>Thông tin cá nhân</button>
                <button onClick={handleLogout} style={{ padding: '10px 20px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '500', width: '100%', color: '#ff4d4f' }}>Đăng xuất</button>
              </div>
            )}
            {/* Dropdown cho Admin */}
             {isAccountMenuOpen && currentUser.username === 'admin' && (
              <div style={{
                position: 'absolute', top: '30px', right: 0,
                backgroundColor: '#ffffff', color: '#1a1a1a',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '4px',
                padding: '10px 0', minWidth: '150px', zIndex: 1001,
                display: 'flex', flexDirection: 'column'
              }}>
                <button onClick={handleAdminClick} style={{ padding: '10px 20px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '500', width: '100%' }}>Trang Quản trị</button>
                <button onClick={handleLogout} style={{ padding: '10px 20px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '500', width: '100%', color: '#ff4d4f' }}>Đăng xuất</button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => setShowLoginModal(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: textColor, display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: '500', letterSpacing: '1px', marginRight: '5px' }}>Tài khoản</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </button>
        )}

        <button onClick={() => setShowCartModal(true)} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', position: 'relative', cursor: 'pointer', color: textColor, padding: 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          {totalCount > 0 && (
            <span style={{ position: 'absolute', top: '-6px', right: '-8px', backgroundColor: isTransparent ? '#ffffff' : '#1a1a1a', color: isTransparent ? '#1a1a1a' : '#ffffff', fontSize: '10px', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', transition: 'all 0.4s ease' }}>{totalCount}</span>
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;