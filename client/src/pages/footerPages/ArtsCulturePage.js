import React from 'react';
import { Link } from 'react-router-dom';
import './footerPages.css';

const ArtsCulturePage = () => {
  const initiatives = [
    {
      title: "Chương Trình Lưu Trú Nghệ Sĩ (Artist in Residence)",
      tag: "Paris & Venice",
      desc: "Hàng năm, THE SEA trao cơ hội cho các họa sĩ và nhà điêu khắc trẻ toàn cầu được làm việc cùng các bậc thầy chế tác tại xưởng Atelier, khám phá ranh giới giữa thủ công truyền thống và nghệ thuật đương đại.",
      img: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80"
    },
    {
      title: "Không Gian Triển Lãm The Sea Pavilion",
      tag: "Triển lãm Kiến trúc & Điêu khắc",
      desc: "Công trình kiến trúc độc bản bằng kính và thép uốn cong mô phỏng chuyển động của sóng biển, là nơi tổ chức các triển lãm nghệ thuật thị giác quốc tế phi lợi nhuận mở cửa cho công chúng.",
      img: "https://images.unsplash.com/photo-1545987796-200677ee1011?w=800&q=80"
    },
    {
      title: "Bảo Trợ Văn Hóa Di Sản Biển",
      tag: "Di sản Thế giới",
      desc: "Tài trợ phục dựng các làng nghề dệt lụa thủ công truyền thống và nghệ thuật sơn mài ven biển, góp phần bảo tồn kho tàng tri thức dân gian cho các thế hệ tương lai.",
      img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80"
    }
  ];

  return (
    <div className="luxury-page">
      <div className="luxury-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1600&q=80')` }}>
        <div className="luxury-hero-overlay"></div>
        <div className="luxury-hero-content">
          <span className="luxury-hero-tag">Patronage & Creativity</span>
          <h1 className="luxury-hero-title">Nghệ Thuật & Văn Hóa</h1>
          <p className="luxury-hero-desc">
            Sự gắn kết bền chặt giữa Maison THE SEA và những tâm hồn sáng tạo, nuôi dưỡng nguồn cảm hứng bất tận từ vẻ đẹp của nghệ thuật đương đại.
          </p>
          <div className="luxury-breadcrumb">
            <Link to="/homepage">Trang chủ</Link>
            <span>/</span>
            <span>About THE SEA</span>
            <span>/</span>
            <span>Arts & Culture</span>
          </div>
        </div>
      </div>

      <div className="luxury-container">
        {/* Quote */}
        <div style={{ maxWidth: "800px", margin: "0 auto 80px auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--sea-font-title)", fontSize: "24px", fontStyle: "italic", lineHeight: "1.7", color: "#222" }}>
            "Thời trang chỉ thực sự đạt tới đỉnh cao khi hòa nhịp cùng hơi thở của nghệ thuật và mang trong mình chiều sâu của nền văn hóa."
          </p>
          <span style={{ fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--sea-gold)", marginTop: "15px", display: "block" }}>
            — Giám Đốc Nghệ Thuật THE SEA
          </span>
        </div>

        {/* 3 Pillars */}
        <div className="luxury-grid-3">
          {initiatives.map((item, idx) => (
            <div key={idx} className="luxury-card">
              <div className="luxury-card-img-wrap">
                <img src={item.img} alt={item.title} className="luxury-card-img" />
              </div>
              <div className="luxury-card-body">
                <span className="luxury-split-tag">{item.tag}</span>
                <h3 className="luxury-card-title">{item.title}</h3>
                <p className="luxury-card-text">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Highlight */}
        <div className="luxury-split-row">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1000&q=80" 
              alt="Hội họa và chế tác đồ da" 
              className="luxury-split-img" 
            />
          </div>
          <div className="luxury-split-content">
            <span className="luxury-split-tag">Collaborative Art</span>
            <h2 className="luxury-split-title">Dấu Ấn Họa Sĩ Trên Tác Phẩm Của Maison</h2>
            <p className="luxury-split-desc">
              Hàng mùa, THE SEA mời các nghệ sĩ hội họa đương đại chuyển tải thế giới quan của họ lên những bức tranh lụa vuông Carré và những chiếc túi da phiên bản giới hạn. Mỗi tạo tác trở thành một tác phẩm nghệ thuật có thể mang theo bên mình, kết nối bảo tàng nghệ thuật với cuộc sống đời thường.
            </p>
            <Link to="/about/la-maison" className="luxury-btn-dark">Tìm Hiểu Về La Maison</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtsCulturePage;
