import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const [activeMenu, setActiveMenu] = useState('main'); 
  const navigate = useNavigate();
  
  if (!sidebarOpen) return null;

  const closeSidebar = () => {
    setSidebarOpen(false);
    setTimeout(() => setActiveMenu('main'), 400); 
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999, display: 'flex' }}>
      <style>{`
        @keyframes slideInLeftPremium { 0% { transform: translateX(-100%); } 100% { transform: translateX(0); } }
        @keyframes fadeInBg { 0% { background-color: rgba(0,0,0,0); } 100% { background-color: rgba(0,0,0,0.4); } }
        @keyframes fadeInContent { 0% { opacity: 0; transform: translateX(-10px); } 100% { opacity: 1; transform: translateX(0); } }
        .sidebar-container { animation: slideInLeftPremium 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .sidebar-overlay { animation: fadeInBg 0.3s ease forwards; }
        .fade-in-content { animation: fadeInContent 0.3s ease-out forwards; }
        .scroll-area::-webkit-scrollbar { width: 5px; }
        .scroll-area::-webkit-scrollbar-thumb { background: #d0d0d0; border-radius: 10px; }
        .menu-item { font-size: 17px; color: #1a1a1a; padding: 14px 0; cursor: pointer; transition: color 0.2s; display: flex; justify-content: space-between; align-items: center; }
        .menu-item:hover { color: #666; }
        
        .sub-menu-item { font-size: 15px; color: #1a1a1a; padding: 12px 0; cursor: pointer; transition: color 0.2s; text-decoration: none; display: block;}
        .sub-menu-item:hover { color: #666; text-decoration: underline; text-underline-offset: 4px; }
        
        .other-link-item { font-size: 17px; color: #1a1a1a; padding: 14px 0; cursor: pointer; transition: color 0.2s; display: block; text-decoration: none;}
        .other-link-item:hover { color: #666; }
      `}</style>

      <div className="sidebar-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer' }} onClick={closeSidebar}></div>

      {/* Đã cố định width ở 420px, loại bỏ hiệu ứng phình to 850px */}
      <div className="sidebar-container" style={{ position: 'relative', width: '420px', maxWidth: '90vw', backgroundColor: '#fff', height: '100vh', padding: '40px 50px', display: 'flex', flexDirection: 'column', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          <button onClick={closeSidebar} style={{ background: 'none', border: 'none', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', padding: 0, color: '#1a1a1a' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            Đóng
          </button>
        </div>

        <div className="scroll-area" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingRight: '15px' }}>
          
          {/* =================================== */}
          {/* MENU CHÍNH */}
          {/* =================================== */}
          {activeMenu === 'main' && (
            <div className="fade-in-content" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div className="menu-item" onClick={() => setActiveMenu('women')}>Đồ Nữ <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
              <div className="menu-item" onClick={() => setActiveMenu('men')}>Đồ Nam <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
              
              <div style={{ margin: '25px 0', borderTop: '1px solid #e5e5e5' }}></div>
              
              <Link className="other-link-item" onClick={closeSidebar} to="/other/perfume">Nước Hoa</Link>
              <Link className="other-link-item" onClick={closeSidebar} to="/other/hats">Nón/Mũ</Link>
              <Link className="other-link-item" onClick={closeSidebar} to="/other/accessories">Phụ kiện</Link>
              
              <div style={{ margin: '25px 0', borderTop: '1px solid #e5e5e5' }}></div>
              
              <div className="menu-item" style={{ fontSize: '15px' }} onClick={() => setActiveMenu('services')}>
                Dịch vụ THE SEA 
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </div>
            </div>
          )}

          {/* =================================== */}
          {/* SUB-MENU ĐỒ NỮ */}
          {/* =================================== */}
          {activeMenu === 'women' && (
            <div className="fade-in-content">
              <div onClick={() => setActiveMenu('main')} style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '30px', color: '#1a1a1a' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="15 18 9 12 15 6"></polyline></svg>Đồ Nữ</div>
              
              <Link className="sub-menu-item" onClick={closeSidebar} to="/women/new-arrivals">Sản phẩm mới</Link>
              <Link className="sub-menu-item" onClick={closeSidebar} to="/women/bags">Túi</Link>
              <Link className="sub-menu-item" onClick={closeSidebar} to="/women/leather-goods">Ví đa năng và phụ kiện bằng da</Link>
              <Link className="sub-menu-item" onClick={closeSidebar} to="/travel">Du lịch</Link>
              <Link className="sub-menu-item" onClick={closeSidebar} to="/women/jewelry">Trang sức thời trang</Link>
              <Link className="sub-menu-item" onClick={closeSidebar} to="/women/clothing">Trang phục</Link>
              <Link className="sub-menu-item" onClick={closeSidebar} to="/women/shoes">Giày</Link>
            </div>
          )}

          {/* =================================== */}
          {/* SUB-MENU ĐỒ NAM */}
          {/* =================================== */}
          {activeMenu === 'men' && (
            <div className="fade-in-content">
              <div onClick={() => setActiveMenu('main')} style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '30px', color: '#1a1a1a' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="15 18 9 12 15 6"></polyline></svg>Đồ Nam</div>
              
              <Link className="sub-menu-item" onClick={closeSidebar} to="/men/new-arrivals">Sản phẩm mới</Link>
              <Link className="sub-menu-item" onClick={closeSidebar} to="/men/jackets">Áo khoác</Link>
              <Link className="sub-menu-item" onClick={closeSidebar} to="/men/bags">Túi</Link>
              <Link className="sub-menu-item" onClick={closeSidebar} to="/men/leather-goods">Ví đa năng và phụ kiện bằng da</Link>
              <Link className="sub-menu-item" onClick={closeSidebar} to="/men/clothing">Trang phục</Link>
              <Link className="sub-menu-item" onClick={closeSidebar} to="/men/accessories">Phụ kiện</Link>
              <Link className="sub-menu-item" onClick={closeSidebar} to="/travel">Du lịch</Link>
              <Link className="sub-menu-item" onClick={closeSidebar} to="/men/shoes">Giày</Link>
            </div>
          )}

          {/* =================================== */}
          {/* SUB-MENU DỊCH VỤ */}
          {/* =================================== */}
          {activeMenu === 'services' && (
            <div className="fade-in-content">
              <div onClick={() => setActiveMenu('main')} style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '30px', color: '#1a1a1a' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
                Dịch vụ THE SEA
              </div>
              
              <Link className="sub-menu-item" onClick={closeSidebar} to="/services">Chăm sóc & Sửa chữa</Link>
              <Link className="sub-menu-item" onClick={closeSidebar} to="/services">Cá nhân hóa sản phẩm</Link>
              <Link className="sub-menu-item" onClick={closeSidebar} to="/services">Nghệ thuật tặng quà</Link>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}

export default Sidebar;