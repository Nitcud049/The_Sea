import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import HeroVideo from '../components/HeroVideo';

// Bổ sung currentUser và setCurrentUser vào trong ngoặc

function Home({ products, setSelectedProduct, addToCart, formatPrice, homepageConfig, currentUser, setCurrentUser }) {
    // ...

  
  // 1. CẤU HÌNH MẶC ĐỊNH MỚI (Đã bổ sung Banner 2, Banner 3 và Showcase 3, Showcase 4)
  const defaultConfig = {
    hero: { mediaUrl: "/images/hero-video.mp4", subtitle: "DÀNH CHO NỮ", title: "Thiết Kế Biểu Tượng", link: "/women/bags", btnText: "Khám phá" },
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
    banner1: { mediaUrl: "/images/banner4.jpg", subtitle: "DÀNH CHO NAM", title: "Bộ sưu tập Thu-Đông 2026", link: "/men/new-arrivals", btnText: "Khám phá ngay" },
    productShowcase: { title: "Sản Phẩm Nổi Bật", categoryFilter: "bags", selectedProducts: ["", "", "", ""] },
    
    // -- CÁC MỤC MỚI ĐƯỢC THÊM VÀO --
    banner2: { mediaUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80", subtitle: "BỘ SƯU TẬP MỚI", title: "Thanh Lịch Vượt Thời Gian", link: "/women/new-arrivals", btnText: "Khám phá ngay" },
    productShowcase2: { title: "Dành Cho Nữ", categoryFilter: "bags", selectedProducts: ["", "", "", ""] },
    banner3: { mediaUrl: "https://images.unsplash.com/photo-1441984904996-e0b6eddec374?w=1600&q=80", subtitle: "PHỤ KIỆN", title: "Điểm Nhấn Hoàn Hảo", link: "/women/jewelry", btnText: "Mua sắm ngay" },
    productShowcase3: { title: "Trang Sức Nổi Bật", categoryFilter: "jewelry", selectedProducts: ["", "", "", ""] }
  };

  const config = (homepageConfig && homepageConfig.categoryGrid) ? homepageConfig : defaultConfig;
  // Đảm bảo không bị lỗi trắng trang nếu CSDL cũ chưa có các field mới
  const finalConfig = { ...defaultConfig, ...config }; 

  // ==========================================
  // HÀM RENDER BANNER CHUNG (Khỏi phải viết lại HTML 3 lần)
  // ==========================================
  const renderBanner = (bannerConfig) => {
      if (!bannerConfig) return null;
      return (
          <div style={{ position: 'relative', width: '100%', height: '70vh', backgroundColor: '#000', marginBottom: '60px' }}>
              <img src={bannerConfig.mediaUrl} alt="Banner" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.8 }} />
              <div style={{ position: 'absolute', bottom: '60px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', color: '#fff', width: '100%' }}>
                  <p style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>{bannerConfig.subtitle}</p>
                  <h2 style={{ fontSize: '42px', margin: '0 0 25px 0', fontFamily: "'Playfair Display', serif" }}>{bannerConfig.title}</h2>
                  <Link to={bannerConfig.link} style={{ textDecoration: 'none', padding: '12px 30px', backgroundColor: '#fff', color: '#1a1a1a', border: 'none', display: 'inline-block' }}>{bannerConfig.btnText}</Link>
              </div>
          </div>
      );
  };

  // ==========================================
  // HÀM RENDER KHỐI SẢN PHẨM CHUNG
  // ==========================================
  const renderShowcase = (showcaseConfig) => {
      if (!showcaseConfig) return null;
      let displayProducts = [];
      
      if (products && products.length > 0) {
          const hasManualSelection = showcaseConfig.selectedProducts && showcaseConfig.selectedProducts.some(id => id !== "");
          if (hasManualSelection) {
              displayProducts = showcaseConfig.selectedProducts
                  .map(id => products.find(p => p._id === id))
                  .filter(p => p !== undefined); 
          } else {
              displayProducts = products
                  .filter(p => p.category === showcaseConfig.categoryFilter)
                  .slice(0, 4);
          }
      }

      return (
          <div style={{ padding: '0 40px 80px 40px', maxWidth: '1600px', margin: '0 auto' }}>
              <h3 style={{ fontSize: '22px', textTransform: 'uppercase', marginBottom: '30px', textAlign: 'center', letterSpacing: '1px' }}>{showcaseConfig.title}</h3>
              <div className="w3-row-padding" style={{ margin: "0 -20px" }}>
                  {displayProducts.length > 0 ? (
                      displayProducts.map((product) => ( 
                          <ProductCard 
                              key={product._id} 
                              product={product} 
                              setSelectedProduct={setSelectedProduct} 
                              addToCart={addToCart} 
                              formatPrice={formatPrice} 
                              
                              // 🚀 THÊM 2 DÒNG NÀY VÀO ĐÂY LÀ KHẮC PHỤC XONG CHỐT 3:
                              currentUser={currentUser}
                              setCurrentUser={setCurrentUser}
                          /> 
                      ))
                  ) : ( 
                      <p style={{textAlign: 'center', width: '100%', color: '#666', fontStyle: 'italic'}}>Không có sản phẩm nào để hiển thị.</p> 
                  )}
              </div>
          </div>
      );
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      
      {/* 1. HERO & LƯỚI DANH MỤC */}
      <HeroVideo heroConfig={finalConfig.hero} />

      <div style={{ textAlign: 'center', padding: '70px 20px 50px 20px' }}>
          <h3 style={{ fontSize: '26px', fontWeight: '400', margin: 0, lineHeight: '1.4', color: '#1a1a1a' }}>{finalConfig.categoryGrid.title}</h3>
      </div>

      <div style={{ padding: '0 40px', maxWidth: '1600px', margin: '0 auto', marginBottom: '80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {finalConfig.categoryGrid.women.map((cat, index) => (
            <Link to={cat.link} key={`w-${index}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', textAlign: 'center' }}>
              <div style={{ overflow: 'hidden', backgroundColor: '#f6f5f3', marginBottom: '15px' }}>
                <img src={cat.image} alt={cat.title} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', transition: 'transform 0.6s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
              </div>
              <h3 style={{ fontSize: '14px', fontWeight: '400', margin: 0, color: '#1a1a1a' }}>{cat.title}</h3>
            </Link>
          ))}
          {finalConfig.categoryGrid.men.map((cat, index) => (
            <Link to={cat.link} key={`m-${index}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', textAlign: 'center' }}>
              <div style={{ overflow: 'hidden', backgroundColor: '#f6f5f3', marginBottom: '15px' }}>
                <img src={cat.image} alt={cat.title} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', transition: 'transform 0.6s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
              </div>
              <h3 style={{ fontSize: '14px', fontWeight: '400', margin: 0, color: '#1a1a1a' }}>{cat.title}</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* RENDER LIÊN TIẾP CÁC KHỐI CMS MÀ KHÔNG BỊ DÀI CODE */}
      {renderBanner(finalConfig.banner1)}
      {renderShowcase(finalConfig.productShowcase)}
      
      {renderBanner(finalConfig.banner2)}
      {renderShowcase(finalConfig.productShowcase2)}
      
      {renderBanner(finalConfig.banner3)}
      {renderShowcase(finalConfig.productShowcase3)}

    </div>
  );
}

export default Home;