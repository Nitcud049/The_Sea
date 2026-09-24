import React from 'react';
import { Link } from 'react-router-dom';
import './footerPages.css';

const EthicsCompliancePage = () => {
  const policies = [
    {
      title: "Bộ Quy Tắc Ứng Xử Kinh Doanh (Code of Conduct)",
      desc: "Đặt tính liêm chính, minh bạch và tôn trọng lẫn nhau làm kim chỉ nam cho mọi hoạt động điều hành, quan hệ đối tác và ứng xử nội bộ trên toàn hệ thống Maison."
    },
    {
      title: "Minh Bạch Chuỗi Cung Ứng & Quyền Con Người",
      desc: "Cam kết không sử dụng lao động trẻ em, không phân biệt đối xử và đảm bảo môi trường làm việc an toàn, mức thù lao xứng đáng cho 100% đối tác thuộc da và dệt may."
    },
    {
      title: "Chống Tham Nhũng & Hối Lộ",
      desc: "Chính sách không khoan nhượng đối với mọi hình thức hối lộ, lại quả hoặc lợi ích bất chính nhằm duy trì sự cạnh tranh công bằng và uy tín của thương hiệu."
    },
    {
      title: "Bảo Vệ Người Tố Giác (Whistleblowing System)",
      desc: "Kênh báo cáo độc lập, bảo mật 24/7 cho phép nhân viên và đối tác phản ánh các hành vi sai phạm về đạo đức hoặc pháp luật mà không lo ngại bị trả thù."
    }
  ];

  return (
    <div className="luxury-page">
      <div className="luxury-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80')` }}>
        <div className="luxury-hero-overlay"></div>
        <div className="luxury-hero-content">
          <span className="luxury-hero-tag">Integrity & Governance</span>
          <h1 className="luxury-hero-title">Đạo Đức & Tuân Thủ</h1>
          <p className="luxury-hero-desc">
            Cam kết vững chắc về tính liêm chính, minh bạch và trách nhiệm giải trình trong từng quyết định kinh doanh của THE SEA.
          </p>
          <div className="luxury-breadcrumb">
            <Link to="/homepage">Trang chủ</Link>
            <span>/</span>
            <span>About THE SEA</span>
            <span>/</span>
            <span>Ethics & Compliance</span>
          </div>
        </div>
      </div>

      <div className="luxury-container">
        {/* Intro */}
        <div style={{ maxWidth: "800px", margin: "0 auto 70px auto", textAlign: "center" }}>
          <span className="luxury-split-tag">Nền Tảng Niềm Tin</span>
          <h2 className="luxury-section-title">Liêm Chính Trong Từng Hành Động</h2>
          <p style={{ fontSize: "15px", lineHeight: "1.9", color: "#555" }}>
            Tại THE SEA, sự xa xỉ thực sự phải được xây dựng trên nền tảng đạo đức vững chắc. Chúng tôi tuân thủ nghiêm ngặt các quy định pháp luật sở tại và quốc tế, bảo vệ các giá trị nhân văn và thúc đẩy một môi trường kinh doanh minh bạch, công bằng.
          </p>
        </div>

        {/* 4 Policy Pillars */}
        <div className="luxury-grid-2">
          {policies.map((p, idx) => (
            <div key={idx} style={{ padding: "35px", background: "#fbfbfa", border: "1px solid #ebe8e2" }}>
              <div style={{ width: "40px", height: "2px", background: "var(--sea-gold)", marginBottom: "20px" }}></div>
              <h3 style={{ fontFamily: "var(--sea-font-title)", fontSize: "20px", marginBottom: "12px", marginTop: 0 }}>
                {p.title}
              </h3>
              <p style={{ fontSize: "14px", lineHeight: "1.8", color: "#555", margin: 0 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Whistleblower Hotline Box */}
        <div className="luxury-highlight-box" style={{ marginTop: "70px", padding: "40px" }}>
          <h3 className="luxury-highlight-title" style={{ fontSize: "18px" }}>Kênh Báo Cáo Vi Phạm Đạo Đức (Hotline Bảo Mật)</h3>
          <p className="luxury-highlight-text" style={{ marginBottom: "20px" }}>
            Nếu quý khách hoặc đối tác phát hiện bất kỳ dấu hiệu vi phạm chuẩn mực đạo đức hoặc quy định pháp luật nào liên quan đến THE SEA, xin vui lòng gửi thông tin tới hòm thư bảo mật của Ban Tuân Thủ Đạo Đức:
          </p>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "center" }}>
            <a href="mailto:compliance@thesea.com" className="luxury-btn-dark">compliance@thesea.com</a>
            <span style={{ fontSize: "13px", color: "#777" }}>Mọi thông tin được mã hóa và bảo mật danh tính tuyệt đối.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EthicsCompliancePage;
