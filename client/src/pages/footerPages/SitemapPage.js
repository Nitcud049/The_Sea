import React from 'react';
import { Link } from 'react-router-dom';
import './footerPages.css';

const SitemapPage = () => {
  const sitemapSections = [
    {
      title: "Trang Chủ & Mua Sắm",
      links: [
        { label: "Trang Chủ (Homepage)", url: "/homepage" },
        { label: "Sản Phẩm Yêu Thích (Wishlist)", url: "/wishlist" },
        { label: "Đánh Giá Của Khách Hàng (Reviews)", url: "/my-reviews" },
        { label: "Bộ Sưu Tập Du Lịch (Travel)", url: "/travel" }
      ]
    },
    {
      title: "Thời Trang Nữ (Women)",
      links: [
        { label: "Túi Xách Nữ (Women Bags)", url: "/women/bags" },
        { label: "Trang Phục Nữ (Clothing)", url: "/women/clothing" },
        { label: "Trang Sức Nữ (Jewelry)", url: "/women/jewelry" },
        { label: "Giày Dép Nữ (Shoes)", url: "/women/shoes" },
        { label: "Hàng Mới Về Nữ (New Arrivals)", url: "/women/new-arrivals" }
      ]
    },
    {
      title: "Thời Trang Nam (Men)",
      links: [
        { label: "Túi & Cặp Nam (Men Bags)", url: "/men/bags" },
        { label: "Trang Phục Nam (Clothing)", url: "/men/clothing" },
        { label: "Áo Khoác Nam (Jackets)", url: "/men/jackets" },
        { label: "Phụ Kiện Nam (Accessories)", url: "/men/accessories" },
        { label: "Giày Dép Nam (Shoes)", url: "/men/shoes" },
        { label: "Hàng Mới Về Nam (New Arrivals)", url: "/men/new-arrivals" }
      ]
    },
    {
      title: "Dịch Vụ Cao Cấp (Services)",
      links: [
        { label: "Tổng Quan Dịch Vụ", url: "/services" },
        { label: "Sửa Chữa & Phục Chế (Repairs)", url: "/services/repairs" },
        { label: "Cá Nhân Hóa Sản Phẩm (Personalization)", url: "/services/personalization" },
        { label: "Nghệ Thuật Tặng Quà (Art of Gifting)", url: "/services/gifting" },
        { label: "Tải Ứng Dụng Di Động (Download Apps)", url: "/services/apps" },
        { label: "Đặt Lịch Hẹn Boutique (Book Appointment)", url: "/book-appointment" }
      ]
    },
    {
      title: "Về Thương Hiệu (About THE SEA)",
      links: [
        { label: "Sàn Diễn Thời Trang (Fashion Shows)", url: "/about/fashion-shows" },
        { label: "Nghệ Thuật & Văn Hóa (Arts & Culture)", url: "/about/arts-culture" },
        { label: "Di Sản La Maison", url: "/about/la-maison" },
        { label: "Phát Triển Bền Vững (Sustainability)", url: "/about/sustainability" },
        { label: "Tin Tức Mới Nhất (Latest News)", url: "/about/news" },
        { label: "Chuẩn Mực Đạo Đức (Ethics & Compliance)", url: "/about/ethics-compliance" },
        { label: "Cơ Hội Nghề Nghiệp (Careers)", url: "/about/careers" },
        { label: "Quỹ Foundation THE SEA", url: "/about/foundation" }
      ]
    },
    {
      title: "Hỗ Trợ & Pháp Lý (Help & Legal)",
      links: [
        { label: "Trung Tâm Trợ Giúp (Contact Portal)", url: "/contact-us" },
        { label: "Gửi Email Trực Tuyến (Contact Mail)", url: "/contact-mail" },
        { label: "Gọi Điện Hỗ Trợ (Call Us)", url: "/contact" },
        { label: "Câu Hỏi Thường Gặp (FAQ's)", url: "/faq" },
        { label: "Bảo Quản Sản Phẩm (Product Care)", url: "/product-care" },
        { label: "Hệ Thống Cửa Hàng (Stores)", url: "/stores" },
        { label: "Đăng Ký Bản Tin (Newsletter)", url: "/newsletter" },
        { label: "Chính Sách Pháp Lý & Bảo Mật (Legal & Privacy)", url: "/legal/privacy" },
        { label: "Chính Sách Cookies", url: "/legal/cookies" }
      ]
    }
  ];

  return (
    <div className="luxury-page">
      <div className="luxury-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80')` }}>
        <div className="luxury-hero-overlay"></div>
        <div className="luxury-hero-content">
          <span className="luxury-hero-tag">Site Navigation</span>
          <h1 className="luxury-hero-title">Sơ Đồ Trang Web (Sitemap)</h1>
          <p className="luxury-hero-desc">
            Toàn bộ các danh mục sản phẩm, dịch vụ và thông tin thương hiệu của Maison THE SEA.
          </p>
          <div className="luxury-breadcrumb">
            <Link to="/homepage">Trang chủ</Link>
            <span>/</span>
            <span>Sitemap</span>
          </div>
        </div>
      </div>

      <div className="luxury-container">
        <div className="luxury-grid-3" style={{ gap: "40px 30px" }}>
          {sitemapSections.map((sec, idx) => (
            <div key={idx} style={{ padding: "30px 25px", background: "#fbfbfa", border: "1px solid #ebe8e2" }}>
              <h3 style={{ fontFamily: "var(--sea-font-title)", fontSize: "18px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "20px", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
                {sec.title}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {sec.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link 
                      to={link.url}
                      style={{ 
                        color: "#444", 
                        textDecoration: "none", 
                        fontSize: "14px", 
                        transition: "color 0.2s, padding-left 0.2s",
                        display: "inline-block"
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#bfa15f"; e.currentTarget.style.paddingLeft = "6px"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "#444"; e.currentTarget.style.paddingLeft = "0"; }}
                    >
                      → {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SitemapPage;
