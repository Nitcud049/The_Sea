import React, { useState, useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { 
  LayoutDashboard, Package, ShoppingCart, MessageSquare, 
  Users, Heart, LogOut, Menu, Palette, Plus, Search
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
                    <th className={styles.th}>Email</th>
                    <th className={styles.th} style={{textAlign: 'right'}}>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {users && users.filter(u => u.username !== 'admin').length > 0 ? (
                    users.filter(u => u.username !== 'admin').map(user => (
                      <tr key={user._id}>
                        <td className={styles.td} style={{fontWeight: 'bold'}}>{user.name || user.username}</td>
                        <td className={styles.td}>{user.email}</td>
                        <td className={styles.td} style={{textAlign: 'right'}}>
                          <button onClick={() => handleDeleteUser(user._id)} className={`${styles.btnPrimary} ${styles.btnDanger}`} style={{ padding: '8px 15px' }}>Xóa</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="3" className={styles.td} style={{textAlign: 'center'}}>Chưa có khách hàng nào.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default AdminPanel;