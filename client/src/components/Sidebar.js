
import React, { useState } from 'react';
// 1. IMPORT Link từ react-router-dom
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


// 2. Bỏ props changeCategory vì chúng ta sẽ dùng Link
function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const [activeMenu, setActiveMenu] = useState('main'); 
  const navigate = useNavigate();
  if (!sidebarOpen) return null;

  const closeSidebar = () => {
    setSidebarOpen(false);
    setTimeout(() => setActiveMenu('main'), 400); 
  };

  const collections = {
    women: [
      { name: 'BST Pre-Fall 2026', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80', link: '/women/new-arrivals' },
      { name: 'BST LV Resort', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80', link: '/women/resort' }
    ],
    men: [
      { name: 'Bộ sưu tập Sports', img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&q=80', link: '/men/sports' },
      { name: 'BST Mùa Đông', img: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=500&q=80', link: '/men/winter' }
    ]
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999, display: 'flex' }}>
      <style>{`
        /* Giữ nguyên các hiệu ứng CSS cũ */
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
        
        /* 3. Đã chỉnh sửa CSS của sub-menu-item để bỏ gạch chân mặc định của Link */
        .sub-menu-item { font-size: 15px; color: #1a1a1a; padding: 12px 0; cursor: pointer; transition: color 0.2s; text-decoration: none; display: block;}
        .sub-menu-item:hover { color: #666; text-decoration: underline; text-underline-offset: 4px; }
        
        /* Tương tự cho các link mục Khác */
        .other-link-item { font-size: 17px; color: #1a1a1a; padding: 14px 0; cursor: pointer; transition: color 0.2s; display: block; text-decoration: none;}
        .other-link-item:hover { color: #666; }

        .submenu-layout { display: flex; gap: 50px; height: 100%; }
        .submenu-links { flex: 0 0 250px; }
        .submenu-images { flex: 1; display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; align-content: start; }
        .collection-card { cursor: pointer; transition: opacity 0.3s; text-decoration: none; display: block;}
        .collection-card:hover { opacity: 0.8; }
        .collection-img { width: 100%; aspect-ratio: 3/4; object-fit: cover; margin-bottom: 12px; border-radius: 2px; }
        .collection-title { font-size: 13px; color: #1a1a1a; }
      `}</style>

      <div className="sidebar-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer' }} onClick={closeSidebar}></div>

      <div className="sidebar-container" style={{ position: 'relative', width: activeMenu === 'main' ? '420px' : '850px', maxWidth: '90vw', backgroundColor: '#fff', height: '100vh', padding: '40px 50px', display: 'flex', flexDirection: 'column', transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
        
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
              
              {/* 4. Sửa các mục "Khác" thành Link và đóng sidebar khi click */}
              <Link to="/other/perfume" className="other-link-item" onClick={closeSidebar}>Nước Hoa</Link>
              <Link to="/other/hats" className="other-link-item" onClick={closeSidebar}>Nón/Mũ</Link>
              
              <Link to="/other/jackets" className="other-link-item" onClick={closeSidebar}>Áo Khoác</Link>
              <Link to="/other/accessories" className="other-link-item" onClick={closeSidebar}>Phụ kiện</Link>
              
              <div style={{ margin: '25px 0', borderTop: '1px solid #e5e5e5' }}></div>
              
              <Link to="/services" className="other-link-item" style={{ fontSize: '15px' }} onClick={closeSidebar}>Dịch vụ THE SEA</Link>
            </div>
          )}

          {/* =================================== */}
          {/* SUB-MENU ĐỒ NỮ */}
          {/* =================================== */}
          {activeMenu === 'women' && (
            <div className="submenu-layout fade-in-content">
              <div className="submenu-links">
                <div onClick={() => setActiveMenu('main')} style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '30px', color: '#1a1a1a' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="15 18 9 12 15 6"></polyline></svg>Đồ Nữ</div>
                
                {/* 5. Cập nhật thành Link với URL riêng, Đóng sidebar khi click */}
                <Link to="/women/new-arrivals" className="sub-menu-item" onClick={closeSidebar}>Sản phẩm mới</Link>
                <Link to="/women/bags" className="sub-menu-item" onClick={closeSidebar}>Túi</Link>
                <Link to="/women/leather-goods" className="sub-menu-item" onClick={closeSidebar}>Ví đa năng và phụ kiện bằng da</Link>
                <Link to="/travel" className="sub-menu-item" onClick={closeSidebar}>Du lịch</Link> {/* Route chung */}
                <Link to="/women/jewelry" className="sub-menu-item" onClick={closeSidebar}>Trang sức thời trang</Link>
                <Link to="/women/clothing" className="sub-menu-item" onClick={closeSidebar}>Trang phục</Link>
                <Link to="/women/shoes" className="sub-menu-item" onClick={closeSidebar}>Giày</Link>
              </div>
              <div className="submenu-images">
                {/* 6. Thêm Link cho ảnh Collection */}
                {collections.women.map((col, idx) => ( 
                  <Link to={col.link} key={idx} className="collection-card" onClick={closeSidebar}>
                    <img src={col.img} alt={col.name} className="collection-img" />
                    <div className="collection-title">{col.name}</div>
                  </Link> 
                ))}
              </div>
            </div>
          )}

          {/* =================================== */}
          {/* SUB-MENU ĐỒ NAM */}
          {/* =================================== */}
          {activeMenu === 'men' && (
            <div className="submenu-layout fade-in-content">
              <div className="submenu-links">
                <div onClick={() => setActiveMenu('main')} style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '30px', color: '#1a1a1a' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="15 18 9 12 15 6"></polyline></svg>Đồ Nam</div>
                
                {/* 7. Cập nhật thành Link với URL riêng, Đóng sidebar khi click */}
                <Link to="/men/new-arrivals" className="sub-menu-item" onClick={closeSidebar}>Sản phẩm mới</Link>
                <Link to="/men/jackets" className="sub-menu-item" onClick={closeSidebar}>Áo khoác</Link>
                <Link to="/men/bags" className="sub-menu-item" onClick={() => setSidebarOpen(false)}>Túi</Link>
                <Link to="/men/leather-goods" className="sub-menu-item" onClick={closeSidebar}>Ví đa năng và phụ kiện bằng da</Link>
                <Link to="/men/clothing" className="sub-menu-item" onClick={closeSidebar}>Trang phục</Link>
                <Link to="/men/accessories" className="sub-menu-item" onClick={closeSidebar}>Phụ kiện</Link>
                <Link to="/travel" className="sub-menu-item" onClick={closeSidebar}>Du lịch</Link> {/* Route chung */}
                <Link to="/men/shoes" className="sub-menu-item" onClick={closeSidebar}>Giày</Link>
              </div>
              <div className="submenu-images">
                 {/* Thêm Link cho ảnh Collection */}
                {collections.men.map((col, idx) => ( 
                  <Link to={col.link} key={idx} className="collection-card" onClick={closeSidebar}>
                    <img src={col.img} alt={col.name} className="collection-img" />
                    <div className="collection-title">{col.name}</div>
                  </Link> 
                ))}
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}

export default Sidebar;