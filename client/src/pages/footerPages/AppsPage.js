import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './footerPages.css';

const AppsPage = () => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const features = [
    {
      title: "AR Virtual Try-On",
      desc: "Trải nghiệm tính năng thực tế tăng cường (AR) để ướm thử túi xách, kính mắt và trang sức ngay trong không gian thực của quý khách với độ chính xác cao.",
      icon: "✨"
    },
    {
      title: "Ưu Tiên Bộ Sưu Tập Giới Hạn",
      desc: "Nhận thông báo thông minh và đặc quyền đặt trước các phiên bản Capsule giới hạn trước 48 giờ so với thời điểm mở bán toàn cầu.",
      icon: "💎"
    },
    {
      title: "Chứng Thư Xuất Xứ Số (Digital Passport)",
      desc: "Quét chip NFC trên sản phẩm để lưu trữ thẻ bảo hành điện tử, lịch sử phục chế và giấy chứng nhận sở hữu tác phẩm chính hãng.",
      icon: "🛡️"
    },
    {
      title: "Trợ Lý Mua Sắm Riêng (VIP Concierge)",
      desc: "Trò chuyện trực tiếp 1-1 với Chuyên viên tư vấn khách hàng cá nhân bất cứ lúc nào qua ứng dụng với giao diện bảo mật tuyệt đối.",
      icon: "📱"
    }
  ];

  const handleSimulateDownload = (platform) => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 5000);
  };

  return (
    <div className="luxury-page">
      <div className="luxury-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1600&q=80')` }}>
        <div className="luxury-hero-overlay"></div>
        <div className="luxury-hero-content">
          <span className="luxury-hero-tag">Digital Maison</span>
          <h1 className="luxury-hero-title">Ứng Dụng Di Động THE SEA</h1>
          <p className="luxury-hero-desc">
            Mang trọn vẹn tinh hoa thời trang xa xỉ và những trải nghiệm số độc quyền vào chiếc điện thoại của quý khách.
          </p>
          <div className="luxury-breadcrumb">
            <Link to="/homepage">Trang chủ</Link>
            <span>/</span>
            <Link to="/services">Dịch vụ</Link>
            <span>/</span>
            <span>Download our Apps</span>
          </div>
        </div>
      </div>

      <div className="luxury-container">
        {/* App Showcase Row */}
        <div className="luxury-split-row">
          <div style={{ textAlign: "center" }}>
            <img 
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80" 
              alt="The Sea Mobile App" 
              style={{ maxWidth: "340px", width: "100%", borderRadius: "32px", boxShadow: "0 25px 60px rgba(0,0,0,0.25)", border: "8px solid #222" }} 
            />
          </div>

          <div className="luxury-split-content">
            <span className="luxury-split-tag">iOS & Android Experience</span>
            <h2 className="luxury-split-title">Thế Giới THE SEA Trong Tầm Tay</h2>
            <p className="luxury-split-desc">
              Ứng dụng THE SEA mở ra cánh cửa dẫn lối quý khách bước vào vũ trụ sáng tạo của Maison: từ việc khám phá những thước phim hậu trường sàn diễn Runway, đặt lịch hẹn riêng tại Boutique, đến việc quản lý bộ sưu tập cá nhân và mua sắm tức thời.
            </p>

            {/* Store Download Buttons */}
            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", marginBottom: "30px" }}>
              <button 
                onClick={() => handleSimulateDownload('iOS')}
                className="luxury-btn-dark"
                style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 24px" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.9.04-2 .61-2.65 1.36-.58.66-1.09 1.73-.96 2.76 1.01.08 2.05-.53 2.69-1.27z"/></svg>
                <span>Tải trên App Store</span>
              </button>

              <button 
                onClick={() => handleSimulateDownload('Android')}
                className="luxury-btn-outline"
                style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 24px" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a2.408 2.408 0 0 1-.22-.996V2.81c0-.36.08-.7.219-.996zm11.233 11.233l2.67-2.67-12.01-6.93 9.34 9.6zm2.67-2.67l2.13 1.23a1.996 1.996 0 0 1 0 3.46l-2.13 1.23-2.67-2.67 2.67-2.67zm-2.67 2.67l-9.34 9.6 12.01-6.93-2.67-2.67z"/></svg>
                <span>Tải trên Google Play</span>
              </button>
            </div>

            {downloadSuccess && (
              <div style={{ padding: "12px 18px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#166534", fontSize: "13px", borderRadius: "4px", marginBottom: "25px" }}>
                ✓ Đã bắt đầu tải gói cài đặt ứng dụng THE SEA cho thiết bị của bạn.
              </div>
            )}

            {/* QR Code Scan Mock */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px", padding: "18px", background: "#f8f8f7", border: "1px solid #ebe8e2", maxWidth: "420px" }}>
              <div style={{ width: "70px", height: "70px", background: "#fff", padding: "5px", border: "1px solid #ddd", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm-2 10h8v8H2v-8zm2 2v4h4v-4H4zm10-14h8v8h-8V2zm2 2v4h4V4h-4zm2 10h2v2h-2v-2zm-2 2h2v2h-2v-2zm4 0h2v2h-2v-2zm0-2h2v2h-2v-2zm-4 4h6v2h-6v-2zm4-6h2v2h-2v-2z"/></svg>
              </div>
              <div>
                <span style={{ fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: "600", display: "block", marginBottom: "4px" }}>
                  Quét mã QR để tải
                </span>
                <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>
                  Mở camera điện thoại quét mã để truy cập trang tải ứng dụng ngay lập tức.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Cards */}
        <div style={{ marginTop: "80px", marginBottom: "80px" }}>
          <h2 className="luxury-section-title">Những Đặc Quyền Trên Ứng Dụng</h2>
          <p className="luxury-section-sub">Thiết kế độc quyền để tối ưu hóa sự thuận tiện và cảm hứng thời trang.</p>

          <div className="luxury-grid-4">
            {features.map((feat, idx) => (
              <div key={idx} className="luxury-card" style={{ padding: "35px 25px", textAlign: "center" }}>
                <div style={{ fontSize: "36px", marginBottom: "15px" }}>{feat.icon}</div>
                <h3 className="luxury-card-title" style={{ fontSize: "18px" }}>{feat.title}</h3>
                <p className="luxury-card-text" style={{ fontSize: "13.5px" }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppsPage;
