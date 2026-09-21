import React, { useState, useEffect } from 'react';

const HomepageConfigTab = ({ homepageConfig, setHomepageConfig, products = [] }) => {
  // Cấu hình mặc định
  const defaultHomepageConfig = {
    hero: { mediaUrl: "/images/hero-video.mp4", subtitle: "DÀNH CHO NỮ", title: "Thiết Kế Biểu Tượng", btnText: "Khám phá", link: "/women/bags" },
    categoryGrid: {
      title: "Khám phá các sáng tạo độc đáo của THE SEA",
      women: [
        { title: "Túi xách nữ", image: "/images/Túi Side Trunk MM East West.jpg", link: "/women/bags" },
        { title: "Ví và phụ kiện bằng da", image: "/images/Túi Wallet On Chain Ivy.jpg", link: "/women/leather-goods" },
        { title: "Trang sức", image: "/images/Nhẫn Color Blossom Star M.jpg", link: "/women/jewelry" },
        { title: "Giày nữ", image: "/images/Dép LV Isola Comfort Mule.jpg", link: "/women/shoes" }
      ],
      men: [
        { title: "Túi xách nam", image: "/images/Túi Keepall Bandoulière 35.jpg", link: "/men/bags" },
        { title: "Ví và phụ kiện da nam", image: "/images/Ví Compact Magnet.jpg", link: "/men/leather-goods" },
        { title: "Phụ kiện nam", image: "/images/Mắt Kính Dáng Vuông LV Lock.jpg", link: "/men/accessories" },
        { title: "Giày nam", image: "/images/Giày Thể Thao LV Trainer.jpg", link: "/men/shoes" }
      ]
    },
    banner1: { mediaUrl: "/images/banner4.jpg", subtitle: "DÀNH CHO NAM", title: "Bộ sưu tập Thu-Đông 2026", btnText: "Khám phá ngay", link: "/men/new-arrivals" },
    productShowcase: { title: "Sản Phẩm Nổi Bật", categoryFilter: "bags", selectedProducts: ["", "", "", ""] },
    banner2: { mediaUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80", subtitle: "BỘ SƯU TẬP MỚI", title: "Thanh Lịch Vượt Thời Gian", link: "/women/new-arrivals", btnText: "Khám phá ngay" },
    productShowcase2: { title: "Dành Cho Nữ", categoryFilter: "bags", selectedProducts: ["", "", "", ""] },
    banner3: { mediaUrl: "https://images.unsplash.com/photo-1441984904996-e0b6eddec374?w=1600&q=80", subtitle: "PHỤ KIỆN", title: "Điểm Nhấn Hoàn Hảo", link: "/women/jewelry", btnText: "Mua sắm ngay" },
    productShowcase3: { title: "Trang Sức Nổi Bật", categoryFilter: "jewelry", selectedProducts: ["", "", "", ""] }
  };

  // State lưu trữ cấu hình cục bộ
  const [localConfig, setLocalConfig] = useState(() => {
    const saved = (homepageConfig && homepageConfig.categoryGrid) ? homepageConfig : defaultHomepageConfig;
    return {
      ...saved,
      banner2: saved.banner2 || defaultHomepageConfig.banner2,
      productShowcase2: saved.productShowcase2 || defaultHomepageConfig.productShowcase2,
      banner3: saved.banner3 || defaultHomepageConfig.banner3,
      productShowcase3: saved.productShowcase3 || defaultHomepageConfig.productShowcase3,
    };
  });

  // Đồng bộ lại state local khi homepageConfig từ cha thay đổi
  useEffect(() => {
    if (homepageConfig && homepageConfig.categoryGrid) {
      setLocalConfig({
        ...homepageConfig,
        banner2: homepageConfig.banner2 || defaultHomepageConfig.banner2,
        productShowcase2: homepageConfig.productShowcase2 || defaultHomepageConfig.productShowcase2,
        banner3: homepageConfig.banner3 || defaultHomepageConfig.banner3,
        productShowcase3: homepageConfig.productShowcase3 || defaultHomepageConfig.productShowcase3,
      });
    }
  }, [homepageConfig]);

  // Danh sách các đường dẫn tĩnh (Route Options)
  const routeOptions = [
    { label: "-- Trang Nữ --", value: "" }, 
    { label: "Túi Nữ", value: "/women/bags" }, 
    { label: "Ví/Đồ da Nữ", value: "/women/leather-goods" },
    { label: "Trang sức Nữ", value: "/women/jewelry" }, 
    { label: "Giày Nữ", value: "/women/shoes" }, 
    { label: "Trang phục Nữ", value: "/women/clothing" }, 
    { label: "Đồ mới Nữ", value: "/women/new-arrivals" },
    { label: "-- Trang Nam --", value: "" }, 
    { label: "Túi Nam", value: "/men/bags" }, 
    { label: "Ví/Đồ da Nam", value: "/men/leather-goods" },
    { label: "Phụ kiện Nam", value: "/men/accessories" }, 
    { label: "Giày Nam", value: "/men/shoes" }, 
    { label: "Trang phục Nam", value: "/men/clothing" }, 
    { label: "Đồ mới Nam", value: "/men/new-arrivals" },
    { label: "-- Khác --", value: "" }, 
    { label: "Du lịch", value: "/travel" }
  ];

  // Hàm xử lý lưu cấu hình về Server
  const handleSaveHomepageConfig = () => {
    if (setHomepageConfig) {
      setHomepageConfig(localConfig);
    }
    fetch('http://127.0.0.1:5000/api/settings/homepage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-user-role': 'admin' },
      body: JSON.stringify({ config: localConfig })
    })
      .then(res => res.json())
      .then(() => alert('✨ Đã cập nhật và lưu vĩnh viễn giao diện Trang chủ vào hệ thống!'))
      .catch(() => alert('⚠️ Có lỗi xảy ra khi lưu vào Database!'));
  };

  // Cập nhật từng ô trong danh mục động
  const updateCategoryGrid = (gender, index, field, value) => {
    const newGrid = { ...localConfig.categoryGrid };
    newGrid[gender][index][field] = value;
    setLocalConfig({ ...localConfig, categoryGrid: newGrid });
  };

  // Chọn sản phẩm hiển thị trong Showcase
  const handleSelectShowcaseProduct = (showcaseKey, index, productId) => {
    const newSelected = [...(localConfig[showcaseKey]?.selectedProducts || ["", "", "", ""])];
    newSelected[index] = productId;
    setLocalConfig({ ...localConfig, [showcaseKey]: { ...localConfig[showcaseKey], selectedProducts: newSelected } });
  };

  // Sub-component render ô Banner
  const renderBannerCMS = (title, bannerKey) => (
    <div style={{ padding: '25px', backgroundColor: '#fff', borderRadius: '8px', marginBottom: '20px', border: '1px solid #e1e1e1' }}>
      <h4 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#1a1a1a' }}>{title}</h4>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Tiêu đề phụ</label>
          <input type="text" style={inputStyle} value={localConfig[bannerKey]?.subtitle || ''} onChange={e => setLocalConfig({ ...localConfig, [bannerKey]: { ...localConfig[bannerKey], subtitle: e.target.value } })} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Tiêu đề chính</label>
          <input type="text" style={inputStyle} value={localConfig[bannerKey]?.title || ''} onChange={e => setLocalConfig({ ...localConfig, [bannerKey]: { ...localConfig[bannerKey], title: e.target.value } })} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Link Hình Ảnh</label>
          <input type="text" style={inputStyle} value={localConfig[bannerKey]?.mediaUrl || ''} onChange={e => setLocalConfig({ ...localConfig, [bannerKey]: { ...localConfig[bannerKey], mediaUrl: e.target.value } })} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Đường dẫn (URL)</label>
          <input type="text" style={inputStyle} value={localConfig[bannerKey]?.link || ''} onChange={e => setLocalConfig({ ...localConfig, [bannerKey]: { ...localConfig[bannerKey], link: e.target.value } })} />
        </div>
      </div>
    </div>
  );

  // Sub-component render ô Showcase sản phẩm
  const renderShowcaseCMS = (title, showcaseKey) => {
    const catFilter = localConfig[showcaseKey]?.categoryFilter || 'bags';
    const catProducts = products?.filter(p => p.category === catFilter) || [];
    return (
      <div style={{ padding: '25px', backgroundColor: '#fff', borderRadius: '8px', marginBottom: '20px', border: '1px solid #e1e1e1' }}>
        <h4 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#1a1a1a' }}>{title}</h4>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '25px', borderBottom: '1px solid #eee', paddingBottom: '25px' }}>
          <div style={{ flex: 2 }}>
            <label style={labelStyle}>Tiêu đề khối</label>
            <input type="text" style={inputStyle} value={localConfig[showcaseKey]?.title || ''} onChange={e => setLocalConfig({ ...localConfig, [showcaseKey]: { ...localConfig[showcaseKey], title: e.target.value } })} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Chọn Đề Mục Gốc</label>
            <select style={selectStyle} value={catFilter} onChange={e => setLocalConfig({ ...localConfig, [showcaseKey]: { ...localConfig[showcaseKey], categoryFilter: e.target.value, selectedProducts: ["", "", "", ""] } })}>
              <option value="bags">Túi xách</option>
              <option value="jackets">Áo khoác</option>
              <option value="leather_goods">Ví & Phụ kiện</option>
              <option value="clothes">Trang phục</option>
              <option value="accessories">Phụ kiện</option>
              <option value="jewelry">Trang sức</option>
              <option value="travel">Du lịch</option>
              <option value="shoes">Giày</option>
              <option value="perfume">Nước hoa</option>
            </select>
          </div>
        </div>
        <div>
          <label style={{ ...labelStyle, color: '#e67e22', marginBottom: '15px' }}>⭐ CHỌN 4 SẢN PHẨM HIỂN THỊ (Tùy chọn)</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {[0, 1, 2, 3].map(index => (
              <div key={index} style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '4px', border: '1px dashed #ccc' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#333' }}>Vị trí {index + 1}</label>
                <select style={{ ...selectStyle, marginTop: '8px' }} value={(localConfig[showcaseKey]?.selectedProducts && localConfig[showcaseKey].selectedProducts[index]) || ""} onChange={(e) => handleSelectShowcaseProduct(showcaseKey, index, e.target.value)}>
                  <option value="">-- Để trống --</option>
                  {catProducts.map(p => (<option key={p._id} value={p._id}>{p.name}</option>))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ ...cardStyle, maxWidth: '1000px', margin: '0 auto' }}>
      <h3 style={{ marginBottom: '10px', fontSize: '22px' }}>Tùy Chỉnh Giao Diện Trang Chủ (CMS)</h3>

      {/* 1. Hero Banner */}
      <div style={{ padding: '25px', backgroundColor: '#fff', borderRadius: '8px', marginBottom: '20px', border: '1px solid #e1e1e1' }}>
        <h4 style={{ margin: '0 0 20px 0', fontSize: '16px' }}>1. Banner Chính Khổ Lớn</h4>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Tiêu đề phụ</label>
            <input type="text" style={inputStyle} value={localConfig.hero.subtitle} onChange={e => setLocalConfig({ ...localConfig, hero: { ...localConfig.hero, subtitle: e.target.value } })} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Tiêu đề chính</label>
            <input type="text" style={inputStyle} value={localConfig.hero.title} onChange={e => setLocalConfig({ ...localConfig, hero: { ...localConfig.hero, title: e.target.value } })} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Link Hình Ảnh / Video</label>
            <input type="text" style={inputStyle} value={localConfig.hero.mediaUrl} onChange={e => setLocalConfig({ ...localConfig, hero: { ...localConfig.hero, mediaUrl: e.target.value } })} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Đường dẫn (URL)</label>
            <input type="text" style={inputStyle} value={localConfig.hero.link} onChange={e => setLocalConfig({ ...localConfig, hero: { ...localConfig.hero, link: e.target.value } })} />
          </div>
        </div>
      </div>

      {/* 2. Danh mục động */}
      <div style={{ padding: '25px', backgroundColor: '#fff', borderRadius: '8px', marginBottom: '40px', border: '1px solid #e1e1e1' }}>
        <h4 style={{ margin: '0 0 15px 0', fontSize: '16px' }}>2. Khối Danh Mục Động</h4>
        <div style={{ marginBottom: '25px' }}>
          <label style={labelStyle}>Tiêu đề Lưới</label>
          <input type="text" style={inputStyle} value={localConfig.categoryGrid.title} onChange={e => setLocalConfig({ ...localConfig, categoryGrid: { ...localConfig.categoryGrid, title: e.target.value } })} />
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          {/* Ô Nữ */}
          <div style={{ flex: 1, backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '6px', border: '1px solid #eee' }}>
            <h5 style={{ margin: '0 0 15px 0' }}>👠 4 Ô Đồ Nữ</h5>
            {localConfig.categoryGrid.women.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px dashed #d0d0d0' }}>
                <input type="text" placeholder="Tên" style={{ ...inputStyle, padding: '8px', marginBottom: '5px', fontSize: '13px' }} value={item.title} onChange={e => updateCategoryGrid('women', idx, 'title', e.target.value)} />
                <input type="text" placeholder="Link Ảnh" style={{ ...inputStyle, padding: '8px', marginBottom: '5px', fontSize: '13px' }} value={item.image} onChange={e => updateCategoryGrid('women', idx, 'image', e.target.value)} />
                <select style={{ ...selectStyle, padding: '8px', fontSize: '13px' }} value={item.link} onChange={e => updateCategoryGrid('women', idx, 'link', e.target.value)}>
                  {routeOptions.map((opt, i) => (<option key={i} value={opt.value} disabled={opt.value === ""}>{opt.label}</option>))}
                </select>
              </div>
            ))}
          </div>
          {/* Ô Nam */}
          <div style={{ flex: 1, backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '6px', border: '1px solid #eee' }}>
            <h5 style={{ margin: '0 0 15px 0' }}>🕴️ 4 Ô Đồ Nam</h5>
            {localConfig.categoryGrid.men.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px dashed #d0d0d0' }}>
                <input type="text" placeholder="Tên" style={{ ...inputStyle, padding: '8px', marginBottom: '5px', fontSize: '13px' }} value={item.title} onChange={e => updateCategoryGrid('men', idx, 'title', e.target.value)} />
                <input type="text" placeholder="Link Ảnh" style={{ ...inputStyle, padding: '8px', marginBottom: '5px', fontSize: '13px' }} value={item.image} onChange={e => updateCategoryGrid('men', idx, 'image', e.target.value)} />
                <select style={{ ...selectStyle, padding: '8px', fontSize: '13px' }} value={item.link} onChange={e => updateCategoryGrid('men', idx, 'link', e.target.value)}>
                  {routeOptions.map((opt, i) => (<option key={i} value={opt.value} disabled={opt.value === ""}>{opt.label}</option>))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3-8. Banners & Showcases */}
      {renderBannerCMS("3. Banner Cắt Ngang Số 1", "banner1")}
      {renderShowcaseCMS("4. Khối Trưng Bày Động (Số 2)", "productShowcase")}
      {renderBannerCMS("5. Banner Cắt Ngang Số 2", "banner2")}
      {renderShowcaseCMS("6. Khối Trưng Bày Động (Số 3)", "productShowcase2")}
      {renderBannerCMS("7. Banner Cắt Ngang Số 3", "banner3")}
      {renderShowcaseCMS("8. Khối Trưng Bày Động (Số 4)", "productShowcase3")}

      {/* Nút lưu toàn bộ */}
      <button onClick={handleSaveHomepageConfig} style={{ width: '100%', padding: '16px', backgroundColor: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        💾 Lưu Toàn Bộ Giao Diện
      </button>
    </div>
  );
};

// CSS Styles
const cardStyle = { backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', border: '1px solid #eaeaea' };
const labelStyle = { display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 'bold', color: '#555' };
const inputStyle = { width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none', boxSizing: 'border-box', backgroundColor: '#fff', fontSize: '14px' };
const selectStyle = { width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px', backgroundColor: '#fff', cursor: 'pointer', outline: 'none', fontSize: '14px' };

export default HomepageConfigTab;