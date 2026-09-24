import React from 'react';
import { Link } from 'react-router-dom';
import './footerPages.css';

const RepairsPage = () => {
  const steps = [
    {
      num: "01",
      title: "Thẩm Định Ban Đầu",
      desc: "Mang sản phẩm tới bất kỳ Boutique nào của THE SEA hoặc gửi yêu cầu trực tuyến kèm hình ảnh chi tiết. Nghệ nhân Atelier sẽ kiểm tra tình trạng kết cấu da, đường chỉ và phụ kiện kim loại."
    },
    {
      num: "02",
      title: "Báo Giá & Phương Án",
      desc: "Chúng tôi sẽ gửi kế hoạch phục chế chi tiết, kèm thời gian hoàn thiện dự kiến và chi phí (miễn phí đối với các lỗi thuộc phạm vi bảo hành chính hãng)."
    },
    {
      num: "03",
      title: "Kỹ Nghệ Phục Chế Thủ Công",
      desc: "Sản phẩm được chuyển tới Atelier chuyên biệt. Các nghệ nhân sử dụng chỉ sáp thủ công, da cùng loại và các linh kiện kim loại mạ vàng nguyên bản để phục hồi tác phẩm."
    },
    {
      num: "04",
      title: "Kiểm Định Chất Lượng & Bàn Giao",
      desc: "Sau bài kiểm tra độ bền nghiêm ngặt, sản phẩm được dưỡng ẩm bảo vệ da, đóng gói trong hộp sang trọng và trao trả lại cho quý khách."
    }
  ];

  const servicesList = [
    {
      title: "Phục Hồi Cạnh Da & Đường Chỉ",
      desc: "Sơn lại lớp phủ viền mép da thủ công (Edge painting) nhiều lớp và khâu lại những mũi chỉ sáp tỉ mỉ.",
      img: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&q=80"
    },
    {
      title: "Thay Thế & Đánh Bóng Phụ Kiện Kim Loại",
      desc: "Thay mới khóa bấm, khóa kéo, móc cài mạ vàng 24K hoặc palladium với độ hoàn thiện hoàn hảo.",
      img: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=800&q=80"
    },
    {
      title: "Làm Sạch Sâu & Dưỡng Ẩm Da",
      desc: "Quy trình spa đồ da chuyên sâu loại bỏ vết ố, phục hồi độ ẩm và làm mềm mượt lớp da tự nhiên.",
      img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80"
    }
  ];

  return (
    <div className="luxury-page">
      <div className="luxury-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=1600&q=80')` }}>
        <div className="luxury-hero-overlay"></div>
        <div className="luxury-hero-content">
          <span className="luxury-hero-tag">Services</span>
          <h1 className="luxury-hero-title">Dịch Vụ Sửa Chữa & Phục Chế</h1>
          <p className="luxury-hero-desc">
            Bảo tồn di sản và trao truyền vẻ đẹp vượt thời gian cho những tuyệt tác THE SEA qua bàn tay của các nghệ nhân bậc thầy.
          </p>
          <div className="luxury-breadcrumb">
            <Link to="/homepage">Trang chủ</Link>
            <span>/</span>
            <Link to="/services">Dịch vụ</Link>
            <span>/</span>
            <span>Repairs</span>
          </div>
        </div>
      </div>

      <div className="luxury-container">
        {/* Intro */}
        <div style={{ maxWidth: "800px", margin: "0 auto 80px auto", textAlign: "center" }}>
          <span className="luxury-split-tag">Longevity & Heritage</span>
          <h2 className="luxury-section-title">Nghệ Thuật Lưu Giữ Vẻ Đẹp Vĩnh Cửu</h2>
          <p style={{ fontSize: "15px", lineHeight: "1.85", color: "#555" }}>
            Tại THE SEA, mỗi tạo tác được sinh ra để đồng hành cùng quý khách qua năm tháng và truyền lại cho thế hệ tiếp nối. Đội ngũ nghệ nhân tại Atelier chuyên trách phục chế của chúng tôi sẵn sàng khôi phục độ hoàn mỹ cho từng chiếc túi, đôi giày và phụ kiện quý giá.
          </p>
        </div>

        {/* Services 3 columns */}
        <div className="luxury-grid-3">
          {servicesList.map((srv, idx) => (
            <div key={idx} className="luxury-card">
              <div className="luxury-card-img-wrap">
                <img src={srv.img} alt={srv.title} className="luxury-card-img" />
              </div>
              <div className="luxury-card-body">
                <h3 className="luxury-card-title">{srv.title}</h3>
                <p className="luxury-card-text">{srv.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Process Steps */}
        <div style={{ marginTop: "40px", marginBottom: "80px" }}>
          <h2 className="luxury-section-title">Quy Trình Phục Chế 4 Bước</h2>
          <p className="luxury-section-sub">Cam kết chuẩn xác, tận tụy và bảo mật tuyệt đối.</p>
          
          <div className="luxury-grid-4">
            {steps.map((step, idx) => (
              <div key={idx} style={{ padding: "30px 20px", background: "#fbfbfa", border: "1px solid #ebe8e2" }}>
                <span style={{ fontSize: "28px", fontFamily: "var(--sea-font-title)", color: "var(--sea-gold)", display: "block", marginBottom: "15px" }}>
                  {step.num}
                </span>
                <h4 style={{ fontSize: "16px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px", margin: 0 }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: "13.5px", lineHeight: "1.7", color: "#666", marginTop: "10px" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Banner */}
        <div className="luxury-highlight-box" style={{ textAlign: "center", padding: "50px 30px" }}>
          <h3 className="luxury-highlight-title" style={{ fontSize: "22px", marginBottom: "15px" }}>
            Quý khách cần kiểm tra hoặc phục chế sản phẩm?
          </h3>
          <p className="luxury-highlight-text" style={{ maxWidth: "600px", margin: "0 auto 30px auto" }}>
            Hãy đặt lịch hẹn tại Boutique gần nhất để gặp chuyên viên kỹ thuật của Maison hoặc gửi hình ảnh qua email tư vấn.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
            <Link to="/book-appointment" className="luxury-btn-dark">Đặt lịch hẹn kiểm tra</Link>
            <Link to="/contact-mail" className="luxury-btn-outline">Gửi yêu cầu trực tuyến</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairsPage;
