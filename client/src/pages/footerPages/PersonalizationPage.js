import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './footerPages.css';

const PersonalizationPage = () => {
  const [initials, setInitials] = useState('TS');
  const [foilColor, setFoilColor] = useState('gold');

  const foilStyles = {
    gold: {
      color: '#d4af37',
      textShadow: '0 1px 2px rgba(0,0,0,0.4)',
      border: '1px solid #d4af37'
    },
    silver: {
      color: '#e0e0e0',
      textShadow: '0 1px 2px rgba(0,0,0,0.5)',
      border: '1px solid #c0c0c0'
    },
    blind: {
      color: '#2a221b',
      textShadow: 'inset 0 1px 2px rgba(0,0,0,0.8), 0 1px 1px rgba(255,255,255,0.1)',
      border: '1px solid #443528'
    }
  };

  const services = [
    {
      title: "Hot Stamping (Ép Nhũ Kim)",
      desc: "Nghệ thuật dập chìm các chữ cái viết tắt tên của quý khách bằng lá kim loại vàng 24K, bạc ánh kim hoặc dập chìm không màu thanh lịch lên các phụ kiện da nhỏ, thẻ tên hành lý và quai túi.",
      tag: "Trực tiếp tại Boutique (15 - 30 phút)"
    },
    {
      title: "Hand-Painting (Vẽ Tay Nghệ Thuật)",
      desc: "Họa sĩ của Maison thực hiện các đường kẻ sọc thể thao cổ điển, huy hiệu gia đình hoặc các họa tiết hoa lá lấy cảm hứng từ biển khơi theo yêu cầu riêng của từng chủ nhân.",
      tag: "Độc bản theo đơn đặt hàng"
    },
    {
      title: "Bespoke Made-to-Order",
      desc: "Tự do lựa chọn loại da quý hiếm (da bê Barénia, da cá sấu Porosus), màu sắc lớp lót lụa và khắc dấu ấn cá nhân trên từng chi tiết khóa kim loại.",
      tag: "Chế tác thủ công từ 6 - 8 tuần"
    }
  ];

  return (
    <div className="luxury-page">
      <div className="luxury-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1547949003-9792a18a2601?w=1600&q=80')` }}>
        <div className="luxury-hero-overlay"></div>
        <div className="luxury-hero-content">
          <span className="luxury-hero-tag">Savoir-Faire</span>
          <h1 className="luxury-hero-title">Nghệ Thuật Cá Nhân Hóa</h1>
          <p className="luxury-hero-desc">
            Biến tuyệt tác THE SEA thành dấu ấn độc bản mang đậm câu chuyện và cá tính riêng của quý khách.
          </p>
          <div className="luxury-breadcrumb">
            <Link to="/homepage">Trang chủ</Link>
            <span>/</span>
            <Link to="/services">Dịch vụ</Link>
            <span>/</span>
            <span>Personalization</span>
          </div>
        </div>
      </div>

      <div className="luxury-container">
        {/* Interactive Monogram Tool */}
        <div style={{ background: "#1a1a1a", color: "#fff", padding: "60px 40px", borderRadius: "2px", marginBottom: "90px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--sea-gold)" }}>
              Trải Nghiệm Trực Quan
            </span>
            <h2 style={{ fontFamily: "var(--sea-font-title)", fontSize: "32px", fontWeight: "400", margin: "10px 0 15px 0" }}>
              Thử Nghiệm Chữ Viết Tắt (Monogram Studio)
            </h2>
            <p style={{ color: "#aaa", fontSize: "14px", maxWidth: "550px", margin: "0 auto" }}>
              Nhập từ 2 đến 3 chữ cái đại diện cho tên của quý khách và lựa chọn hiệu ứng ánh kim để xem trước dấu ấn.
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "60px", flexWrap: "wrap" }}>
            {/* Tag preview */}
            <div style={{ 
              width: "280px", 
              height: "360px", 
              backgroundColor: "#221915", 
              borderRadius: "8px", 
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 20px 40px rgba(0,0,0,0.6), inset 0 0 20px rgba(0,0,0,0.8)",
              border: "2px solid #3d2c23"
            }}>
              {/* Hole & strap of tag */}
              <div style={{ position: "absolute", top: "25px", width: "16px", height: "16px", borderRadius: "50%", background: "#111", border: "2px solid #5a4235" }}></div>
              <div style={{ position: "absolute", top: "0", width: "10px", height: "30px", background: "#3d2c23" }}></div>

              <span style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#8d705f", marginBottom: "25px" }}>
                THE SEA • PARIS
              </span>

              {/* Initials Display */}
              <div style={{ 
                fontFamily: "var(--sea-font-title)", 
                fontSize: "56px", 
                letterSpacing: "8px", 
                fontWeight: "700",
                ...foilStyles[foilColor]
              }}>
                {initials || "••"}
              </div>

              <span style={{ fontSize: "11px", color: "#997e6e", marginTop: "30px", letterSpacing: "1.5px" }}>
                HOT STAMPING
              </span>
            </div>

            {/* Controls */}
            <div style={{ width: "320px" }}>
              <div className="luxury-input-group">
                <label className="luxury-label" style={{ color: "#dcdcdc" }}>Nhập chữ cái viết tắt (Tối đa 3 ký tự)</label>
                <input
                  type="text"
                  maxLength="3"
                  className="luxury-input"
                  style={{ textTransform: "uppercase", fontSize: "18px", letterSpacing: "4px", textAlign: "center" }}
                  value={initials}
                  onChange={(e) => setInitials(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
                  placeholder="TS"
                />
              </div>

              <div className="luxury-input-group" style={{ marginTop: "25px" }}>
                <label className="luxury-label" style={{ color: "#dcdcdc" }}>Chọn sắc màu nhũ kim</label>
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button
                    onClick={() => setFoilColor('gold')}
                    style={{
                      flex: 1,
                      padding: "12px 0",
                      background: foilColor === 'gold' ? "#d4af37" : "#333",
                      color: foilColor === 'gold' ? "#000" : "#fff",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      fontWeight: "600"
                    }}
                  >
                    Vàng Gold
                  </button>
                  <button
                    onClick={() => setFoilColor('silver')}
                    style={{
                      flex: 1,
                      padding: "12px 0",
                      background: foilColor === 'silver' ? "#e0e0e0" : "#333",
                      color: foilColor === 'silver' ? "#000" : "#fff",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      fontWeight: "600"
                    }}
                  >
                    Bạc Silver
                  </button>
                  <button
                    onClick={() => setFoilColor('blind')}
                    style={{
                      flex: 1,
                      padding: "12px 0",
                      background: foilColor === 'blind' ? "#5a4335" : "#333",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      fontWeight: "600"
                    }}
                  >
                    Dập Chìm
                  </button>
                </div>
              </div>

              <div style={{ marginTop: "35px" }}>
                <Link to="/book-appointment" className="luxury-btn-gold" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>
                  Đặt Hẹn Cá Nhân Hóa Tại Boutique
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Services List */}
        <div style={{ marginBottom: "80px" }}>
          <h2 className="luxury-section-title">Các Dịch Vụ Cá Nhân Hóa Của Maison</h2>
          <p className="luxury-section-sub">Được thực hiện bởi các nghệ nhân được đào tạo chuyên sâu.</p>

          <div className="luxury-grid-3">
            {services.map((item, idx) => (
              <div key={idx} className="luxury-card" style={{ padding: "35px 30px" }}>
                <span className="luxury-split-tag">{item.tag}</span>
                <h3 className="luxury-card-title">{item.title}</h3>
                <p className="luxury-card-text">{item.desc}</p>
                <Link to="/contact-mail" className="luxury-btn-outline" style={{ textAlign: "center", marginTop: "15px" }}>
                  Liên Hệ Tư Vấn
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizationPage;
