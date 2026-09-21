import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({
  setSidebarOpen, setIsAdminMode, currentUser, handleLogout,
  setShowLoginModal, handleAdminClick, isAdminMode,
  setShowCartModal, totalCount, setShowSearchModal,
  storeCurrency, setStoreCurrency, setShowProfileModal,
  setShowOrdersModal
}) {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/homepage';

  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Đóng menu khi nhấp chuột ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        setIsAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isTransparent = isHomePage && !isScrolled && !isHovered;
  const textColor = isTransparent ? '#ffffff' : '#1a1a1a';

  // Rút gọn tên hiển thị ngắn gọn & avatar initial
  const getUserShortName = () => {
    if (!currentUser) return '';
    if (currentUser.username === 'admin') return 'Admin';
    if (currentUser.name && currentUser.name.trim()) {
      const parts = currentUser.name.trim().split(' ');
      return parts[parts.length - 1]; // Lấy Tên chính
    }
    if (currentUser.email) {
      return currentUser.email.split('@')[0];
    }
    return currentUser.username || 'Tài khoản';
  };

  const getUserFullName = () => {
    if (!currentUser) return '';
    if (currentUser.username === 'admin') return 'Quản trị viên (Admin)';
    return currentUser.name || currentUser.username || currentUser.email.split('@')[0];
  };

  const getUserInitial = () => {
    if (!currentUser) return 'U';
    if (currentUser.username === 'admin') return 'A';
    if (currentUser.name && currentUser.name.trim()) return currentUser.name.trim().charAt(0).toUpperCase();
    if (currentUser.email) return currentUser.email.charAt(0).toUpperCase();
    return currentUser.username ? currentUser.username.charAt(0).toUpperCase() : 'U';
  };

  const isAdmin = currentUser && currentUser.username === 'admin';

  return (
    <header
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'fixed',
        top: 0, left: 0, width: '100%', height: '75px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', zIndex: 1000,
        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
        backgroundColor: isTransparent ? 'transparent' : '#ffffff',
        color: textColor,
        boxShadow: isTransparent ? 'none' : '0 1px 12px rgba(0,0,0,0.06)'
      }}
    >
      {/* LEFT: Menu & Search */}
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

      {/* CENTER: Logo */}
      <div style={{ flex: 1, textAlign: 'center' }}>
        <Link to="/homepage" replace={true} onClick={() => setIsAdminMode(false)} style={{ textDecoration: 'none', color: textColor, fontSize: '24px', fontFamily: "'Playfair Display', serif", letterSpacing: '3px', textTransform: 'uppercase', transition: 'color 0.4s ease' }}>
          THE SEA
        </Link>
      </div>

      {/* RIGHT: Currency, Contact, Wishlist, Account, Cart */}
      <div style={{ display: 'flex', gap: '22px', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
        <select value={storeCurrency} onChange={(e) => setStoreCurrency(e.target.value)} style={{ border: 'none', outline: 'none', cursor: 'pointer', backgroundColor: 'transparent', color: textColor, fontSize: '12px', fontWeight: '500', letterSpacing: '1px' }}>
          <option value="VND" style={{color: '#000'}}>VND đ</option>
          <option value="USD" style={{color: '#000'}}>USD $</option>
          <option value="EUR" style={{color: '#000'}}>EUR €</option>
          <option value="JPY" style={{color: '#000'}}>JPY ¥</option>
        </select>

        <Link to="/contact" style={{ textDecoration: 'none', color: textColor, cursor: 'pointer', fontSize: '12px', fontWeight: '500', letterSpacing: '1px' }}>
          Liên hệ
        </Link>

        <Link to="/wishlist" style={{ textDecoration: 'none', color: textColor, cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Danh sách yêu thích">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </Link>

        {/* NÂNG CẤP KHỐI TÀI KHOẢN: ẤN ĐỂ ĐÓNG/MỞ, KHÔNG BỊ TỰ ĐÓNG KHI DI CHUỘT */}
        {currentUser ? (
          <div 
            ref={accountMenuRef}
            style={{ position: 'relative' }}
          >
            {/* Pill trigger - Ấn để mở/đóng */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px 6px 6px',
                borderRadius: '24px',
                backgroundColor: isTransparent 
                  ? (isAccountMenuOpen ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.12)') 
                  : (isAccountMenuOpen ? '#f1f2f4' : 'transparent'),
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                userSelect: 'none',
                border: isTransparent 
                  ? '1px solid rgba(255,255,255,0.2)' 
                  : (isAccountMenuOpen ? '1px solid #e2e8f0' : '1px solid transparent')
              }}
              onClick={() => setIsAccountMenuOpen(prev => !prev)}
            >
              {/* Avatar tròn */}
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: isAdmin 
                  ? 'linear-gradient(135deg, #d97706 0%, #b45309 100%)' 
                  : 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: '700',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                border: '1.5px solid #ffffff'
              }}>
                {getUserInitial()}
              </div>

              {/* Tên rút gọn */}
              <span style={{ fontSize: '13px', fontWeight: '500', letterSpacing: '0.3px', color: textColor }}>
                {getUserShortName()}
              </span>

              {/* Mũi tên Chevron xoay khi mở menu */}
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                style={{ 
                  transform: isAccountMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.25s ease',
                  opacity: 0.8
                }}
              >
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </div>
            
            {/* LUXURY DROPDOWN MENU */}
            {isAccountMenuOpen && (
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '10px',
                  width: '280px',
                  backgroundColor: '#ffffff',
                  color: '#1a1a1a',
                  boxShadow: '0 16px 36px -4px rgba(0, 0, 0, 0.16), 0 6px 16px -2px rgba(0, 0, 0, 0.06)',
                  borderRadius: '16px',
                  border: '1px solid rgba(0,0,0,0.08)',
                  padding: '8px',
                  zIndex: 1100,
                  animation: 'fadeInScale 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* User Profile Card Header */}
                <div style={{
                  padding: '14px 16px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #fafafa 0%, #f4f5f7 100%)',
                  border: '1px solid #ededed',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: isAdmin 
                      ? 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)' 
                      : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: '700',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.12)'
                  }}>
                    {getUserInitial()}
                  </div>

                  <div style={{ overflow: 'hidden', flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {getUserFullName()}
                    </div>
                    <div style={{ fontSize: '11px', color: '#777', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '1px' }}>
                      {currentUser.email || currentUser.username}
                    </div>
                    
                    {/* Badge thành viên */}
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '10px',
                      fontWeight: '600',
                      marginTop: '6px',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      backgroundColor: isAdmin ? '#fef3c7' : '#e0e7ff',
                      color: isAdmin ? '#92400e' : '#3730a3'
                    }}>
                      {isAdmin ? '🛡️ Quản trị viên' : '✨ The Sea Member'}
                    </div>
                  </div>
                </div>

                {/* Danh sách Action Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {/* Admin Panel Quick Action */}
                  {isAdmin && (
                    <button 
                      onClick={() => { handleAdminClick(); setIsAccountMenuOpen(false); }}
                      style={{
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        borderRadius: '8px',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#0f172a',
                        textAlign: 'left',
                        transition: 'background-color 0.2s ease',
                        marginBottom: '4px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#edf2f7'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                      Trang Quản trị (Admin)
                    </button>
                  )}

                  {/* Thông tin tài khoản */}
                  <button 
                    onClick={() => { setShowProfileModal(true); setIsAccountMenuOpen(false); }}
                    style={{
                      padding: '9px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      borderRadius: '8px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '500',
                      color: '#2d3748',
                      textAlign: 'left',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f4f5f7'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    Thông tin cá nhân
                  </button>

                  {/* Đơn mua của tôi */}
                  <button 
                    onClick={() => { 
                      if (setShowOrdersModal) setShowOrdersModal(true);
                      setIsAccountMenuOpen(false); 
                    }}
                    style={{
                      padding: '9px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      borderRadius: '8px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '500',
                      color: '#2d3748',
                      textAlign: 'left',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f4f5f7'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                    Đơn mua của tôi
                  </button>

                  {/* Danh sách yêu thích */}
                  <Link 
                    to="/wishlist" 
                    onClick={() => setIsAccountMenuOpen(false)}
                    style={{
                      padding: '9px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontSize: '13px',
                      fontWeight: '500',
                      color: '#2d3748',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f4f5f7'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    Sản phẩm yêu thích
                  </Link>

                  {/* Đánh giá của tôi */}
                  <Link 
                    to="/my-reviews" 
                    onClick={() => setIsAccountMenuOpen(false)}
                    style={{
                      padding: '9px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontSize: '13px',
                      fontWeight: '500',
                      color: '#2d3748',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f4f5f7'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    Đánh giá của tôi
                  </Link>

                  {/* Divider */}
                  <div style={{ height: '1px', backgroundColor: '#f0f0f0', margin: '6px 0' }} />

                  {/* Đăng xuất */}
                  <button 
                    onClick={() => { handleLogout(); setIsAccountMenuOpen(false); }}
                    style={{
                      padding: '9px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      borderRadius: '8px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#ef4444',
                      textAlign: 'left',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => setShowLoginModal(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: textColor, display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: '500', letterSpacing: '1px', marginRight: '5px' }}>Tài khoản</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </button>
        )}

        {/* GIỎ HÀNG */}
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