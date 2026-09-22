import React from 'react';
import './Contact.css';// Đã cập nhật tên file CSS

const ContactMail = () => {
  return (
    <div className="contact-page-container">
      {/* Thanh điều hướng phụ trợ giúp */}
      <nav className="help-nav">
        <div className="help-nav-left">
          <span className="back-icon">{"<"}</span>
          <span className="nav-title">CẦN TRỢ GIÚP</span>
        </div>
        <div className="help-nav-right">
          <a href="#contact" className="nav-item active">LIÊN HỆ VỚI CHÚNG TÔI</a>
          <a href="#faq" className="nav-item">CÂU HỎI THƯỜNG GẶP</a>
          <a href="#services" className="nav-item">DỊCH VỤ CHĂM SÓC</a>
        </div>
      </nav>

      {/* Nội dung chính */}
      <main className="contact-main">
        <h1 className="contact-heading">Gửi email cho chúng tôi</h1>
        
        <div className="contact-notice">
          <p>
            Vui lòng cung cấp thông tin sau để Trung tâm Tư vấn Khách hàng giải đáp thắc mắc của bạn sớm nhất có thể. Bạn có thể truy cập phần Câu hỏi thường gặp để xem thêm thông tin.
          </p>
        </div>

        <div className="form-container">
          <p className="required-note">Thông tin bắt buộc*</p>
          
          <form className="contact-form">
            {/* Tiêu đề */}
            <div className="form-group">
              <label>Tiêu đề*</label>
              <select defaultValue="Ông">
                <option value="Ông">Ông</option>
                <option value="Bà">Bà</option>
              </select>
            </div>

            {/* Tên & Họ */}
            <div className="form-group">
              <label>Tên*</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>Họ*</label>
              <input type="text" />
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email*</label>
              <input type="email" />
            </div>

            {/* Quốc gia */}
            <div className="form-group">
              <label>Quốc gia/Khu vực và vùng lãnh thổ*</label>
              <select defaultValue="Viet Nam">
                <option value="Viet Nam">Viet Nam</option>
              </select>
            </div>

            {/* Số điện thoại */}
            <div className="form-group phone-group">
              <label className="phone-label">SỐ ĐIỆN THOẠI</label>
              <select className="phone-type" defaultValue="mobile">
                <option value="mobile">Điện thoại di động</option>
                <option value="home">Điện thoại bàn</option>
              </select>
              <div className="phone-input-wrapper">
                <select className="country-code" defaultValue="+84">
                  <option value="+84">+84</option>
                </select>
                <input type="tel" className="phone-number" />
              </div>
            </div>

            {/* Ngôn ngữ */}
            <div className="form-group">
              <label>Ngôn ngữ*</label>
              <select defaultValue="Tiếng Việt">
                <option value="Tiếng Việt">Tiếng Việt</option>
                <option value="English">English</option>
              </select>
            </div>

            {/* Chủ đề */}
            <div className="form-group">
              <label>Chủ đề*</label>
              <select defaultValue="Thông tin sản phẩm">
                <option value="Thông tin sản phẩm">Thông tin sản phẩm</option>
                <option value="Bảo hành">Bảo hành</option>
                <option value="Đơn hàng">Đơn hàng</option>
              </select>
            </div>

            {/* Tin nhắn */}
            <div className="form-group">
              <label>Tin nhắn của bạn*</label>
              <textarea rows="5"></textarea>
              <div className="char-limit">
                <span className="info-icon">i</span> (tối đa 1000 ký tự)
              </div>
            </div>

            {/* Nút Submit */}
            <div className="submit-container">
              <button type="submit" className="btn-submit">Gửi tin nhắn</button>
            </div>
          </form>
        </div>
      </main>

      {/* Nút nổi hỗ trợ góc dưới */}
      <button className="floating-contact-btn">
        <span className="logo-icon">V</span>
        Liên hệ với chúng tôi
        <span className="arrow-up">^</span>
      </button>
    </div>
  );
};

export default ContactMail; // Đã cập nhật tên Component export