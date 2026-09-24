import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './footerPages.css';

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState('orders');
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqData = {
    orders: {
      title: "Đơn hàng & Mua sắm",
      questions: [
        {
          q: "Làm thế nào để theo dõi tình trạng đơn hàng của tôi?",
          a: "Quý khách có thể theo dõi đơn hàng bằng cách đăng nhập vào tài khoản THE SEA và truy cập mục 'Đơn hàng của tôi'. Ngoài ra, sau khi đơn hàng được gửi đi, quý khách sẽ nhận được email thông báo kèm mã vận đơn trực tiếp từ đối tác vận chuyển cao cấp của chúng tôi."
        },
        {
          q: "THE SEA hỗ trợ những phương thức thanh toán nào?",
          a: "Chúng tôi chấp nhận thẻ tín dụng/ghi nợ quốc tế (Visa, MasterCard, JCB, American Express), chuyển khoản ngân hàng trực tiếp với mã QR bảo mật, và thanh toán khi nhận hàng (COD) cho các đơn hàng đủ điều kiện trong lãnh thổ Việt Nam."
        },
        {
          q: "Tôi có thể thay đổi hoặc hủy đơn hàng sau khi đặt không?",
          a: "Vì các đơn hàng được xử lý đóng gói theo tiêu chuẩn Maison trong thời gian sớm nhất, quý khách vui lòng liên hệ ngay với Bộ phận Chăm sóc Khách hàng qua Hotline +84 877 589 808 trong vòng 2 giờ kể từ khi hoàn tất đặt hàng để được hỗ trợ điều chỉnh."
        },
        {
          q: "Sản phẩm đặt mua có được đóng gói hộp quà đặc trưng của THE SEA không?",
          a: "Tất cả sản phẩm đặt mua trên trang web chính thức của THE SEA đều được đóng gói tỉ mỉ trong hộp biểu tượng của Maison, kèm theo túi chống bụi, ruy-băng cao cấp và thiệp thông điệp độc quyền."
        }
      ]
    },
    shipping: {
      title: "Giao hàng & Đổi trả",
      questions: [
        {
          q: "Thời gian giao hàng tiêu chuẩn là bao lâu?",
          a: "Đối với khu vực nội thành Hà Nội và TP. Hồ Chí Minh, thời gian giao hàng từ 24 - 48 giờ làm việc. Đối với các tỉnh thành khác, thời gian giao hàng dự kiến từ 2 - 4 ngày làm việc. Quý khách cũng có thể lựa chọn dịch vụ Hỏa tốc trong ngày tại các thành phố lớn."
        },
        {
          q: "Chính sách đổi trả sản phẩm của THE SEA như thế nào?",
          a: "THE SEA áp dụng chính sách đổi sản phẩm trong vòng 14 ngày kể từ ngày nhận hàng. Sản phẩm đổi trả phải còn nguyên tem mác, chưa qua sử dụng, còn đầy đủ hóa đơn, bao bì, hộp và phụ kiện đi kèm. Lưu ý: Sản phẩm cá nhân hóa hoặc đặt làm riêng (Bespoke) không áp dụng đổi trả."
        },
        {
          q: "Chi phí vận chuyển được tính như thế nào?",
          a: "Maison THE SEA hân hạnh cung cấp dịch vụ giao hàng tiêu chuẩn miễn phí cho tất cả các đơn hàng trên toàn quốc như một sự tri ân đến quý khách hàng."
        }
      ]
    },
    authenticity: {
      title: "Chất lượng & Chứng thực",
      questions: [
        {
          q: "Làm thế nào để đảm bảo sản phẩm THE SEA là chính hãng?",
          a: "Mỗi sản phẩm THE SEA đều được cấp mã định danh số (NFC chip hoặc mã vi chíp tích hợp) và thẻ chứng nhận chất lượng chính hãng đi kèm số seri duy nhất. Quý khách chỉ nên mua sắm tại website chính thức và hệ thống Boutique của THE SEA."
        },
        {
          q: "Sản phẩm được chế tác tại đâu?",
          a: "Các tuyệt tác da và phụ kiện của THE SEA được chế tác thủ công bởi các nghệ nhân giàu kinh nghiệm tại các xưởng Atelier đạt chuẩn quốc tế, sử dụng nguồn da thuộc tinh tuyển từ các nhà thuộc da hàng đầu thế giới."
        },
        {
          q: "Chế độ bảo hành chính hãng bao gồm những gì?",
          a: "Mọi sản phẩm của THE SEA được bảo hành chính hãng 2 năm về đường chỉ, khóa kim loại, khóa kéo và lỗi kỹ thuật chế tác. Chúng tôi cũng cung cấp dịch vụ phục chế và làm mới trọn đời tại Atelier."
        }
      ]
    },
    services: {
      title: "Dịch vụ & Đặt lịch hẹn",
      questions: [
        {
          q: "Làm thế nào để đặt lịch hẹn tư vấn riêng tại cửa hàng?",
          a: "Quý khách có thể sử dụng tính năng 'Đặt lịch hẹn' trực tuyến trên trang web hoặc liên hệ trực tiếp với cửa hàng gần nhất. Chuyên viên tư vấn riêng của Maison sẽ chuẩn bị không gian VIP và các sản phẩm theo đúng sở thích của quý khách."
        },
        {
          q: "Dịch vụ cá nhân hóa (Hot Stamping) mất bao lâu?",
          a: "Dịch vụ dập chìm / ép kim ký tự tên quý khách được thực hiện trực tiếp tại Boutique trong khoảng 15 - 30 phút hoặc 24 giờ đối với các đơn hàng mua sắm trực tuyến."
        }
      ]
    }
  };

  const currentQuestions = faqData[activeCategory]?.questions || [];
  const filteredQuestions = searchQuery.trim()
    ? Object.values(faqData)
        .flatMap(cat => cat.questions)
        .filter(item => item.q.toLowerCase().includes(searchQuery.toLowerCase()) || item.a.toLowerCase().includes(searchQuery.toLowerCase()))
    : currentQuestions;

  return (
    <div className="luxury-page">
      <div className="luxury-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80')` }}>
        <div className="luxury-hero-overlay"></div>
        <div className="luxury-hero-content">
          <span className="luxury-hero-tag">Client Services</span>
          <h1 className="luxury-hero-title">Câu Hỏi Thường Gặp (FAQ)</h1>
          <p className="luxury-hero-desc">
            Tìm câu trả lời cho các thắc mắc về đơn hàng, chính sách giao nhận, bảo hành và các đặc quyền dịch vụ của Maison THE SEA.
          </p>
          <div className="luxury-breadcrumb">
            <Link to="/homepage">Trang chủ</Link>
            <span>/</span>
            <span>Trợ giúp</span>
            <span>/</span>
            <span>FAQ's</span>
          </div>
        </div>
      </div>

      <div className="luxury-container">
        {/* Search Bar */}
        <div style={{ maxWidth: "600px", margin: "0 auto 50px auto" }}>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              className="luxury-input"
              style={{ paddingLeft: "45px", borderRadius: "0", fontSize: "15px" }}
              placeholder="Tìm kiếm câu hỏi (ví dụ: giao hàng, đổi trả, bảo hành)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#888" }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
        </div>

        {/* Category Pills */}
        {!searchQuery && (
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap", marginBottom: "50px" }}>
            {Object.keys(faqData).map(key => (
              <button
                key={key}
                onClick={() => { setActiveCategory(key); setOpenIndex(0); }}
                style={{
                  background: activeCategory === key ? "#111" : "#f5f5f5",
                  color: activeCategory === key ? "#fff" : "#333",
                  border: "none",
                  padding: "12px 24px",
                  fontSize: "12px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontWeight: "500"
                }}
              >
                {faqData[key].title}
              </button>
            ))}
          </div>
        )}

        {/* Accordion Questions */}
        <div style={{ maxWidth: "850px", margin: "0 auto" }}>
          <div className="luxury-accordion">
            {filteredQuestions.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className={`luxury-accordion-item ${isOpen ? 'open' : ''}`}>
                  <button 
                    className="luxury-accordion-header"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span>{item.q}</span>
                    <span className="luxury-accordion-icon">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="luxury-accordion-content">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredQuestions.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px", color: "#888" }}>
              Không tìm thấy câu hỏi phù hợp. Quý khách vui lòng liên hệ trực tiếp với chuyên viên tư vấn.
            </div>
          )}

          {/* Still need help box */}
          <div className="luxury-highlight-box" style={{ textAlign: "center", marginTop: "60px" }}>
            <h3 className="luxury-highlight-title">Vẫn chưa tìm thấy câu trả lời?</h3>
            <p className="luxury-highlight-text" style={{ marginBottom: "20px" }}>
              Đội ngũ Chuyên viên Tư vấn Khách hàng của Maison THE SEA luôn sẵn sàng hỗ trợ quý khách 24/7.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
              <Link to="/contact" className="luxury-btn-dark">Gọi cho chúng tôi</Link>
              <Link to="/contact-mail" className="luxury-btn-outline">Gửi Email hỗ trợ</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
