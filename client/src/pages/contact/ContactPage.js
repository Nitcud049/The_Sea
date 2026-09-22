import React from 'react';
import { Link } from 'react-router-dom'; // Import Link để chuyển trang
import './Contact.css'; // Import file CSS dùng chung

const ContactPage = () => {
  const PhoneIcon = () => (
    <svg className="icon-style" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
  );
  const MailIcon = () => (
    <svg className="icon-style" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
  );
  const ZaloIcon = () => (
    <svg className="icon-style" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.03 2 11c0 2.83 1.48 5.35 3.79 7.03-.4.87-1.12 2.37-1.16 2.45-.08.18-.11.4-.02.58.1.18.28.29.49.29.13 0 1.95-.23 3.61-1.07 1.05.28 2.16.42 3.29.42 5.52 0 10-4.03 10-9s-4.48-9-10-9z"/></svg>
  );
  const WhatsAppIcon = () => (
    <svg className="icon-style" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
  );
  const AppleIcon = () => (
    <svg className="icon-style" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16.36 14.15c-.03-2.61 2.13-3.87 2.23-3.92-1.22-1.78-3.11-2.02-3.8-2.05-1.61-.16-3.15.95-3.98.95-.82 0-2.09-.92-3.41-.9-1.72.02-3.32.99-4.2 2.52-1.79 3.1-.46 7.69 1.28 10.19.85 1.23 1.86 2.62 3.19 2.57 1.28-.05 1.78-.83 3.33-.83 1.54 0 2.01.83 3.34.8 1.37-.03 2.23-1.28 3.08-2.51.98-1.42 1.38-2.8 1.4-2.88-.03-.01-2.67-1.02-2.7-4.01zM14.93 5.4c.71-.85 1.18-2.04 1.05-3.23-1.02.04-2.26.68-3 1.56-.59.7-1.15 1.92-1 3.09 1.15.09 2.27-.56 2.95-1.42z"/></svg>
  );

  return (
    <div className="cp-page">
      <nav className="cp-top-nav">
        <div className="cp-nav-title">CẦN TRỢ GIÚP</div>
        <div className="cp-nav-links">
          <a href="#contact" className="cp-nav-link-active">LIÊN HỆ VỚI CHÚNG TÔI</a>
          <a href="#faq" className="cp-nav-link">CÂU HỎI THƯỜNG GẶP</a>
          <a href="#care" className="cp-nav-link">DỊCH VỤ CHĂM SÓC</a>
        </div>
      </nav>

      <div className="cp-container">
        <div>
          <h1 className="cp-header-title">LIÊN HỆ VỚI CHÚNG TÔI</h1>
          <p className="cp-header-desc">
            Quý khách có thể tìm hiểu thêm thông tin trong mục Câu hỏi thường gặp hoặc liên hệ với Trung tâm Tư vấn Khách hàng của chúng tôi<br/>qua các kênh dưới đây
          </p>
        </div>

        <div className="cp-grid-cards">
          <div className="cp-card-col">
            <div className="cp-card-title">LIÊN HỆ HOTLINE</div>
            <div className="cp-card-desc">Thứ Hai đến Chủ nhật: 10 giờ sáng - 8 giờ tối</div>
            <div className="cp-btn-wrapper">
              <button className="cp-pill-btn"><PhoneIcon /> +84 2838614107</button>
              <button className="cp-pill-btn"><PhoneIcon /> +84 2871059504</button>
            </div>
          </div>
          <div className="cp-card-col">
            <div className="cp-card-title">GỬI EMAIL</div>
            <div className="cp-card-desc">Các chuyên viên tư vấn rất sẵn lòng giải đáp thắc mắc của quý khách.</div>
            <div className="cp-btn-wrapper">
              {/* Sử dụng Link để điều hướng sang trang /contact-mail */}
              <Link to="/contact-mail" className="cp-pill-btn"><MailIcon /> Gửi email</Link>
            </div>
          </div>
          <div className="cp-card-col-last">
            <div className="cp-card-title">GỬI TIN NHẮN</div>
            <div className="cp-card-desc">Các chuyên viên tư vấn hân hạnh được hỗ trợ quý khách.</div>
            <div className="cp-btn-wrapper">
              <button className="cp-pill-btn"><ZaloIcon /> Zalo</button>
              <button className="cp-pill-btn"><WhatsAppIcon /> WhatsApp</button>
              <button className="cp-pill-btn"><AppleIcon /> Apple Messages</button>
            </div>
          </div>
        </div>

        <div className="cp-faq-section">
          <div className="cp-faq-header">
            <h2 className="cp-faq-title">NHỮNG CÂU HỎI THƯỜNG GẶP</h2>
            <div className="cp-search-wrapper">
              <span className="cp-search-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </span>
              <input type="text" placeholder="Chúng tôi có thể hỗ trợ gì cho quý khách" className="cp-search-input" />
            </div>
          </div>

          <div className="cp-faq-grid">
            <a href="#faq1" className="cp-faq-link">Dịch vụ chăm sóc đồng hồ của chúng tôi như thế nào?</a>
            <a href="#faq2" className="cp-faq-link">Đồ gia dụng</a>
            <a href="#faq3" className="cp-faq-link">Dịch vụ chăm sóc phụ kiện của chúng tôi như thế nào?</a>
            <a href="#faq4" className="cp-faq-link">Dịch vụ chăm sóc sản phẩm bằng da của chúng tôi như thế nào?</a>
            <a href="#faq5" className="cp-faq-link">Chăm sóc sản phẩm trò chơi và thiết bị thể thao</a>
            <a href="#faq6" className="cp-faq-link">Tôi muốn được tư vấn chọn quà Louis Vuitton. Bạn có thể hỗ trợ tôi không?</a>
          </div>

          <button className="cp-explore-btn">Khám phá tất cả</button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;