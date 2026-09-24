import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './footerPages.css';

const CookiesPage = () => {
  const [preferences, setPreferences] = useState({
    essential: true, // Always required
    analytics: true,
    personalization: true,
    marketing: false
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <div className="luxury-page">
      <div className="luxury-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80')` }}>
        <div className="luxury-hero-overlay"></div>
        <div className="luxury-hero-content">
          <span className="luxury-hero-tag">Privacy & Tracking</span>
          <h1 className="luxury-hero-title">Chính Sách Sử Dụng Cookie</h1>
          <p className="luxury-hero-desc">
            Minh bạch về cách chúng tôi sử dụng cookie để mang lại trải nghiệm duyệt web mượt mà và cá nhân hóa cho quý khách.
          </p>
          <div className="luxury-breadcrumb">
            <Link to="/homepage">Trang chủ</Link>
            <span>/</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>

      <div className="luxury-container" style={{ maxWidth: "850px" }}>
        <div style={{ marginBottom: "50px" }}>
          <h2 style={{ fontFamily: "var(--sea-font-title)", fontSize: "24px", marginBottom: "15px" }}>
            Cookie Là Gì?
          </h2>
          <p style={{ fontSize: "14.5px", lineHeight: "1.9", color: "#444" }}>
            Cookie là các tệp văn bản nhỏ được lưu trữ trên trình duyệt hoặc thiết bị của quý khách khi truy cập trang web THE SEA. Chúng giúp trang web ghi nhớ giỏ hàng, tùy chọn tiền tệ, trạng thái đăng nhập và cải thiện tốc độ tải trang.
          </p>
        </div>

        {/* Cookie Settings Box */}
        <div style={{ background: "#fbfbfa", border: "1px solid #e8e4de", padding: "40px", marginBottom: "50px" }}>
          <h3 style={{ fontFamily: "var(--sea-font-title)", fontSize: "20px", marginBottom: "25px", borderBottom: "1px solid #ddd", paddingBottom: "12px" }}>
            Tùy Chọn Quản Lý Cookie Của Bạn
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            {/* Essential */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "20px" }}>
              <div>
                <strong style={{ fontSize: "15px", display: "block", marginBottom: "6px" }}>1. Cookie Cần Thiết (Bắt Buộc)</strong>
                <p style={{ fontSize: "13.5px", color: "#666", margin: 0, lineHeight: "1.6" }}>
                  Đảm bảo các tính năng cốt lõi hoạt động bình thường như duy trì giỏ hàng, tiến hành thanh toán an toàn và xác thực tài khoản.
                </p>
              </div>
              <span style={{ fontSize: "12px", background: "#e0e0e0", padding: "6px 12px", borderRadius: "20px", fontWeight: "600", whiteSpace: "nowrap" }}>
                Luôn Bật
              </span>
            </div>

            {/* Analytics */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "20px" }}>
              <div>
                <strong style={{ fontSize: "15px", display: "block", marginBottom: "6px" }}>2. Cookie Phân Tích & Hiệu Suất</strong>
                <p style={{ fontSize: "13.5px", color: "#666", margin: 0, lineHeight: "1.6" }}>
                  Giúp chúng tôi đo lường lưu lượng truy cập và tối ưu hóa tốc độ tải trang mà không thu thập danh tính cá nhân cụ thể.
                </p>
              </div>
              <input 
                type="checkbox" 
                checked={preferences.analytics} 
                onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})} 
                style={{ width: "20px", height: "20px", cursor: "pointer" }}
              />
            </div>

            {/* Personalization */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "20px" }}>
              <div>
                <strong style={{ fontSize: "15px", display: "block", marginBottom: "6px" }}>3. Cookie Cá Nhân Hóa</strong>
                <p style={{ fontSize: "13.5px", color: "#666", margin: 0, lineHeight: "1.6" }}>
                  Ghi nhớ các lựa chọn của bạn như đơn vị tiền tệ (VND/USD/EUR) và danh sách yêu thích Wishlist.
                </p>
              </div>
              <input 
                type="checkbox" 
                checked={preferences.personalization} 
                onChange={(e) => setPreferences({...preferences, personalization: e.target.checked})} 
                style={{ width: "20px", height: "20px", cursor: "pointer" }}
              />
            </div>

            {/* Marketing */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "20px" }}>
              <div>
                <strong style={{ fontSize: "15px", display: "block", marginBottom: "6px" }}>4. Cookie Quảng Cáo & Tiếp Thị</strong>
                <p style={{ fontSize: "13.5px", color: "#666", margin: 0, lineHeight: "1.6" }}>
                  Cho phép hiển thị các gợi ý sản phẩm phù hợp với sở thích thời trang của quý khách trên các nền tảng đối tác.
                </p>
              </div>
              <input 
                type="checkbox" 
                checked={preferences.marketing} 
                onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})} 
                style={{ width: "20px", height: "20px", cursor: "pointer" }}
              />
            </div>
          </div>

          <div style={{ marginTop: "35px", display: "flex", alignItems: "center", gap: "20px" }}>
            <button onClick={handleSave} className="luxury-btn-dark">
              Lưu Cài Đặt Tùy Chọn
            </button>
            {saved && (
              <span style={{ color: "#166534", fontSize: "14px", fontWeight: "500" }}>
                ✓ Đã lưu cài đặt cookie thành công!
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiesPage;
