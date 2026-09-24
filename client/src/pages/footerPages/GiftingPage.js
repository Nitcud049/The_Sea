import React from 'react';
import { Link } from 'react-router-dom';
import './footerPages.css';

const GiftingPage = () => {
  const giftCollections = [
    {
      title: "Quà Tặng Cho Nàng",
      desc: "Những chiếc túi xách biểu tượng, khăn lụa tơ tằm mềm mại và trang sức tinh xảo tôn vinh nét quyến rũ vĩnh cửu.",
      link: "/women/bags",
      img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80"
    },
    {
      title: "Quà Tặng Cho Chàng",
      desc: "Ví da thủ công, cặp tài liệu sang trọng, thắt lưng tinh tế và phụ kiện du lịch dành riêng cho quý ông thanh lịch.",
      link: "/men/bags",
      img: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80"
    },
    {
      title: "Quà Tặng Doanh Nghiệp (Corporate)",
      desc: "Giải pháp quà tặng đẳng cấp cho đối tác chiến lược và khách hàng VIP với dịch vụ dập logo riêng biệt.",
      link: "/contact-mail",
      img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80"
    }
  ];

  return (
    <div className="luxury-page">
      <div className="luxury-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1600&q=80')` }}>
        <div className="luxury-hero-overlay"></div>
        <div className="luxury-hero-content">
          <span className="luxury-hero-tag">The Art of Giving</span>
          <h1 className="luxury-hero-title">Nghệ Thuật Tặng Quà</h1>
          <p className="luxury-hero-desc">
            Khoảnh khắc trao gửi sự trân quý qua từng chiếc hộp bọc ruy-băng tinh xảo và thông điệp viết tay chan chứa cảm xúc.
          </p>
          <div className="luxury-breadcrumb">
            <Link to="/homepage">Trang chủ</Link>
            <span>/</span>
            <Link to="/services">Dịch vụ</Link>
            <span>/</span>
            <span>Art of Gifting</span>
          </div>
        </div>
      </div>

      <div className="luxury-container">
        {/* The Signature Packaging */}
        <div className="luxury-split-row">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1512909006721-3d6018887383?w=1000&q=80" 
              alt="Hộp quà THE SEA" 
              className="luxury-split-img"
            />
          </div>
          <div className="luxury-split-content">
            <span className="luxury-split-tag">Maison Packaging</span>
            <h2 className="luxury-split-title">Chiếc Hộp Biểu Tượng Của THE SEA</h2>
            <p className="luxury-split-desc">
              Mỗi đơn hàng gửi gắm từ THE SEA là một trải nghiệm mở hộp khó quên. Sản phẩm được bọc cẩn trọng trong lớp giấy lụa dập nổi mờ, đặt trong hộp cứng cao cấp chống va đập, buộc nơ ruy-băng thủ công và đi kèm phong bì chứa thiệp chúc mừng viết tay theo thông điệp của quý khách.
            </p>
            <ul style={{ paddingLeft: "18px", color: "#555", fontSize: "14px", lineHeight: "2", marginBottom: "30px" }}>
              <li>Bao bì thân thiện với môi trường (100% tái chế sinh học).</li>
              <li>Tùy chọn ẩn giá tiền trên hóa đơn đính kèm.</li>
              <li>Thiệp chúc mừng khắc kim hoặc viết tay theo yêu cầu.</li>
              <li>Dịch vụ giao quà đúng ngày kỷ niệm chỉ định.</li>
            </ul>
            <Link to="/homepage" className="luxury-btn-dark">Khám Phá Bộ Sưu Tập Quà Tặng</Link>
          </div>
        </div>

        {/* Gift Collections */}
        <div style={{ marginTop: "40px", marginBottom: "80px" }}>
          <h2 className="luxury-section-title">Gợi Ý Món Quà Hoàn Hảo</h2>
          <p className="luxury-section-sub">Tuyển tập những sáng tạo được yêu thích nhất của Maison.</p>

          <div className="luxury-grid-3">
            {giftCollections.map((col, idx) => (
              <div key={idx} className="luxury-card">
                <div className="luxury-card-img-wrap">
                  <img src={col.img} alt={col.title} className="luxury-card-img" />
                </div>
                <div className="luxury-card-body">
                  <h3 className="luxury-card-title">{col.title}</h3>
                  <p className="luxury-card-text">{col.desc}</p>
                  <Link to={col.link} className="luxury-btn-outline" style={{ textAlign: "center" }}>
                    Khám Phá Ngay
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate Gifting Callout */}
        <div className="luxury-highlight-box" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "30px" }}>
          <div style={{ maxWidth: "720px" }}>
            <h3 className="luxury-highlight-title" style={{ fontSize: "20px" }}>Quà Tặng Doanh Nghiệp & Khách Hàng Thượng Lưu</h3>
            <p className="luxury-highlight-text">
              Đội ngũ Chuyên viên Tư vấn Quà tặng Doanh nghiệp của THE SEA sẽ hỗ trợ lựa chọn quà tặng, đóng gói đồng bộ nhận diện và lên kế hoạch giao quà riêng biệt cho các sự kiện tầm cỡ.
            </p>
          </div>
          <Link to="/contact-mail" className="luxury-btn-dark">
            Liên Hệ Ban Quà Tặng
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GiftingPage;
