
import React, { useState, useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { 
  LayoutDashboard, Package, ShoppingCart, MessageSquare, 
  Users, Heart, LogOut, Menu, Palette, Plus, Search, Trash2, X
} from 'lucide-react';

import HomepageConfigTab from './components/HomepageConfigTab';
import ReviewListTab from './components/ReviewListTab';
import styles from './styles/AdminPanel.module.css';
import ProductFormTab from './components/ProductFormTab';
import ProductListTab from './components/ProductListTab';
import OrderListTab from './components/OrderListTab';

function AdminPanel({ 
  setIsAdminMode, activeTab, setActiveTab, products, handleEditClick, handleDeleteProduct, 
  newProduct, setNewProduct, resetForm, handleSaveProduct, editingId, 
  orders, setOrders, updateOrderStatus, // Thêm setOrders vào đây
  users, handleDeleteUser, formatPrice, homepageConfig, setHomepageConfig, fetchProducts
}) {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [historyModal, setHistoryModal] = useState({ open: false, user: null, orders: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); 
  const [topLikedProducts, setTopLikedProducts] = useState([]);
  
  // Đã xóa dòng const [orders, setOrders] = useState([]) bị trùng lặp ở đây

  useEffect(() => {
    if (activeTab === 'top-liked') {
        fetch('http://127.0.0.1:5000/api/admin/top-liked-products')
            .then(res => res.json())
            .then(data => setTopLikedProducts(data))
            .catch(err => console.error("Lỗi lấy top sản phẩm:", err));
    }
  }, [activeTab]);

  const defaultHomepageConfig = {
    hero: { mediaUrl: "", subtitle: "", title: "", btnText: "", link: "" },
    categoryGrid: { title: "", women: [{},{},{},{}], men: [{},{},{},{}] },
    banner1: { mediaUrl: "", subtitle: "", title: "", btnText: "", link: "" },
    productShowcase: { title: "", categoryFilter: "bags", selectedProducts: ["", "", "", ""] },
    banner2: { mediaUrl: "", subtitle: "", title: "", link: "", btnText: "" },
    productShowcase2: { title: "", categoryFilter: "bags", selectedProducts: ["", "", "", ""] },
    banner3: { mediaUrl: "", subtitle: "", title: "", link: "", btnText: "" },
    productShowcase3: { title: "", categoryFilter: "jewelry", selectedProducts: ["", "", "", ""] }
  };
  
  const [localConfig, setLocalConfig] = useState(() => {
    const saved = (homepageConfig && homepageConfig.categoryGrid) ? homepageConfig : defaultHomepageConfig;
    return { ...saved };
  });

  const handleSaveHomepageConfig = () => {
    if(setHomepageConfig) {
        setHomepageConfig(localConfig);
        fetch('http://127.0.0.1:5000/api/settings/homepage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-user-role': 'admin' },
            body: JSON.stringify({ config: localConfig })
        })
        .then(res => res.json())
        .then(() => alert('✨ Đã cập nhật và lưu vĩnh viễn giao diện Trang chủ!'))
        .catch(() => alert('⚠️ Có lỗi xảy ra khi lưu vào Database!'));
    }
  };

  const totalRevenue = orders?.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.total, 0) || 0;
  const pendingOrdersCount = orders?.filter(o => o.status === 'pending' || o.status === 'processing').length || 0;
  const totalCustomers = users?.filter(u => u.username !== 'admin').length || 0;

  const { chartDataMonthly, chartDataYearly } = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const monthly = Array.from({ length: 12 }, (_, i) => ({ month: `T${i + 1}`, revenue: 0, productsSold: 0 }));
    const yearlyMap = {};
    if (orders) {
      orders.forEach(o => {
        if (o.status === 'completed') {
          const orderDate = new Date(o.createdAt || o.date || Date.now());
          const m = orderDate.getMonth();
          const y = orderDate.getFullYear();
          const itemsCount = o.items ? o.items.reduce((sum, item) => sum + (item.quantity || 1), 0) : 1;
          if (y === currentYear) { monthly[m].revenue += (o.total || 0); monthly[m].productsSold += itemsCount; }
          if (!yearlyMap[y]) yearlyMap[y] = { year: y.toString(), revenue: 0 };
          yearlyMap[y].revenue += (o.total || 0);
        }
      });
    }
    const yearly = Object.values(yearlyMap).sort((a, b) => a.year.localeCompare(b.year));
    if (yearly.length === 0) yearly.push({ year: currentYear.toString(), revenue: totalRevenue });
    return { chartDataMonthly: monthly, chartDataYearly: yearly };
  }, [orders, totalRevenue]);

  const processedProducts = useMemo(() => {
    let items = [...(products || [])];
    if (searchTerm) items = items.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (sortConfig.key) {
      items.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return items;
  }, [products, searchTerm, sortConfig]);

  const totalPages = Math.ceil(processedProducts.length / itemsPerPage);
  const currentProducts = processedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const menuItems = [
    { id: 'overview', label: 'Tổng Quan', icon: LayoutDashboard },
    { id: 'list', label: 'Kho Sản Phẩm', icon: Package },
    { id: 'add', label: 'Thêm Sản Phẩm', icon: Plus },
    { id: 'orders', label: 'Đơn Hàng', icon: ShoppingCart },
    { id: 'reviews', label: 'Đánh Giá', icon: MessageSquare },
    { id: 'users', label: 'Khách Hàng', icon: Users },
    { id: 'top-liked', label: 'Top Yêu Thích', icon: Heart },
    { id: 'homepage', label: 'Giao Diện CMS', icon: Palette },
  ];

  const MenuItem = ({ item }) => {
    const isActive = activeTab === item.id;
    return (
      <button 
        onClick={() => { setActiveTab(item.id); if(item.id === 'add') resetForm(); }}
        className={`${styles.sidebarBtn} ${isActive ? styles.sidebarBtnActive : ''}`}
      >
        <item.icon size={18} className={styles.sidebarBtnIcon} /> {item.label}
      </button>
    );
  };

  const fetchOrders = async () => {
  try {
    // Thay đổi đường dẫn '/api/orders' cho đúng với API thực tế của bạn nếu cần
    const res = await fetch('http://localhost:5000/api/orders'); 
    const data = await res.json();
    if (data) {
      setOrders(data); // Cập nhật lại state đơn hàng mới nhất
    }
  } catch (error) {
    console.error("Lỗi khi tải lại đơn hàng:", error);
  }
};

  return (
    <div className={styles.adminLayout}>

      {/* SIDEBAR */}
      <aside className={`${styles.sidebar} ${!isSidebarOpen ? styles.sidebarClosed : ''}`}>
        <div className={styles.sidebarHeader}>
            <div>
                <h1 className={styles.logoTitle}>THE SEA</h1>
                <span className={styles.logoSubtitle}>Admin Panel</span>
            </div>
        </div>
        
        <nav style={{ flex: 1, padding: '20px 0', overflowY: 'auto' }}>
          <div className={styles.sidebarGroupTitle}>Quản lý chung</div>
          {menuItems.slice(0, 4).map(item => <MenuItem key={item.id} item={item} />)}
          
          <div className={styles.sidebarGroupTitle} style={{ marginTop: '20px' }}>Tương tác</div>
          {menuItems.slice(4, 7).map(item => <MenuItem key={item.id} item={item} />)}

          <div className={styles.sidebarGroupTitle} style={{ marginTop: '20px' }}>Hệ thống</div>
          <MenuItem item={menuItems[7]} />
        </nav>

        <div className={styles.logoutWrapper}>
            <button onClick={() => setIsAdminMode(false)} className={styles.logoutBtn}>
            <LogOut size={16} /> Thoát Admin
            </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Menu size={24} /></button>
            <h2 style={{ fontSize: '16px', letterSpacing: '2px', textTransform: 'uppercase', margin: 0 }}>
              {menuItems.find(m => m.id === activeTab)?.label || 'Quản Trị'}
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ textAlign: 'right', fontSize: '12px' }}>
              <div style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Quản Trị Viên</div>
              <div style={{ color: '#666' }}>admin@thesea.com</div>
            </div>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', borderRadius: '50%' }}>AD</div>
          </div>
        </header>

        <div style={{ padding: '40px' }} className={styles.animateFade} key={activeTab}>
          
          {/* TAB TỔNG QUAN */}
          {activeTab === 'overview' && (
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
                <div className={styles.card}><div className={styles.label}>Tổng Doanh Thu</div><div style={{ fontSize: '28px', fontWeight: 'bold' }}>{formatPrice(totalRevenue)}</div></div>
                <div className={styles.card}><div className={styles.label}>Đơn Cần Xử Lý</div><div style={{ fontSize: '28px', fontWeight: 'bold' }}>{pendingOrdersCount}</div></div>
                <div className={styles.card}><div className={styles.label}>Tổng Khách Hàng</div><div style={{ fontSize: '28px', fontWeight: 'bold' }}>{totalCustomers}</div></div>
              </div>
              <div className={styles.card}>
                <h3 className={styles.label} style={{ marginBottom: '30px' }}>Biểu Đồ Doanh Thu ({new Date().getFullYear()})</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={chartDataMonthly}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                    <YAxis tickFormatter={(val) => (val/1000000).toFixed(0) + 'M'} axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                    <Tooltip formatter={(value) => formatPrice(value)} />
                    <Area type="monotone" dataKey="revenue" stroke="#000" strokeWidth={2} fill="#f5f5f5" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* --- TAB KHO SẢN PHẨM --- */}
{activeTab === 'list' && (
    <ProductListTab 
        products={products} 
        onEdit={handleEditClick} 
        onDelete={handleDeleteProduct} 
        onAddNew={() => { 
            setActiveTab('add'); 
            resetForm(); 
        }} 
        formatPrice={formatPrice} 
    />
)}

          {/* TAB THÊM/SỬA SẢN PHẨM */}
          {activeTab === 'add' && (
            <ProductFormTab 
              editingId={editingId}
              newProduct={newProduct}
              setNewProduct={setNewProduct}
              handleSaveProduct={handleSaveProduct}
            />
          )}

          {/* 2. TAB ĐƠN HÀNG: Đã gọi OrderListTab thành công */}
          {activeTab === 'orders' && (
            <OrderListTab 
              orders={orders} 
              updateOrderStatus={updateOrderStatus} 
              formatPrice={formatPrice} 
              onRefresh={fetchOrders}
            />
          )}
          
          {/* TAB TOP YÊU THÍCH */}
          {activeTab === 'top-liked' && (
            <div className={styles.card} style={{ maxWidth: '900px', margin: '0 auto' }}>
              <h3 className={styles.label} style={{ fontSize: '16px', marginBottom: '30px' }}>TOP 10 SẢN PHẨM YÊU THÍCH</h3>
              <table className={styles.table}>
                <thead><tr><th className={styles.th} style={{width: '50px'}}>#</th><th className={styles.th} style={{width: '80px'}}>Ảnh</th><th className={styles.th}>Sản Phẩm</th><th className={styles.th}>Giá</th><th className={styles.th}>Lượt Tim</th></tr></thead>
                <tbody>
                  {topLikedProducts.length > 0 ? topLikedProducts.map((p, index) => (
                    <tr key={p._id}>
                      <td className={styles.td} style={{fontWeight: 'bold'}}>{index + 1}</td>
                      <td className={styles.td}><img src={p.image} alt={p.name} className={styles.imgBound} /></td>
                      <td className={styles.td} style={{fontWeight: 'bold'}}>{p.name}</td>
                      <td className={styles.td}>{formatPrice(p.price)}</td>
                      <td className={styles.td} style={{fontWeight: 'bold'}}>🖤 {p.likesCount}</td>
                    </tr>
                  )) : <tr><td colSpan="5" className={styles.td} style={{textAlign: 'center'}}>Chưa có dữ liệu.</td></tr>}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB GIAO DIỆN TRANG CHỦ CMS */}
          {activeTab === 'homepage' && (
            <HomepageConfigTab homepageConfig={homepageConfig} setHomepageConfig={setHomepageConfig} products={products} />
          )}

          {/* TAB ĐÁNH GIÁ */}
          {activeTab === 'reviews' && (
            <ReviewListTab products={products} fetchProducts={fetchProducts} formatPrice={formatPrice} />
          )}

          {/* TAB KHÁCH HÀNG */}
          {activeTab === 'users' && (
            <div className={styles.card} style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>Tên Khách Hàng</th>
                    <th className={styles.th}>Email / Username</th>
                    <th className={styles.th}>Số Điện Thoại</th>
                    <th className={styles.th} style={{textAlign: 'right'}}>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {users && users.filter(u => u.username !== 'admin').length > 0 ? (
                    users.filter(u => u.username !== 'admin').map(user => (
                      <tr key={user._id}>
                        <td className={styles.td} style={{fontWeight: 'bold'}}>{user.name || user.username}</td>
                        <td className={styles.td}>{user.email || user.username}</td>
                        <td className={styles.td}>{user.phone || 'Chưa cập nhật'}</td>
                        <td className={styles.td} style={{textAlign: 'right'}}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                            {/* Nút xem lịch sử mua hàng */}
                            <button 
                              onClick={() => {
                                const userOrders = (orders || []).filter(o => {
                                  const orderName = (o.customer?.name || o.username || '').toLowerCase();
                                  const orderEmail = (o.customer?.email || '').toLowerCase();
                                  const orderPhone = (o.customer?.phone || '');
                                  const userName = (user.name || user.username || '').toLowerCase();
                                  const userEmail = (user.email || user.username || '').toLowerCase();
                                  const userPhone = (user.phone || '');
                                  return orderName === userName || orderEmail === userEmail || (userPhone && orderPhone === userPhone);
                                });
                                setHistoryModal({ open: true, user, orders: userOrders });
                              }}
                              style={{
                                background: 'none',
                                border: '1px solid #e0e0e0',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                padding: '7px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#555',
                                transition: 'all 0.2s ease'
                              }}
                              title="Xem lịch sử mua hàng"
                              onMouseEnter={e => { e.currentTarget.style.borderColor = '#000'; e.currentTarget.style.color = '#000'; e.currentTarget.style.backgroundColor = '#f5f5f5'; }}
                              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e0e0e0'; e.currentTarget.style.color = '#555'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                            >
                              <Search size={16} />
                            </button>
                            {/* Nút xóa khách hàng */}
                            <button 
                              onClick={() => { if(window.confirm('Xóa tài khoản khách hàng này?')) handleDeleteUser(user._id); }}
                              style={{
                                background: 'none',
                                border: '1px solid #e0e0e0',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                padding: '7px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#999',
                                transition: 'all 0.2s ease'
                              }}
                              title="Xóa khách hàng"
                              onMouseEnter={e => { e.currentTarget.style.borderColor = '#ff4757'; e.currentTarget.style.color = '#ff4757'; e.currentTarget.style.backgroundColor = '#fff5f5'; }}
                              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e0e0e0'; e.currentTarget.style.color = '#999'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="4" className={styles.td} style={{textAlign: 'center'}}>Chưa có khách hàng nào.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* SIDEBAR LỊCH SỬ MUA HÀNG - Trượt từ bên phải */}
          {historyModal.open && (() => {
            const hUser = historyModal.user;
            const hOrders = historyModal.orders;
            const totalSpent = hOrders.filter(o => o.status === 'completed').reduce((sum, o) => sum + (o.total || 0), 0);
            const closeSidebar = () => setHistoryModal({ open: false, user: null, orders: [] });

            return (
              <>
                {/* Inline keyframes cho slide animation */}
                <style>{`
                  @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
                  @keyframes fadeInOverlay { from { opacity: 0; } to { opacity: 1; } }
                `}</style>

                {/* Overlay nền mờ */}
                <div 
                  onClick={closeSidebar}
                  style={{
                    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                    backgroundColor: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(2px)',
                    zIndex: 9998, animation: 'fadeInOverlay 0.3s ease forwards'
                  }} 
                />

                {/* Sidebar Panel */}
                <div
                  onClick={e => e.stopPropagation()}
                  style={{
                    position: 'fixed', top: 0, right: 0, width: '480px', maxWidth: '90vw',
                    height: '100vh', backgroundColor: '#fff', zIndex: 9999,
                    display: 'flex', flexDirection: 'column',
                    boxShadow: '-8px 0 30px rgba(0,0,0,0.12)',
                    animation: 'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                  }}
                >
                  {/* Header */}
                  <div style={{
                    padding: '24px 28px', borderBottom: '1px solid #e5e5e5',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0
                  }}>
                    <h3 style={{ margin: 0, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, color: '#000' }}>
                      Thông Tin Khách Hàng
                    </h3>
                    <button 
                      onClick={closeSidebar}
                      style={{
                        background: 'none', border: '1px solid #e0e0e0', borderRadius: '6px',
                        cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', color: '#666', transition: 'all 0.2s'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#000'; e.currentTarget.style.color = '#000'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#e0e0e0'; e.currentTarget.style.color = '#666'; }}
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Scrollable Content */}
                  <div style={{ flex: 1, overflowY: 'auto', padding: '0' }}>

                    {/* ===== PHẦN THÔNG TIN KHÁCH HÀNG ===== */}
                    <div style={{ padding: '28px', borderBottom: '1px solid #f0f0f0' }}>
                      {/* Avatar + Tên */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                        <div style={{
                          width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#000',
                          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: 'bold', fontSize: '22px', flexShrink: 0, letterSpacing: '1px'
                        }}>
                          {(hUser?.name || hUser?.username || 'U').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '18px', color: '#000', marginBottom: '2px' }}>
                            {hUser?.name || hUser?.username}
                          </div>
                          <span style={{
                            fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px',
                            backgroundColor: '#f5f5f5', padding: '3px 8px', color: '#666', fontWeight: 600
                          }}>
                            {hUser?.role || 'Member'}
                          </span>
                        </div>
                      </div>

                      {/* Grid thông tin chi tiết */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div style={{ padding: '14px', backgroundColor: '#fafafa', border: '1px solid #f0f0f0' }}>
                          <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#999', marginBottom: '6px', fontWeight: 600 }}>Email</div>
                          <div style={{ fontSize: '13px', color: '#333', wordBreak: 'break-all' }}>{hUser?.email || hUser?.username || 'N/A'}</div>
                        </div>
                        <div style={{ padding: '14px', backgroundColor: '#fafafa', border: '1px solid #f0f0f0' }}>
                          <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#999', marginBottom: '6px', fontWeight: 600 }}>Số Điện Thoại</div>
                          <div style={{ fontSize: '13px', color: '#333' }}>{hUser?.phone || 'Chưa cập nhật'}</div>
                        </div>
                        <div style={{ padding: '14px', backgroundColor: '#fafafa', border: '1px solid #f0f0f0' }}>
                          <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#999', marginBottom: '6px', fontWeight: 600 }}>Ngày Tham Gia</div>
                          <div style={{ fontSize: '13px', color: '#333' }}>{hUser?.createdAt ? new Date(hUser.createdAt).toLocaleDateString('vi-VN') : 'N/A'}</div>
                        </div>
                        <div style={{ padding: '14px', backgroundColor: '#fafafa', border: '1px solid #f0f0f0' }}>
                          <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#999', marginBottom: '6px', fontWeight: 600 }}>Địa Chỉ</div>
                          <div style={{ fontSize: '13px', color: '#333' }}>{hUser?.address || 'Chưa cập nhật'}</div>
                        </div>
                      </div>

                      {/* Thống kê nhanh */}
                      <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                        <div style={{
                          flex: 1, padding: '16px', border: '1px solid #000', textAlign: 'center'
                        }}>
                          <div style={{ fontSize: '22px', fontWeight: 700, color: '#000' }}>{hOrders.length}</div>
                          <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#666', marginTop: '4px', fontWeight: 600 }}>Đơn Hàng</div>
                        </div>
                        <div style={{
                          flex: 1, padding: '16px', border: '1px solid #000', textAlign: 'center'
                        }}>
                          <div style={{ fontSize: '22px', fontWeight: 700, color: '#000' }}>{hOrders.filter(o => o.status === 'completed').length}</div>
                          <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#666', marginTop: '4px', fontWeight: 600 }}>Thành Công</div>
                        </div>
                        <div style={{
                          flex: 1, padding: '16px', border: '1px solid #000', textAlign: 'center'
                        }}>
                          <div style={{ fontSize: '15px', fontWeight: 700, color: '#000' }}>{formatPrice(totalSpent)}</div>
                          <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#666', marginTop: '4px', fontWeight: 600 }}>Đã Chi</div>
                        </div>
                      </div>
                    </div>

                    {/* ===== PHẦN LỊCH SỬ MUA HÀNG ===== */}
                    <div style={{ padding: '28px' }}>
                      <h4 style={{
                        margin: '0 0 20px 0', fontSize: '12px', textTransform: 'uppercase',
                        letterSpacing: '2px', fontWeight: 700, color: '#000',
                        paddingBottom: '12px', borderBottom: '2px solid #000'
                      }}>
                        Lịch Sử Mua Hàng
                      </h4>

                      {hOrders.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          {[...hOrders].reverse().map(order => {
                            const statusMap = {
                              pending: { label: 'Chờ xử lý', bg: '#fff9e6', color: '#b38600', border: '#ffe699' },
                              processing: { label: 'Đang xử lý', bg: '#fff9e6', color: '#b38600', border: '#ffe699' },
                              confirmed: { label: 'Đã xác nhận', bg: '#e6f2ff', color: '#0066cc', border: '#b3d9ff' },
                              shipping: { label: 'Đang giao', bg: '#f0e6ff', color: '#5900b3', border: '#d9b3ff' },
                              completed: { label: 'Thành công', bg: '#e6ffe6', color: '#008000', border: '#b3ffb3' },
                              cancelled: { label: 'Đã hủy', bg: '#ffe6e6', color: '#cc0000', border: '#ffb3b3' },
                            };
                            const st = statusMap[order.status] || statusMap.pending;

                            return (
                              <div key={order._id} style={{ border: '1px solid #eee', padding: '0', transition: 'border-color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = '#ccc'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = '#eee'}
                              >
                                {/* Order Header */}
                                <div style={{
                                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                  padding: '14px 16px', backgroundColor: '#fafafa', borderBottom: '1px solid #f0f0f0'
                                }}>
                                  <div>
                                    <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '13px', letterSpacing: '1px' }}>
                                      #{order._id.substring(0, 8)}
                                    </span>
                                    <span style={{ fontSize: '12px', color: '#999', marginLeft: '10px' }}>
                                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN') : ''}
                                    </span>
                                  </div>
                                  <span style={{
                                    display: 'inline-block', padding: '4px 10px', fontSize: '9px', fontWeight: 700,
                                    textTransform: 'uppercase', letterSpacing: '0.5px',
                                    backgroundColor: st.bg, color: st.color, border: `1px solid ${st.border}`
                                  }}>
                                    {st.label}
                                  </span>
                                </div>

                                {/* Order Items - với hình ảnh sản phẩm */}
                                <div style={{ padding: '12px 16px' }}>
                                  {order.items && order.items.length > 0 ? (
                                    order.items.map((item, i) => (
                                      <div key={i} style={{
                                        display: 'flex', alignItems: 'center', gap: '14px',
                                        padding: '10px 0',
                                        borderBottom: i < order.items.length - 1 ? '1px solid #f5f5f5' : 'none'
                                      }}>
                                        {/* Hình ảnh sản phẩm */}
                                        <div style={{
                                          width: '56px', height: '70px', flexShrink: 0,
                                          backgroundColor: '#f5f5f5', border: '1px solid #eee', overflow: 'hidden'
                                        }}>
                                          <img 
                                            src={item.image || item.img || ''} 
                                            alt={item.name || 'SP'}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            onError={e => { e.target.style.display = 'none'; }}
                                          />
                                        </div>
                                        {/* Thông tin sản phẩm */}
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                          <div style={{ fontSize: '13px', fontWeight: 600, color: '#000', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {item.name || 'Sản phẩm'}
                                          </div>
                                          <div style={{ fontSize: '11px', color: '#999' }}>
                                            {item.size && <span>Size: {item.size}</span>}
                                            {item.color && <span style={{ marginLeft: item.size ? '10px' : 0 }}>Màu: {item.color}</span>}
                                          </div>
                                          <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>
                                            SL: {item.quantity || 1}
                                          </div>
                                        </div>
                                        {/* Giá */}
                                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#000', flexShrink: 0 }}>
                                          {formatPrice(item.price || 0)}
                                        </div>
                                      </div>
                                    ))
                                  ) : (
                                    <div style={{ fontSize: '12px', color: '#999', padding: '10px 0' }}>Không có chi tiết sản phẩm</div>
                                  )}
                                </div>

                                {/* Order Footer - Tổng tiền */}
                                <div style={{
                                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                  padding: '12px 16px', backgroundColor: '#fafafa', borderTop: '1px solid #f0f0f0'
                                }}>
                                  <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#666', fontWeight: 600 }}>Tổng cộng</span>
                                  <span style={{ fontSize: '15px', fontWeight: 700, color: '#000', letterSpacing: '0.5px' }}>{formatPrice(order.total)}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div style={{
                          textAlign: 'center', padding: '50px 20px', color: '#999',
                          fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px'
                        }}>
                          Khách hàng này chưa có đơn hàng nào.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            );
          })()}

        </div>
      </main>
    </div>
  );
}

export default AdminPanel;