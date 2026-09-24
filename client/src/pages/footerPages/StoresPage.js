import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './footerPages.css';

const StoresPage = () => {
  const [filterCity, setFilterCity] = useState('all');

  const stores = [
    {
      id: 'hcm-dongkhoi',
      city: 'hcm',
      cityName: 'TP. Hồ Chí Minh',
      name: 'THE SEA Đồng Khởi Flagship',
      address: '168 Đường Đồng Khởi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
      phone: '+84 28 3822 9999',
      hours: 'Thứ Hai - Chủ Nhật: 09:30 - 21:30',
      services: ['Bộ sưu tập đầy đủ', 'Phòng thử đồ VIP Salon', 'Cá nhân hóa Hot Stamping', 'Atelier Sửa chữa'],
      image: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?w=800&q=80'
    },
    {
      id: 'hanoi-trangtien',
      city: 'hanoi',
      cityName: 'Hà Nội',
      name: 'THE SEA Tràng Tiền Boutique',
      address: 'Tầng 1-2 Tràng Tiền Plaza, 24 Hai Bà Trưng, Quận Hoàn Kiếm, Hà Nội',
      phone: '+84 24 3936 8888',
      hours: 'Thứ Hai - Chủ Nhật: 09:30 - 21:30',
      services: ['Bộ sưu tập mới nhất', 'Dịch vụ quà tặng Art of Gifting', 'Tư vấn phong cách riêng', 'Đặt lịch hẹn VIP'],
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80'
    },
    {
      id: 'danang-bachdang',
      city: 'danang',
      cityName: 'Đà Nẵng',
      name: 'THE SEA Bạch Đằng Atelier',
      address: '88 Đường Bạch Đằng, Phường Hải Châu 1, Quận Hải Châu, TP. Đà Nẵng',
      phone: '+84 236 388 7777',
      hours: 'Thứ Hai - Chủ Nhật: 10:00 - 21:00',
      services: ['Resort & Travel Collection', 'Private Client Lounge', 'Dịch vụ bảo hành', 'Giao hàng tận nơi'],
      image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80'
    },
    {
      id: 'paris-vendome',
      city: 'international',
      cityName: 'Quốc tế (Paris)',
      name: 'THE SEA Maison Vendôme',
      address: '12 Place Vendôme, 75001 Paris, France',
      phone: '+33 1 42 68 00 00',
      hours: 'Monday - Saturday: 10:00 - 19:30',
      services: ['Haute Maroquinerie', 'Bespoke Atelier', 'High Jewelry', 'Private Champagne Bar'],
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80'
    },
    {
      id: 'tokyo-ginza',
      city: 'international',
      cityName: 'Quốc tế (Tokyo)',
      name: 'THE SEA Ginza Tower',
      address: '6-10-1 Ginza, Chuo City, Tokyo 104-0061, Japan',
      phone: '+81 3 3572 0000',
      hours: 'Daily: 11:00 - 20:00',
      services: ['Full Collection', 'Exhibition Gallery', 'Monogram Studio', 'VIP Concierge'],
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80'
    }
  ];

  const filteredStores = filterCity === 'all' 
    ? stores 
    : stores.filter(s => s.city === filterCity);

  return (
    <div className="luxury-page">
      <div className="luxury-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555529771-835f59fc5efe?w=1600&q=80')` }}>
        <div className="luxury-hero-overlay"></div>
        <div className="luxury-hero-content">
          <span className="luxury-hero-tag">Boutiques</span>
          <h1 className="luxury-hero-title">Hệ Thống Cửa Hàng</h1>
          <p className="luxury-hero-desc">
            Khám phá không gian mua sắm sang trọng, trải nghiệm dịch vụ chăm sóc khách hàng độc bản và đắm mình trong thế giới sáng tạo của THE SEA.
          </p>
          <div className="luxury-breadcrumb">
            <Link to="/homepage">Trang chủ</Link>
            <span>/</span>
            <span>Hệ thống cửa hàng</span>
          </div>
        </div>
      </div>

      <div className="luxury-container">
        {/* City Filter */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginBottom: "50px" }}>
          {[
            { id: 'all', label: 'Tất cả cửa hàng' },
            { id: 'hcm', label: 'TP. Hồ Chí Minh' },
            { id: 'hanoi', label: 'Hà Nội' },
            { id: 'danang', label: 'Đà Nẵng' },
            { id: 'international', label: 'Quốc Tế' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterCity(tab.id)}
              style={{
                background: filterCity === tab.id ? "#111" : "#f4f4f4",
                color: filterCity === tab.id ? "#fff" : "#333",
                border: "none",
                padding: "11px 22px",
                fontSize: "12px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                cursor: "pointer",
                fontWeight: "500",
                transition: "all 0.2s"
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Stores Grid */}
        <div className="luxury-grid-3">
          {filteredStores.map(store => (
            <div key={store.id} className="store-card">
              <div style={{ height: "200px", overflow: "hidden", marginBottom: "20px" }}>
                <img 
                  src={store.image} 
                  alt={store.name} 
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }} 
                />
              </div>
              <span className="store-tag">{store.cityName}</span>
              <h3 className="store-name">{store.name}</h3>

              <div className="store-info-row">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>{store.address}</span>
              </div>

              <div className="store-info-row">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                <a href={`tel:${store.phone.replace(/\s+/g, '')}`} style={{ color: "inherit", textDecoration: "none" }}>{store.phone}</a>
              </div>

              <div className="store-info-row">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span>{store.hours}</span>
              </div>

              <div style={{ marginTop: "15px", paddingTop: "15px", borderTop: "1px solid #eee", fontSize: "12px", color: "#777" }}>
                <strong style={{ color: "#333", display: "block", marginBottom: "6px" }}>Dịch vụ tại cửa hàng:</strong>
                <ul style={{ margin: 0, paddingLeft: "16px", lineHeight: "1.8" }}>
                  {store.services.map((srv, idx) => (
                    <li key={idx}>{srv}</li>
                  ))}
                </ul>
              </div>

              <div className="store-actions">
                <Link to="/book-appointment" className="luxury-btn-dark" style={{ flex: 1, textAlign: "center", padding: "11px 16px", fontSize: "11px" }}>
                  Đặt lịch hẹn
                </Link>
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(store.address)}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="luxury-btn-outline"
                  style={{ textAlign: "center", padding: "11px 16px", fontSize: "11px" }}
                >
                  Chỉ đường
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoresPage;
