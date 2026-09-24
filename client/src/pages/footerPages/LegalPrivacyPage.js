import React from 'react';
import { Link } from 'react-router-dom';
import './footerPages.css';

const LegalPrivacyPage = () => {
  return (
    <div className="luxury-page">
      <div className="luxury-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80')` }}>
        <div className="luxury-hero-overlay"></div>
        <div className="luxury-hero-content">
          <span className="luxury-hero-tag">Terms & Privacy</span>
          <h1 className="luxury-hero-title">Chính Sách Pháp Lý & Quyền Riêng Tư</h1>
          <p className="luxury-hero-desc">
            Bảo vệ thông tin cá nhân và quyền lợi của quý khách là ưu tiên hàng đầu tại Maison THE SEA.
          </p>
          <div className="luxury-breadcrumb">
            <Link to="/homepage">Trang chủ</Link>
            <span>/</span>
            <span>Legal & Privacy</span>
          </div>
        </div>
      </div>

      <div className="luxury-container" style={{ maxWidth: "900px" }}>
        <div style={{ fontSize: "14.5px", lineHeight: "1.9", color: "#444" }}>
          
          <h2 style={{ fontFamily: "var(--sea-font-title)", fontSize: "24px", color: "#111", marginTop: "30px", marginBottom: "15px" }}>
            1. Thu Thập Dữ Liệu Cá Nhân
          </h2>
          <p>
            Maison THE SEA chỉ thu thập các dữ liệu cá nhân cần thiết phục vụ cho việc thực hiện đơn hàng, hỗ trợ dịch vụ khách hàng và mang lại trải nghiệm mua sắm tối ưu cho quý khách (bao gồm: Họ tên, số điện thoại, địa chỉ nhận hàng, địa chỉ email, và lịch sử mua sắm).
          </p>

          <h2 style={{ fontFamily: "var(--sea-font-title)", fontSize: "24px", color: "#111", marginTop: "40px", marginBottom: "15px" }}>
            2. Cam Kết Bảo Mật Tuyệt Đối
          </h2>
          <p>
            Mọi thông tin giao dịch tài chính, thông tin thẻ tín dụng đều được mã hóa bằng giao thức SSL/TLS bảo mật cao cấp nhất. THE SEA cam kết không bao giờ bán, cho thuê hoặc chia sẻ dữ liệu cá nhân của quý khách cho bất kỳ bên thứ ba nào vì mục đích thương mại không được phép.
          </p>

          <h2 style={{ fontFamily: "var(--sea-font-title)", fontSize: "24px", color: "#111", marginTop: "40px", marginBottom: "15px" }}>
            3. Quyền Lợi Của Khách Hàng
          </h2>
          <p>
            Quý khách có toàn quyền yêu cầu tra cứu, chỉnh sửa hoặc xóa vĩnh viễn dữ liệu thông tin cá nhân của mình khỏi cơ sở dữ liệu của chúng tôi bất cứ lúc nào bằng cách gửi yêu cầu tới Ban Bảo Vệ Quyền Riêng Tư:
          </p>
          <div className="luxury-highlight-box" style={{ margin: "25px 0" }}>
            <p className="luxury-highlight-text">
              <strong>Email phụ trách bảo mật:</strong> privacy@thesea.com<br/>
              <strong>Hotline hỗ trợ:</strong> +84 877 589 808<br/>
              <strong>Địa chỉ:</strong> Tòa nhà THE SEA, 168 Đồng Khởi, Bến Nghé, Quận 1, TP. Hồ Chí Minh
            </p>
          </div>

          <h2 style={{ fontFamily: "var(--sea-font-title)", fontSize: "24px", color: "#111", marginTop: "40px", marginBottom: "15px" }}>
            4. Bản Quyền Sở Hữu Trí Tuệ
          </h2>
          <p>
            Tất cả các nhãn hiệu, logo, hình ảnh thiết kế sản phẩm, video và nội dung trên trang web này là tài sản sở hữu trí tuệ độc quyền của THE SEA. Mọi hành vi sao chép, tái bản hoặc sử dụng khi chưa có sự đồng ý bằng văn bản của Maison đều cấu thành hành vi vi phạm pháp luật.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalPrivacyPage;
