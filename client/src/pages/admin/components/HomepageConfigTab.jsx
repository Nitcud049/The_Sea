import React, { useState, useEffect, useRef } from 'react';

// Cấu hình tĩnh: không tạo lại sau mỗi lần render.
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

// Tạo bản sao độc lập và bổ sung các phần còn thiếu trong cấu hình cũ.
function normalizeHomepageConfig(config) {
  const saved = config && typeof config === 'object' && !Array.isArray(config)
    ? config : {};
  const merged = { ...defaultHomepageConfig, ...saved };

  for (const key of Object.keys(defaultHomepageConfig)) {
    merged[key] = {
      ...defaultHomepageConfig[key],
      ...(saved[key] || {})
    };
  }

  for (const gender of ['women', 'men']) {
    merged.categoryGrid[gender] = Array.from({ length: 4 }, (_, index) => ({
      ...defaultHomepageConfig.categoryGrid[gender][index],
      ...(saved.categoryGrid?.[gender]?.[index] || {})
    }));
  }

  for (const key of ['productShowcase', 'productShowcase2', 'productShowcase3']) {
    merged[key].selectedProducts = Array.from({ length: 4 }, (_, index) =>
      typeof saved[key]?.selectedProducts?.[index] === 'string'
        ? saved[key].selectedProducts[index] : ''
    );
  }

  return JSON.parse(JSON.stringify(merged));
}

const HomepageConfigTab = ({ homepageConfig, setHomepageConfig, products = [] }) => {
  const [localConfig, setLocalConfigState] = useState(() =>
    normalizeHomepageConfig(homepageConfig)
  );
  const [isSaving, setIsSaving] = useState(false);
  const dirtyRef = useRef(false);
  const savingRef = useRef(false);

  // Các ô nhập hiện có gọi hàm này để đánh dấu bản nháp đã chỉnh sửa.
  const setLocalConfig = nextConfig => {
    if (savingRef.current) return;
    dirtyRef.current = true;
    setLocalConfigState(nextConfig);
  };

  // Nhận dữ liệu tải bất đồng bộ, nhưng không ghi đè bản nháp đang sửa.
  useEffect(() => {
    if (!dirtyRef.current && !savingRef.current) {
      setLocalConfigState(normalizeHomepageConfig(homepageConfig));
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

  // Chỉ cập nhật cấu hình ở component cha sau khi server xác nhận lưu.
  const handleSaveHomepageConfig = async () => {
    if (savingRef.current) return;
    savingRef.current = true;
    setIsSaving(true);
    const snapshot = normalizeHomepageConfig(localConfig);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/settings/homepage', {
        method: 'POST',
        // Giữ hợp đồng API settings hiện tại; cần chuyển sang Bearer token
        // đồng bộ với server khi hoàn tất bước tích hợp xác thực.
        headers: { 'Content-Type': 'application/json', 'x-user-role': 'admin' },
        body: JSON.stringify({ config: snapshot })
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || data?.success !== true) {
        throw new Error(data?.message || 'Máy chủ chưa xác nhận lưu cấu hình.');
      }

      dirtyRef.current = false;
      setLocalConfigState(snapshot);
      if (typeof setHomepageConfig === 'function') {
        setHomepageConfig(snapshot);
      }
      alert('Đã lưu giao diện trang chủ thành công!');
    } catch (error) {
      alert(`Không lưu được cấu hình: ${error.message}`);
    } finally {
      savingRef.current = false;
      setIsSaving(false);
    }
  };

  // Sao chép cả mảng và đối tượng ô; không sửa trực tiếp props/state cũ.
  const updateCategoryGrid = (gender, index, field, value) => {
    setLocalConfig(previous => ({
      ...previous,
      categoryGrid: {
        ...previous.categoryGrid,
        [gender]: previous.categoryGrid[gender].map((item, itemIndex) =>
          itemIndex === index ? { ...item, [field]: value } : item
        )
      }
    }));
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

      <fieldset disabled={isSaving} style={{ border: 0, margin: 0, padding: 0, minWidth: 0 }}>
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
      <button type="button" disabled={isSaving} onClick={handleSaveHomepageConfig} style={{ width: '100%', padding: '16px', backgroundColor: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        {isSaving ? 'Đang lưu...' : '💾 Lưu Toàn Bộ Giao Diện'}
      </button>
      </fieldset>
    </div>
  );
};

// CSS Styles
const cardStyle = { backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', border: '1px solid #eaeaea' };
const labelStyle = { display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 'bold', color: '#555' };
const inputStyle = { width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px', outline: 'none', boxSizing: 'border-box', backgroundColor: '#fff', fontSize: '14px' };
const selectStyle = { width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px', backgroundColor: '#fff', cursor: 'pointer', outline: 'none', fontSize: '14px' };

export default HomepageConfigTab;