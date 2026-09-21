import React, { useState, useEffect } from 'react';
import { Save, Image as ImageIcon, Link as LinkIcon, Plus, Trash2, ChevronDown, ChevronUp, LayoutGrid, ShoppingBag, Sparkles } from 'lucide-react';

const HomepageCMSTab = ({ config, products = [], onSave }) => {
  // Danh sách đầy đủ các tuyến đường (Routes) để cấu hình điều hướng link
  const routeOptions = [
    { label: "Tất cả sản phẩm Nữ", value: "/women" },
    { label: "Túi xách Nữ", value: "/women/bags" },
    { label: "Ví Nữ", value: "/women/wallets" },
    { label: "Giày Nữ", value: "/women/shoes" },
    { label: "Phụ kiện Nữ", value: "/women/accessories" },
    { label: "Trang sức Nữ", value: "/women/jewelry" },
    { label: "Nước hoa Nữ", value: "/women/perfumes" },
    { label: "Tất cả sản phẩm Nam", value: "/men" },
    { label: "Túi xách Nam", value: "/men/bags" },
    { label: "Ví Nam", value: "/men/wallets" },
    { label: "Giày Nam", value: "/men/shoes" },
    { label: "Phụ kiện Nam", value: "/men/accessories" },
    { label: "Thắt lưng Nam", value: "/men/belts" },
    { label: "Nước hoa Nam", value: "/men/perfumes" },
    { label: "Sản phẩm Mới (New Arrivals)", value: "/collections/new-arrivals" },
    { label: "Khuyến mãi (Sale)", value: "/collections/sale" }
  ];

  // State mặc định đủ 8 khối cấu hình CMS
  const defaultConfig = {
    heroBanner: {
      title: "BỘ BỘ SƯU TẬP MÙA HÈ 2026",
      subtitle: "Khám phá phong cách sang trọng và thời thượng",
      imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600",
      buttonText: "Khám Phá Ngay",
      linkUrl: "/women"
    },
    categoryGrid: {
      women: [
        { title: "Túi Xách", imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600", linkUrl: "/women/bags" },
        { title: "Ví & Clutches", imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=600", linkUrl: "/women/wallets" },
        { title: "Giày High Heels", imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600", linkUrl: "/women/shoes" },
        { title: "Trang Sức", imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600", linkUrl: "/women/jewelry" }
      ],
      men: [
        { title: "Túi & Balo", imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600", linkUrl: "/men/bags" },
        { title: "Ví Da", imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=600", linkUrl: "/men/wallets" },
        { title: "Giày Nam", imageUrl: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=600", linkUrl: "/men/shoes" },
        { title: "Thắt Lưng", imageUrl: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=600", linkUrl: "/men/belts" }
      ]
    },
    banner1: {
      title: "BST TÚI DA CAO CẤP",
      subtitle: "Chế tác thủ công tỉ mỉ từng đường kim mũi chỉ",
      imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200",
      linkUrl: "/women/bags"
    },
    productShowcase1: {
      title: "Sản Phẩm Bán Chạy Nhất",
      subtitle: "Được khách hàng yêu thích nhất trong tháng",
      productIds: []
    },
    banner2: {
      title: "NƯỚC HOA & PHỤ KIỆN",
      subtitle: "Hương thơm độc bản khẳng định đẳng cấp",
      imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200",
      linkUrl: "/women/perfumes"
    },
    productShowcase2: {
      title: "BST Nước Hoa & Trang Sức",
      subtitle: "Gợi ý quà tặng sang trọng",
      productIds: []
    },
    banner3: {
      title: "DÀNH RIÊNG CHO PHÁI MẠNH",
      subtitle: "Lịch lãm, tinh tế trong từng chi tiết",
      imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200",
      linkUrl: "/men"
    },
    productShowcase3: {
      title: "Thời Trang Nam Nổi Bật",
      subtitle: "Thiết kế hiện đại cho quý ông thành đạt",
      productIds: []
    }
  };

  const [localConfig, setLocalConfig] = useState(defaultConfig);
  const [activeAccordion, setActiveAccordion] = useState('heroBanner'); // Quản lý đóng/mở từng phần

  useEffect(() => {
    if (config) {
      setLocalConfig(prev => ({
        ...defaultConfig,
        ...config,
        categoryGrid: config.categoryGrid || defaultConfig.categoryGrid,
        heroBanner: config.heroBanner || defaultConfig.heroBanner
      }));
    }
  }, [config]);

  // Cập nhật các field cơ bản của Banner
  const handleBannerChange = (section, field, value) => {
    setLocalConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Cập nhật các ô trong CategoryGrid (Nam / Nữ)
  const handleCategoryGridChange = (gender, index, field, value) => {
    setLocalConfig(prev => {
      const updatedList = [...prev.categoryGrid[gender]];
      updatedList[index] = { ...updatedList[index], [field]: value };
      return {
        ...prev,
        categoryGrid: {
          ...prev.categoryGrid,
          [gender]: updatedList
        }
      };
    });
  };

  // Chọn/Bỏ chọn sản phẩm hiển thị trong Showcase
  const handleToggleShowcaseProduct = (showcaseKey, productId) => {
    setLocalConfig(prev => {
      const currentIds = prev[showcaseKey]?.productIds || [];
      const updatedIds = currentIds.includes(productId)
        ? currentIds.filter(id => id !== productId)
        : [...currentIds, productId];

      return {
        ...prev,
        [showcaseKey]: {
          ...prev[showcaseKey],
          productIds: updatedIds
        }
      };
    });
  };

  const handleSave = () => {
    if (onSave) {
      onSave(localConfig);
      alert('Đã lưu cấu hình giao diện trang chủ thành công!');
    }
  };

  const toggleSection = (sectionKey) => {
    setActiveAccordion(activeAccordion === sectionKey ? null : sectionKey);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header Tab */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Quản Lý Quản Trị Giao Diện Trang Chủ (CMS)
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Tùy chỉnh hình ảnh, banner, các bộ sưu tập và đường dẫn hiển thị trên trang chủ.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition flex items-center gap-2 shadow-sm"
        >
          <Save className="w-4 h-4" />
          Lưu Tất Cả Cấu Hình
        </button>
      </div>

      {/* 1. KHỐI HERO BANNER CHÍNH */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <button
          onClick={() => toggleSection('heroBanner')}
          className="w-full px-6 py-4 bg-gray-50 flex justify-between items-center font-bold text-gray-800 border-b hover:bg-gray-100 transition"
        >
          <span className="flex items-center gap-2"><ImageIcon className="w-5 h-5 text-blue-600" /> 1. Banner Chính Khổ Lớn (Hero Banner)</span>
          {activeAccordion === 'heroBanner' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        {activeAccordion === 'heroBanner' && (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề chính</label>
                <input
                  type="text"
                  value={localConfig.heroBanner.title}
                  onChange={(e) => handleBannerChange('heroBanner', 'title', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề phụ (Subtitle)</label>
                <input
                  type="text"
                  value={localConfig.heroBanner.subtitle}
                  onChange={(e) => handleBannerChange('heroBanner', 'subtitle', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">URL Hình Ảnh</label>
                <input
                  type="text"
                  value={localConfig.heroBanner.imageUrl}
                  onChange={(e) => handleBannerChange('heroBanner', 'imageUrl', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chuyển Hướng Đến Route</label>
                <select
                  value={localConfig.heroBanner.linkUrl}
                  onChange={(e) => handleBannerChange('heroBanner', 'linkUrl', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                >
                  {routeOptions.map((opt, idx) => (
                    <option key={idx} value={opt.value}>{opt.label} ({opt.value})</option>
                  ))}
                </select>
              </div>
            </div>
            {localConfig.heroBanner.imageUrl && (
              <div className="mt-2 h-40 rounded-lg overflow-hidden border">
                <img src={localConfig.heroBanner.imageUrl} alt="Hero Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2. KHỐI LƯỚI DANH MỤC (CATEGORY GRID) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <button
          onClick={() => toggleSection('categoryGrid')}
          className="w-full px-6 py-4 bg-gray-50 flex justify-between items-center font-bold text-gray-800 border-b hover:bg-gray-100 transition"
        >
          <span className="flex items-center gap-2"><LayoutGrid className="w-5 h-5 text-purple-600" /> 2. Lưới Danh Mục Nổi Bật (Category Grid Nam & Nữ)</span>
          {activeAccordion === 'categoryGrid' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        {activeAccordion === 'categoryGrid' && (
          <div className="p-6 space-y-6">
            {/* Mục Nữ */}
            <div>
              <h4 className="font-bold text-pink-600 mb-3 border-b pb-1">4 Ô Danh Mục Thời Trang Nữ</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {localConfig.categoryGrid.women.map((item, idx) => (
                  <div key={idx} className="p-4 border rounded-lg bg-gray-50 space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-gray-500">
                      <span>Ô {idx + 1}</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Tiêu đề danh mục"
                      value={item.title}
                      onChange={(e) => handleCategoryGridChange('women', idx, 'title', e.target.value)}
                      className="w-full px-3 py-1.5 border rounded bg-white text-sm"
                    />
                    <input
                      type="text"
                      placeholder="URL Ảnh"
                      value={item.imageUrl}
                      onChange={(e) => handleCategoryGridChange('women', idx, 'imageUrl', e.target.value)}
                      className="w-full px-3 py-1.5 border rounded bg-white text-sm"
                    />
                    <select
                      value={item.linkUrl}
                      onChange={(e) => handleCategoryGridChange('women', idx, 'linkUrl', e.target.value)}
                      className="w-full px-3 py-1.5 border rounded bg-white text-sm"
                    >
                      {routeOptions.map((opt, rIdx) => (
                        <option key={rIdx} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Mục Nam */}
            <div>
              <h4 className="font-bold text-blue-600 mb-3 border-b pb-1">4 Ô Danh Mục Thời Trang Nam</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {localConfig.categoryGrid.men.map((item, idx) => (
                  <div key={idx} className="p-4 border rounded-lg bg-gray-50 space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-gray-500">
                      <span>Ô {idx + 1}</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Tiêu đề danh mục"
                      value={item.title}
                      onChange={(e) => handleCategoryGridChange('men', idx, 'title', e.target.value)}
                      className="w-full px-3 py-1.5 border rounded bg-white text-sm"
                    />
                    <input
                      type="text"
                      placeholder="URL Ảnh"
                      value={item.imageUrl}
                      onChange={(e) => handleCategoryGridChange('men', idx, 'imageUrl', e.target.value)}
                      className="w-full px-3 py-1.5 border rounded bg-white text-sm"
                    />
                    <select
                      value={item.linkUrl}
                      onChange={(e) => handleCategoryGridChange('men', idx, 'linkUrl', e.target.value)}
                      className="w-full px-3 py-1.5 border rounded bg-white text-sm"
                    >
                      {routeOptions.map((opt, rIdx) => (
                        <option key={rIdx} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3, 5, 7. CÁC KHỐI BANNER PHỤ (BANNER 1, BANNER 2, BANNER 3) */}
      {['banner1', 'banner2', 'banner3'].map((bannerKey, idx) => (
        <div key={bannerKey} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => toggleSection(bannerKey)}
            className="w-full px-6 py-4 bg-gray-50 flex justify-between items-center font-bold text-gray-800 border-b hover:bg-gray-100 transition"
          >
            <span className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-emerald-600" />
              {idx * 2 + 3}. Banner Quảng Cáo {idx + 1} ({localConfig[bannerKey]?.title || 'Chưa đặt tiêu đề'})
            </span>
            {activeAccordion === bannerKey ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {activeAccordion === bannerKey && (
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề Banner</label>
                  <input
                    type="text"
                    value={localConfig[bannerKey]?.title || ''}
                    onChange={(e) => handleBannerChange(bannerKey, 'title', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn (Subtitle)</label>
                  <input
                    type="text"
                    value={localConfig[bannerKey]?.subtitle || ''}
                    onChange={(e) => handleBannerChange(bannerKey, 'subtitle', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL Hình Ảnh</label>
                  <input
                    type="text"
                    value={localConfig[bannerKey]?.imageUrl || ''}
                    onChange={(e) => handleBannerChange(bannerKey, 'imageUrl', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Liên kết tới Route</label>
                  <select
                    value={localConfig[bannerKey]?.linkUrl || ''}
                    onChange={(e) => handleBannerChange(bannerKey, 'linkUrl', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                  >
                    {routeOptions.map((opt, rIdx) => (
                      <option key={rIdx} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* 4, 6, 8. CÁC KHỐI SẢN PHẨM NỔI BẬT (SHOWCASE 1, SHOWCASE 2, SHOWCASE 3) */}
      {['productShowcase1', 'productShowcase2', 'productShowcase3'].map((showcaseKey, idx) => (
        <div key={showcaseKey} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => toggleSection(showcaseKey)}
            className="w-full px-6 py-4 bg-gray-50 flex justify-between items-center font-bold text-gray-800 border-b hover:bg-gray-100 transition"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-600" />
              {idx * 2 + 4}. Khối Sản Phẩm Nổi Bật {idx + 1} ({localConfig[showcaseKey]?.title})
            </span>
            {activeAccordion === showcaseKey ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {activeAccordion === showcaseKey && (
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề khối sản phẩm</label>
                  <input
                    type="text"
                    value={localConfig[showcaseKey]?.title || ''}
                    onChange={(e) => handleBannerChange(showcaseKey, 'title', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn</label>
                  <input
                    type="text"
                    value={localConfig[showcaseKey]?.subtitle || ''}
                    onChange={(e) => handleBannerChange(showcaseKey, 'subtitle', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                  />
                </div>
              </div>

              {/* Danh sách chọn sản phẩm đưa vào Showcase */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tích chọn các sản phẩm muốn hiển thị ở khối này (Đã chọn: {localConfig[showcaseKey]?.productIds?.length || 0})
                </label>
                <div className="max-h-60 overflow-y-auto border rounded-lg p-3 grid grid-cols-1 md:grid-cols-2 gap-2 bg-gray-50">
                  {products.length === 0 && <p className="text-sm text-gray-400 italic">Chưa có sản phẩm nào trong hệ thống.</p>}
                  {products.map((prod) => {
                    const isSelected = localConfig[showcaseKey]?.productIds?.includes(prod.id);
                    return (
                      <div
                        key={prod.id}
                        onClick={() => handleToggleShowcaseProduct(showcaseKey, prod.id)}
                        className={`p-2 rounded border flex items-center gap-3 cursor-pointer transition ${
                          isSelected ? 'bg-black text-white border-black' : 'bg-white text-gray-800 border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected || false}
                          onChange={() => {}} // Đã handle ở div cha
                          className="w-4 h-4 rounded text-black"
                        />
                        <img src={prod.mainImage || prod.image} alt="" className="w-10 h-10 object-cover rounded bg-gray-100" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold truncate">{prod.name}</p>
                          <p className={`text-xs ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>{Number(prod.price).toLocaleString()} VNĐ</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HomepageCMSTab;