import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './footerPages.css';

const FashionShowsPage = () => {
  const [selectedShow, setSelectedShow] = useState('ss26');

  const shows = {
    ss26: {
      season: "Spring / Summer 2026",
      title: "Oceania Dreams: Bản Giao Hưởng Của Sóng",
      location: "Bờ biển Côte d'Azur, Pháp",
      music: "Soundtrack bởi Nghệ sĩ giao hưởng Paris",
      desc: "Lấy cảm hứng từ những tia nắng bình minh khúc xạ qua làn nước biển Địa Trung Hải, bộ sưu tập Xuân Hè 2026 mang đến các thiết kế lụa bay bổng kết hợp cùng cấu trúc da mềm mại, khắc họa tinh thần tự do và nét quyến rũ không giới hạn.",
      heroImg: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80",
      looks: [
        { img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80", caption: "Look 01: Váy lụa xếp nếp xẻ tà với chi tiết vỏ sò mạ vàng" },
        { img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80", caption: "Look 08: Áo khoác dạ may đo cùng túi cầm tay The Wave" },
        { img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80", caption: "Look 19: Bộ âu phục linen tự nhiên kết hợp phụ kiện da thuộc thảo mộc" },
        { img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80", caption: "Look 27: Đầm dạ hội lụa Organza lấy cảm hứng từ bọt sóng đại dương" }
      ]
    },
    fw25: {
      season: "Fall / Winter 2025",
      title: "Maritime Architecture: Đường Nét Vượt Thời Gian",
      location: "Grand Palais, Paris",
      music: "Ambient & Cello điện tử",
      desc: "Sự đối thoại táo bạo giữa những phom dáng hình học vững chãi của hải đăng ven biển và sự mềm mại của len Cashmere nguyên chất. Một tuyên ngôn mạnh mẽ về phong cách thanh lịch hiện đại.",
      heroImg: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80",
      looks: [
        { img: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80", caption: "Look 03: Áo măng tô Cashmere hai mặt khâu tay" },
        { img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80", caption: "Look 12: Đầm len dệt kim ôm dáng cùng thắt lưng khóa The Sea Monogram" },
        { img: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=600&q=80", caption: "Look 21: Áo choàng cape dạ cừu và bốt da cao cổ" },
        { img: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=600&q=80", caption: "Look 30: Bộ đầm nhung đen kết hợp clutch kim loại mạ vàng" }
      ]
    }
  };

  const current = shows[selectedShow];

  return (
    <div className="luxury-page">
      <div className="luxury-hero" style={{ backgroundImage: `url('${current.heroImg}')` }}>
        <div className="luxury-hero-overlay"></div>
        <div className="luxury-hero-content">
          <span className="luxury-hero-tag">Runway & Haute Couture</span>
          <h1 className="luxury-hero-title">Sàn Diễn Thời Trang THE SEA</h1>
          <p className="luxury-hero-desc">
            Nơi hội tụ đỉnh cao nghệ thuật thị giác, xúc cảm âm nhạc và những sáng tạo đột phá định hình xu hướng thời trang toàn cầu.
          </p>
          <div className="luxury-breadcrumb">
            <Link to="/homepage">Trang chủ</Link>
            <span>/</span>
            <span>About THE SEA</span>
            <span>/</span>
            <span>Fashion Shows</span>
          </div>
        </div>
      </div>

      <div className="luxury-container">
        {/* Season Selector */}
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "50px" }}>
          <button
            onClick={() => setSelectedShow('ss26')}
            style={{
              padding: "14px 30px",
              background: selectedShow === 'ss26' ? "#111" : "#f5f5f5",
              color: selectedShow === 'ss26' ? "#fff" : "#333",
              border: "none",
              fontSize: "12px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Spring / Summer 2026
          </button>
          <button
            onClick={() => setSelectedShow('fw25')}
            style={{
              padding: "14px 30px",
              background: selectedShow === 'fw25' ? "#111" : "#f5f5f5",
              color: selectedShow === 'fw25' ? "#fff" : "#333",
              border: "none",
              fontSize: "12px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Fall / Winter 2025
          </button>
        </div>

        {/* Show Overview */}
        <div style={{ maxWidth: "800px", margin: "0 auto 70px auto", textAlign: "center" }}>
          <span className="luxury-split-tag">{current.location}</span>
          <h2 className="luxury-section-title" style={{ fontSize: "32px", marginBottom: "15px" }}>{current.title}</h2>
          <p style={{ fontSize: "15px", lineHeight: "1.9", color: "#555", marginBottom: "20px" }}>
            {current.desc}
          </p>
          <span style={{ fontSize: "13px", color: "#888", fontStyle: "italic" }}>
            {current.music}
          </span>
        </div>

        {/* Runway Looks Gallery */}
        <h3 className="luxury-section-title" style={{ fontSize: "22px", marginBottom: "40px" }}>Các Thiết Kế Tiêu Biểu (Key Looks)</h3>
        <div className="luxury-grid-4">
          {current.looks.map((look, idx) => (
            <div key={idx} className="luxury-card">
              <div style={{ height: "420px", overflow: "hidden" }}>
                <img 
                  src={look.img} 
                  alt={look.caption} 
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                />
              </div>
              <div style={{ padding: "20px", background: "#fff", flexGrow: 1 }}>
                <p style={{ margin: 0, fontSize: "13px", lineHeight: "1.6", color: "#333" }}>{look.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Explore Collection Link */}
        <div style={{ textAlign: "center", marginTop: "40px", marginBottom: "70px" }}>
          <Link to="/women/clothing" className="luxury-btn-dark">
            Khám Phá Bộ Sưu Tập Mới
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FashionShowsPage;
