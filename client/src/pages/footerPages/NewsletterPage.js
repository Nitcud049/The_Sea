import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './footerPages.css';

const NewsletterPage = () => {
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState({ women: true, men: true, events: true });
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert("Vui lòng nhập địa chỉ Email hợp lệ!");
      return;
    }
    setIsSubscribed(true);
  };

  return (
    <div className="luxury-page">
      <div className="luxury-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80')` }}>
        <div className="luxury-hero-overlay"></div>
        <div className="luxury-hero-content">
          <span className="luxury-hero-tag">Maison Privileges</span>
          <h1 className="luxury-hero-title">Đăng Ký Nhận Bản Tin THE SEA</h1>
          <p className="luxury-hero-desc">
            Trở thành những người đầu tiên nhận thông tin về các bộ sưu tập mới, sự kiện kín và các sáng tạo độc quyền từ Maison.
          </p>
          <div className="luxury-breadcrumb">
            <Link to="/homepage">Trang chủ</Link>
            <span>/</span>
            <span>Email Sign-up</span>
          </div>
        </div>
      </div>

      <div className="luxury-container">
        <div style={{ maxWidth: "680px", margin: "0 auto", padding: "50px 40px", background: "#fbfbfa", border: "1px solid #e8e4de" }}>
          {!isSubscribed ? (
            <div>
              <div style={{ textAlign: "center", marginBottom: "35px" }}>
                <span className="luxury-split-tag">Đặc Quyền Hội Viên</span>
                <h2 style={{ fontFamily: "var(--sea-font-title)", fontSize: "26px", margin: "10px 0 15px 0" }}>
                  Kết Nối Cùng Thế Giới THE SEA
                </h2>
                <p style={{ fontSize: "14px", lineHeight: "1.8", color: "#666" }}>
                  Đăng ký email để nhận thư mời tham dự các sự kiện riêng tư, quyền ưu tiên mua các tuyệt tác giới hạn và bản tin phong cách được tuyển chọn bởi Giám đốc Nghệ thuật.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="luxury-input-group">
                  <label className="luxury-label">Địa chỉ Email của bạn *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="luxury-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="luxury-input-group" style={{ marginTop: "25px" }}>
                  <label className="luxury-label">Chủ đề bạn quan tâm</label>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "12px" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13.5px", cursor: "pointer", color: "#444" }}>
                      <input 
                        type="checkbox" 
                        checked={interests.women} 
                        onChange={(e) => setInterests({...interests, women: e.target.checked})} 
                      />
                      Bộ sưu tập Thời trang & Túi xách Nữ
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13.5px", cursor: "pointer", color: "#444" }}>
                      <input 
                        type="checkbox" 
                        checked={interests.men} 
                        onChange={(e) => setInterests({...interests, men: e.target.checked})} 
                      />
                      Bộ sưu tập Thời trang & Đồ da Nam
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13.5px", cursor: "pointer", color: "#444" }}>
                      <input 
                        type="checkbox" 
                        checked={interests.events} 
                        onChange={(e) => setInterests({...interests, events: e.target.checked})} 
                      />
                      Sự kiện nghệ thuật, Runway & Tin tức Maison
                    </label>
                  </div>
                </div>

                <p style={{ fontSize: "12px", color: "#888", lineHeight: "1.6", marginTop: "25px", marginBottom: "30px" }}>
                  Bằng việc đăng ký, quý khách đồng ý cho phép THE SEA xử lý dữ liệu cá nhân theo <Link to="/legal/privacy" style={{ color: "#333", textDecoration: "underline" }}>Chính Sách Quyền Riêng Tư</Link>. Quý khách có thể hủy đăng ký bất cứ lúc nào qua liên kết trong email.
                </p>

                <button type="submit" className="luxury-btn-dark" style={{ width: "100%", padding: "16px 0", fontSize: "13px" }}>
                  Xác Nhận Đăng Ký
                </button>
              </form>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "40px 10px" }}>
              <div style={{ fontSize: "52px", marginBottom: "15px" }}>✉️</div>
              <h2 style={{ fontFamily: "var(--sea-font-title)", fontSize: "28px", marginBottom: "12px" }}>
                Chào Mừng Quý Khách
              </h2>
              <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#555", marginBottom: "30px" }}>
                Cảm ơn quý khách đã đăng ký nhận bản tin với địa chỉ <strong>{email}</strong>. Một thư chào mừng kèm ấn phẩm giới thiệu Maison THE SEA đã được gửi tới hộp thư của quý khách.
              </p>
              <Link to="/homepage" className="luxury-btn-dark">
                Tiếp Tục Khám Phá Trang Chủ
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterPage;
