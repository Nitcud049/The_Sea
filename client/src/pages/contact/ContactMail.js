import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css'; // Đảm bảo đường dẫn file CSS của bạn chính xác

const ContactMail = () => {
  const navigate = useNavigate();

  // 1. State quản lý dữ liệu form
  const [formData, setFormData] = useState({
    title: 'Ông',
    firstName: '',
    lastName: '',
    email: '',
    country: 'Viet Nam',
    phoneType: 'mobile',
    countryCode: '+84',
    phoneNumber: '',
    language: 'Tiếng Việt',
    topic: 'Thông tin sản phẩm',
    message: ''
  });

  // 2. State quản lý lỗi và trạng thái loading
  const [emailError, setEmailError] = useState('');
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 3. Hàm xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Xóa thông báo lỗi khi người dùng gõ lại email
    if (name === 'email') setEmailError('');
  };

  // 4. Hàm kiểm tra sự tồn tại của Email qua API Backend
  const verifyEmailExist = async (emailToTest) => {
    if (!emailToTest) {
      setEmailError('Vui lòng nhập địa chỉ Email!');
      return false;
    }

    setIsVerifyingEmail(true);
    setEmailError('');

    try {
      // Gọi API kiểm tra email (Đảm bảo backend của bạn đang chạy ở cổng 5000)
      const response = await fetch('http://localhost:5000/api/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailToTest }),
      });

      const data = await response.json();

      if (!response.ok || !data.isValid) {
        setEmailError(data.message || 'Email này không tồn tại!');
        setIsVerifyingEmail(false);
        return false;
      }

      setIsVerifyingEmail(false);
      return true;
    } catch (err) {
      console.error('Lỗi khi kiểm tra email:', err);
      // Fallback: Nếu không gọi được API, dùng Regex kiểm tra cú pháp cơ bản
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailToTest)) {
        setEmailError('Định dạng Email không hợp lệ!');
        setIsVerifyingEmail(false);
        return false;
      }
      setIsVerifyingEmail(false);
      return true;
    }
  };

  // Kiểm tra email ngay khi người dùng click ra ngoài ô nhập (onBlur)
  const handleEmailBlur = () => {
    if (formData.email.trim() !== '') {
      verifyEmailExist(formData.email.trim());
    }
  };

  // 5. Hàm xử lý khi Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra lại Email một lần nữa trước khi Submit
    const isEmailValid = await verifyEmailExist(formData.email.trim());
    if (!isEmailValid) return;

    setIsSubmitting(true);

    try {
      // Gọi API thực tế gửi email liên hệ
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Lỗi khi gửi tin nhắn');
      }

      // Thông báo thành công
      alert('Cảm ơn bạn! Tin nhắn của bạn đã được gửi thành công.');
      
      // Xóa form sau khi gửi thành công
      setFormData({
        title: 'Ông',
        firstName: '',
        lastName: '',
        email: '',
        country: 'Viet Nam',
        phoneType: 'mobile',
        countryCode: '+84',
        phoneNumber: '',
        language: 'Tiếng Việt',
        topic: 'Thông tin sản phẩm',
        message: ''
      });

    } catch (error) {
      alert('⚠️ Đã có lỗi xảy ra: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page-container">
      {/* Thanh điều hướng trợ giúp */}
      <nav className="help-nav">
        <div className="help-nav-left" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
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
          
          <form className="contact-form" onSubmit={handleSubmit}>
            {/* Tiêu đề */}
            <div className="form-group">
              <label>Tiêu đề*</label>
              <select name="title" value={formData.title} onChange={handleChange} required>
                <option value="Ông">Ông</option>
                <option value="Bà">Bà</option>
              </select>
            </div>

            {/* Tên & Họ */}
            <div className="form-group">
              <label>Tên*</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Họ*</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>

            {/* Email (Có tích hợp kiểm tra thông minh) */}
            <div className="form-group">
              <label>
                Email* 
                {isVerifyingEmail && <span style={{ color: '#e67e22', marginLeft: '10px', fontSize: '11px' }}>🔍 Đang kiểm tra hộp thư...</span>}
              </label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                onBlur={handleEmailBlur}
                style={{ borderColor: emailError ? '#ff4757' : '#ccc' }}
                placeholder="example@domain.com"
                required 
              />
              {emailError && (
                <span style={{ color: '#ff4757', fontSize: '12px', marginTop: '5px', fontWeight: 'bold' }}>
                  ⚠️ {emailError}
                </span>
              )}
            </div>

            {/* Quốc gia */}
            <div className="form-group">
              <label>Quốc gia/Khu vực và vùng lãnh thổ*</label>
              <select name="country" value={formData.country} onChange={handleChange} required>
                <option value="Viet Nam">Viet Nam</option>
                <option value="United States">United States</option>
              </select>
            </div>

            {/* Số điện thoại */}
            <div className="form-group phone-group">
              <label className="phone-label">SỐ ĐIỆN THOẠI</label>
              <select className="phone-type" name="phoneType" value={formData.phoneType} onChange={handleChange}>
                <option value="mobile">Điện thoại di động</option>
                <option value="home">Điện thoại bàn</option>
              </select>
              <div className="phone-input-wrapper">
                <select className="country-code" name="countryCode" value={formData.countryCode} onChange={handleChange}>
                  <option value="+84">+84</option>
                  <option value="+1">+1</option>
                </select>
                <input 
                  type="tel" 
                  className="phone-number" 
                  name="phoneNumber" 
                  value={formData.phoneNumber} 
                  onChange={handleChange} 
                  pattern="[0-9]*"
                  placeholder="Nhập số điện thoại" 
                />
              </div>
            </div>

            {/* Ngôn ngữ */}
            <div className="form-group">
              <label>Ngôn ngữ*</label>
              <select name="language" value={formData.language} onChange={handleChange} required>
                <option value="Tiếng Việt">Tiếng Việt</option>
                <option value="English">English</option>
              </select>
            </div>

            {/* Chủ đề */}
            <div className="form-group">
              <label>Chủ đề*</label>
              <select name="topic" value={formData.topic} onChange={handleChange} required>
                <option value="Thông tin sản phẩm">Thông tin sản phẩm</option>
                <option value="Bảo hành">Bảo hành</option>
                <option value="Đơn hàng">Đơn hàng</option>
                <option value="Khác">Khác</option>
              </select>
            </div>

            {/* Tin nhắn */}
            <div className="form-group">
              <label>Tin nhắn của bạn*</label>
              <textarea 
                rows="5" 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                maxLength="1000" 
                required
              ></textarea>
              <div className="char-limit">
                <span className="info-icon">i</span> ({formData.message.length}/1000 ký tự)
              </div>
            </div>

            {/* Nút Submit */}
            <div className="submit-container">
              <button 
                type="submit" 
                className="btn-submit" 
                disabled={isSubmitting || isVerifyingEmail}
              >
                {isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn'}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Nút nổi hỗ trợ góc dưới */}
      <button className="floating-contact-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span className="logo-icon">V</span>
        Lên đầu trang
        <span className="arrow-up">^</span>
      </button>
    </div>
  );
};

export default ContactMail;