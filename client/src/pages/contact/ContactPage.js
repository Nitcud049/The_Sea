import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const ContactPage = () => {
  // State quản lý Tab đang chọn: 'contact' | 'faq' | 'care'
  const [activeTab, setActiveTab] = useState('contact');

  // --- ICONS MÔ PHỎNG SANG TRỌNG CHO TAB 1 & TAB 2 ---
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

  // Icons Chủ đề FAQ
  const CompanyIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M3 21h18M5 21V7l8-4v18M13 10h4v11M9 9v.01M9 13v.01M9 17v.01"/></svg>
  );
  const ShippingIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
  );
  const ReturnIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>
  );
  const GiftIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
  );
  const OrderIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
  );
  const ProductIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H20.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path><path d="M4 10v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V10"></path></svg>
  );
  const ServiceIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
  );

  // --- ICONS CHO TAB DỊCH VỤ CHĂM SÓC ---
  const LeatherBagIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M6 20h12a2 2 0 0 0 2-2V9H4v9a2 2 0 0 0 2 2z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>
  );
  const GlassesIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="6" cy="12" r="4"/><circle cx="18" cy="12" r="4"/><path d="M10 12h4"/><path d="M2 12h0"/><path d="M22 12h0"/></svg>
  );
  const WatchIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="12" r="6"/><polyline points="12 9 12 12 14 13"/><path d="M9 3h6v3H9zM9 18h6v3H9z"/></svg>
  );
  const JewelryIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="14" r="5"/><path d="M12 3l2 3h-4l2-3z"/></svg>
  );
  const ShoeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M4 16c2 0 4-1 6-3l3-2 3 1 4-1v5H4v-1z"/><path d="M18 11v5"/></svg>
  );
  const ClothingIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M8 3h8l2 5-3 1v12H9V9L6 8l2-5z"/></svg>
  );
  const SportsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="10" cy="10" r="6"/><line x1="14.5" y1="14.5" x2="20" y2="20"/><circle cx="10" cy="10" r="1.5"/></svg>
  );

  return (
    <div className="cp-page">
      {/* THANH ĐIỀU HƯỚNG TRÊN CÙNG */}
      <nav className="cp-top-nav">
        <div className="cp-nav-title">CẦN TRỢ GIÚP</div>
        <div className="cp-nav-links">
          <button 
            className={`cp-nav-link ${activeTab === 'contact' ? 'cp-nav-link-active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            LIÊN HỆ VỚI CHÚNG TÔI
          </button>
          <button 
            className={`cp-nav-link ${activeTab === 'faq' ? 'cp-nav-link-active' : ''}`}
            onClick={() => setActiveTab('faq')}
          >
            CÂU HỎI THƯỜNG GẶP
          </button>
          <button 
            className={`cp-nav-link ${activeTab === 'care' ? 'cp-nav-link-active' : ''}`}
            onClick={() => setActiveTab('care')}
          >
            DỊCH VỤ CHĂM SÓC
          </button>
        </div>
      </nav>

      <div className="cp-container">
        {/* ================= TAB 1: LIÊN HỆ VỚI CHÚNG TÔI ================= */}
        {activeTab === 'contact' && (
          <div className="tab-content-anim">
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
                  <button className="cp-pill-btn"><PhoneIcon /> +84 877 589 808</button>
                  <button className="cp-pill-btn"><PhoneIcon /> +84 909 954 529</button>
                </div>
              </div>

              <div className="cp-card-col">
                <div className="cp-card-title">GỬI EMAIL</div>
                <div className="cp-card-desc">Các chuyên viên tư vấn rất sẵn lòng giải đáp thắc mắc của quý khách.</div>
                <div className="cp-btn-wrapper">
                  <Link to="/contact-mail" className="cp-pill-btn"><MailIcon /> Gửi email</Link>
                </div>
              </div>

              <div className="cp-card-col-last">
                <div className="cp-card-title">GỬI TIN NHẮN</div>
                <div className="cp-card-desc">Các chuyên viên tư vấn hân hạnh được hỗ trợ quý khách.</div>
                <div className="cp-btn-wrapper">
                  <a href="https://zalo.me/0877589808" target="_blank" rel="noopener noreferrer" className="cp-pill-btn" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ZaloIcon /> Zalo
                  </a>
                  <a href="https://wa.me/84877589808" target="_blank" rel="noopener noreferrer" className="cp-pill-btn" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <WhatsAppIcon /> WhatsApp
                  </a>
                  <a href="https://bcrw.apple.com/messages/ui/unsupported" target="_blank" rel="noopener noreferrer" className="cp-pill-btn" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <AppleIcon /> Apple Messages
                  </a>
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

              <button className="cp-explore-btn" onClick={() => setActiveTab('faq')}>Khám phá tất cả</button>
            </div>
          </div>
        )}

        {/* ================= TAB 2: CÂU HỎI THƯỜNG GẶP ================= */}
        {activeTab === 'faq' && (
          <div className="faq-page-content tab-content-anim">
            <div className="faq-header-block">
              <h1 className="cp-header-title">CÂU HỎI THƯỜNG GẶP</h1>
              <p className="cp-header-desc">Tìm hiểu thêm thông tin trong mục Câu hỏi thường gặp</p>

              <div className="faq-main-search">
                <span className="faq-search-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </span>
                <input type="text" placeholder="Chúng tôi có thể hỗ trợ gì cho quý khách!" className="faq-search-input" />
              </div>
            </div>

            <div className="faq-body-grid">
              {/* CỘT TRÁI: CHỦ ĐỀ & LIÊN HỆ */}
              <div className="faq-left-col">
                <h3 className="faq-section-heading">CHỦ ĐỀ</h3>
                
                <div className="faq-topics-grid">
                  <div className="faq-topic-card">
                    <CompanyIcon />
                    <span>Thông tin công ty</span>
                  </div>
                  <div className="faq-topic-card">
                    <ShippingIcon />
                    <span>Giao hàng</span>
                  </div>
                  <div className="faq-topic-card">
                    <ReturnIcon />
                    <span>Đổi hàng</span>
                  </div>
                  <div className="faq-topic-card">
                    <GiftIcon />
                    <span>Nghệ thuật tặng quà</span>
                  </div>
                  <div className="faq-topic-card">
                    <OrderIcon />
                    <span>Đơn đặt hàng</span>
                  </div>
                  <div className="faq-topic-card">
                    <ProductIcon />
                    <span>Sản phẩm</span>
                  </div>
                  <div className="faq-topic-card">
                    <ServiceIcon />
                    <span>Dịch vụ</span>
                  </div>
                </div>

                <div className="faq-contact-box">
                  <h4 className="faq-contact-box-title">LIÊN HỆ VỚI CHÚNG TÔI</h4>
                  <p className="faq-contact-box-desc">Liên hệ với Trung tâm Tư vấn Khách hàng để biết thêm thông tin</p>
                  <button className="faq-contact-box-btn" onClick={() => setActiveTab('contact')}>
                    LIÊN HỆ VỚI CHÚNG TÔI
                  </button>
                </div>
              </div>

              {/* CỘT PHẢI: NHỮNG CÂU HỎI THƯỜNG GẶP */}
              <div className="faq-right-col">
                <h3 className="faq-section-heading">NHỮNG CÂU HỎI THƯỜNG GẶP</h3>
                
                <ul className="faq-questions-list">
                  <li><a href="#q1">Dịch vụ chăm sóc đồng hồ của chúng tôi như thế nào?</a></li>
                  <li><a href="#q2">Đồ gia dụng</a></li>
                  <li><a href="#q3">Dịch vụ chăm sóc phụ kiện của chúng tôi như thế nào?</a></li>
                  <li><a href="#q4">Dịch vụ chăm sóc sản phẩm bằng da của chúng tôi như thế nào?</a></li>
                  <li><a href="#q5">Chăm sóc sản phẩm trò chơi và thiết bị thể thao</a></li>
                  <li><a href="#q6">Tôi muốn được tư vấn chọn quà Louis Vuitton. Bạn có thể hỗ trợ tôi không?</a></li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: DỊCH VỤ CHĂM SÓC ================= */}
        {activeTab === 'care' && (
          <div className="care-page-layout tab-content-anim">
            {/* CỘT BÊN TRÁI */}
            <div className="care-left-col">
              {/* Khối 1: Chăm sóc sản phẩm */}
              <div className="care-box">
                <h2 className="care-box-title">CHĂM SÓC SẢN PHẨM</h2>
                <div className="care-grid">
                  <div className="care-grid-item">
                    <div className="care-icon"><LeatherBagIcon /></div>
                    <span>Sản phẩm bằng da</span>
                  </div>
                  <div className="care-grid-item">
                    <div className="care-icon"><GlassesIcon /></div>
                    <span>Phụ kiện</span>
                  </div>
                  <div className="care-grid-item">
                    <div className="care-icon"><WatchIcon /></div>
                    <span>Đồng hồ</span>
                  </div>
                  <div className="care-grid-item">
                    <div className="care-icon"><JewelryIcon /></div>
                    <span>Trang sức cao cấp</span>
                  </div>
                  <div className="care-grid-item">
                    <div className="care-icon"><ShoeIcon /></div>
                    <span>Giày</span>
                  </div>
                  <div className="care-grid-item">
                    <div className="care-icon"><ClothingIcon /></div>
                    <span>Trang phục</span>
                  </div>
                  <div className="care-grid-item">
                    <div className="care-icon"><SportsIcon /></div>
                    <span>Thể thao & Giải trí</span>
                  </div>
                  <div className="care-grid-item empty"></div>
                  <div className="care-grid-item empty"></div>
                </div>
              </div>

              {/* Khối 2: Bảo hành tại cửa hàng */}
              <div className="care-box">
                <h2 className="care-box-title">BẢO HÀNH TẠI CỬA HÀNG</h2>
                <p className="care-box-desc">
                  Quý khách có thể đến cửa hàng Louis Vuitton để được hỗ trợ bảo hành cho sản phẩm
                </p>
                <div className="care-btn-wrapper">
                  <Link to="/book-appointment" className="underline-link care-pill-btn">
                    Đặt lịch hẹn tại cửa hàng
                  </Link>
                </div>
              </div>
            </div>

            {/* CỘT BÊN PHẢI */}
            <div className="care-right-col">
              <div className="care-box care-contact-box">
                <h2 className="care-box-title">LIÊN HỆ VỚI CHÚNG TÔI</h2>
                <p className="care-box-desc">
                  Liên hệ với Trung tâm Tư vấn Khách hàng để biết thêm thông tin
                </p>
                <button 
                  type="button" 
                  className="care-black-btn"
                  onClick={() => setActiveTab('contact')}
                >
                  LIÊN HỆ VỚI CHÚNG TÔI
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;