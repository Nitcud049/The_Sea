import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './footerPages.css';

const NewsPage = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    {
      id: 1,
      tag: "Event & Boutique",
      date: "15 Tháng 9, 2026",
      title: "Maison THE SEA Khai Trương Flagship Đẳng Cấp Tại TP. Hồ Chí Minh",
      desc: "Không gian kiến trúc xa hoa rộng hơn 800m2 lấy cảm hứng từ những đường sóng biển bất tận chính thức mở cửa đón chào giới mộ điệu thời trang tại trung tâm Quận 1.",
      img: "https://images.unsplash.com/photo-1555529771-835f59fc5efe?w=800&q=80",
      content: "Tọa lạc tại tuyến đường Đồng Khởi danh giá, cửa hàng Flagship mới của THE SEA là sự kết hợp tuyệt mỹ giữa đá cẩm thạch Ý, kính phản quang ánh vàng và gỗ sồi tự nhiên. Cửa hàng tích hợp không gian triển lãm nghệ thuật, phòng phục chế thủ công tại chỗ và phòng thử đồ VIP Salon mang lại sự riêng tư tối đa cho khách hàng."
    },
    {
      id: 2,
      tag: "Collection Drop",
      date: "28 Tháng 8, 2026",
      title: "Bộ Sưu Tập Giới Hạn 'Azure Heritage' Chính Thức Xuất Xưởng",
      desc: "Chỉ 150 chiếc túi xách da cá sấu Porosus màu xanh lam biển sâu được đánh số seri độc bản, tôn vinh kỹ nghệ thuộc da thảo mộc truyền thống.",
      img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
      content: "Mỗi chiếc túi trong bộ sưu tập Azure Heritage cần hơn 80 giờ chế tác thủ công bởi các nghệ nhân trưởng tại Atelier Paris. Phụ kiện kim loại mạ vàng 24K được chạm khắc hoa văn bọt sóng vi mô, biến mỗi tuyệt tác thành tài sản sưu tầm vô giá."
    },
    {
      id: 3,
      tag: "Celebrity & Ambassador",
      date: "12 Tháng 8, 2026",
      title: "Đại Sứ Thương Hiệu Toàn Cầu Tỏa Sáng Tại Tuần Lễ Thời Trang Paris",
      desc: "Xuất hiện trong trang phục dạ hội lụa tơ tằm thêu chỉ vàng thủ công của THE SEA, đại sứ thương hiệu đã thu hút mọi ánh nhìn của truyền thông quốc tế.",
      img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
      content: "Tại sự kiện được mong chờ nhất của làng mốt, THE SEA khẳng định vị thế dẫn đầu trong phân khúc thời trang may đo cao cấp. Sự hòa quyện giữa nét đẹp hiện đại và vẻ sang trọng quý phái đã nhận được cơn mưa lời khen từ các nhà phê bình thời trang thế giới."
    },
    {
      id: 4,
      tag: "Philanthropy",
      date: "05 Tháng 7, 2026",
      title: "Chiến Dịch 'Save Our Oceans' Đạt Mốc 10.000 Rạn San Hô Được Phục Hồi",
      desc: "Cột mốc đáng tự hào của Quỹ Foundation THE SEA trong nỗ lực bảo vệ hệ sinh thái biển nguyên sinh trên khắp thế giới.",
      img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      content: "Nhờ sự chung tay của cộng đồng khách hàng THE SEA toàn cầu, dự án đã thành công đưa các mầm san hô khỏe mạnh trở lại với các vùng biển bị đe dọa, góp phần hồi sinh đa dạng sinh học biển."
    }
  ];

  return (
    <div className="luxury-page">
      <div className="luxury-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&q=80')` }}>
        <div className="luxury-hero-overlay"></div>
        <div className="luxury-hero-content">
          <span className="luxury-hero-tag">Maison Gazette</span>
          <h1 className="luxury-hero-title">Tin Tức Mới Nhất</h1>
          <p className="luxury-hero-desc">
            Cập nhật những chuyển động thời trang, các sự kiện danh giá và câu chuyện hậu trường độc quyền từ THE SEA.
          </p>
          <div className="luxury-breadcrumb">
            <Link to="/homepage">Trang chủ</Link>
            <span>/</span>
            <span>About THE SEA</span>
            <span>/</span>
            <span>Latest News</span>
          </div>
        </div>
      </div>

      <div className="luxury-container">
        {/* Article Grid */}
        <div className="luxury-grid-2">
          {articles.map((item) => (
            <div key={item.id} className="luxury-card">
              <div style={{ height: "300px", overflow: "hidden" }}>
                <img src={item.img} alt={item.title} className="luxury-card-img" />
              </div>
              <div className="luxury-card-body">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span className="luxury-split-tag" style={{ margin: 0 }}>{item.tag}</span>
                  <span style={{ fontSize: "12px", color: "#888" }}>{item.date}</span>
                </div>
                <h3 className="luxury-card-title">{item.title}</h3>
                <p className="luxury-card-text">{item.desc}</p>
                <button
                  onClick={() => setSelectedArticle(item)}
                  className="luxury-btn-outline"
                  style={{ alignSelf: "flex-start", marginTop: "10px" }}
                >
                  Đọc Chi Tiết
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Article View */}
        {selectedArticle && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.75)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "20px"
          }}>
            <div style={{
              backgroundColor: "#fff",
              maxWidth: "750px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "40px",
              position: "relative",
              borderRadius: "2px"
            }}>
              <button
                onClick={() => setSelectedArticle(null)}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#333"
                }}
              >
                ✕
              </button>

              <span className="luxury-split-tag">{selectedArticle.tag} • {selectedArticle.date}</span>
              <h2 style={{ fontFamily: "var(--sea-font-title)", fontSize: "28px", margin: "10px 0 25px 0", lineHeight: "1.3" }}>
                {selectedArticle.title}
              </h2>
              <img 
                src={selectedArticle.img} 
                alt={selectedArticle.title} 
                style={{ width: "100%", height: "350px", objectFit: "cover", marginBottom: "25px" }} 
              />
              <p style={{ fontSize: "15px", lineHeight: "1.9", color: "#444", marginBottom: "20px" }}>
                {selectedArticle.desc}
              </p>
              <p style={{ fontSize: "15px", lineHeight: "1.9", color: "#444" }}>
                {selectedArticle.content}
              </p>

              <div style={{ marginTop: "35px", paddingTop: "20px", borderTop: "1px solid #eee", textAlign: "right" }}>
                <button onClick={() => setSelectedArticle(null)} className="luxury-btn-dark">
                  Đóng Bài Viết
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
