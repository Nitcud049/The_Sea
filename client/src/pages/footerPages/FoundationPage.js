import React from 'react';
import { Link } from 'react-router-dom';
import './footerPages.css';

const FoundationPage = () => {
  const pillars = [
    {
      title: "Hồi Sinh Rạn San Hô (Coral Restoration)",
      stat: "25.000+",
      label: "Mầm san hô được ươm trồng",
      desc: "Hợp tác cùng các nhà sinh vật học biển hàng đầu thế giới để nhân giống và tái cấy các giống san hô có khả năng chịu nhiệt cao tại các vùng biển nhiệt đới suy thoái.",
      img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80"
    },
    {
      title: "Làm Sạch Bờ Biển & Giảm Rác Nhựa",
      stat: "150 Tấn",
      label: "Rác thải nhựa được thu gom",
      desc: "Tổ chức các chiến dịch dọn sạch bãi biển định kỳ và hỗ trợ các công nghệ đánh chặn rác thải nhựa tại các cửa sông trước khi trôi dạt ra đại dương.",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
    },
    {
      title: "Học Bổng Nghệ Nhân Trẻ Biển Đảo",
      stat: "120+",
      label: "Thanh thiếu niên được đào tạo",
      desc: "Tài trợ toàn phần chương trình đào tạo nghề chế tác da và thủ công mỹ nghệ cao cấp cho thanh niên các vùng ven biển, mở ra cơ hội nghề nghiệp tương lai bền vững.",
      img: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&q=80"
    }
  ];

  return (
    <div className="luxury-page">
      <div className="luxury-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600&q=80')` }}>
        <div className="luxury-hero-overlay"></div>
        <div className="luxury-hero-content">
          <span className="luxury-hero-tag">Philanthropy & Ocean Action</span>
          <h1 className="luxury-hero-title">Quỹ Foundation THE SEA</h1>
          <p className="luxury-hero-desc">
            Sứ mệnh bảo vệ sự sống đại dương và chắp cánh tương lai cho cộng đồng các vùng đất ven biển.
          </p>
          <div className="luxury-breadcrumb">
            <Link to="/homepage">Trang chủ</Link>
            <span>/</span>
            <span>About THE SEA</span>
            <span>/</span>
            <span>Foundation The Sea</span>
          </div>
        </div>
      </div>

      <div className="luxury-container">
        {/* Foundation Mission */}
        <div style={{ maxWidth: "800px", margin: "0 auto 80px auto", textAlign: "center" }}>
          <span className="luxury-split-tag">Sứ Mệnh Nhân Văn</span>
          <h2 className="luxury-section-title">Vì Một Đại Dương Xanh Bất Tận</h2>
          <p style={{ fontSize: "15px", lineHeight: "1.9", color: "#555" }}>
            Được thành lập với tôn chỉ tri ân mẹ thiên nhiên - nguồn cảm hứng khởi sinh thương hiệu, Foundation THE SEA là tổ chức phi lợi nhuận hoạt động độc lập nhằm tài trợ các sáng kiến bảo tồn sinh thái biển, nghiên cứu khoa học hải dương và phát triển cộng đồng bền vững.
          </p>
        </div>

        {/* 3 Pillars Grid with Stats */}
        <div className="luxury-grid-3">
          {pillars.map((item, idx) => (
            <div key={idx} className="luxury-card">
              <div className="luxury-card-img-wrap">
                <img src={item.img} alt={item.title} className="luxury-card-img" />
              </div>
              <div className="luxury-card-body">
                <div style={{ marginBottom: "15px", borderBottom: "1px solid #eee", paddingBottom: "15px" }}>
                  <div style={{ fontFamily: "var(--sea-font-title)", fontSize: "32px", color: "var(--sea-gold)", fontWeight: "600" }}>
                    {item.stat}
                  </div>
                  <div style={{ fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#777" }}>
                    {item.label}
                  </div>
                </div>
                <h3 className="luxury-card-title">{item.title}</h3>
                <p className="luxury-card-text">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Joint Action Callout */}
        <div className="luxury-highlight-box" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "30px", marginTop: "70px" }}>
          <div style={{ maxWidth: "700px" }}>
            <h3 className="luxury-highlight-title" style={{ fontSize: "20px" }}>Chung Tay Cùng Foundation THE SEA</h3>
            <p className="luxury-highlight-text">
              Chúng tôi luôn chào đón các tổ chức phi chính phủ, các nhà khoa học hải dương và các đối tác đồng hành cùng thực hiện các dự án bảo tồn biển quy mô quốc tế.
            </p>
          </div>
          <Link to="/contact-mail" className="luxury-btn-dark">
            Liên Hệ Hợp Tác Quỹ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoundationPage;
