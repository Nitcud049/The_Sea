import React from 'react';
import { Link } from 'react-router-dom';
// Nếu bạn đang dùng file CSS riêng, hãy giữ nguyên dòng import của bạn, ví dụ:
// import styles from './HeroVideo.module.css';

function HeroVideo({ heroConfig }) {
  // Nếu Admin chưa cài đặt, dùng cấu hình mặc định này
  const config = heroConfig || {
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-girl-in-a-fashion-photoshoot-1279-large.mp4", // Link video dự phòng
    subtitle: "DÀNH CHO NỮ",
    title: "Thiết Kế Biểu Tượng",
    link: "/women/bags",
    btnText: "Khám phá"
  };

  // Kiểm tra xem link nhập vào có phải là video không (chứa đuôi .mp4, .webm...)
  const isVideo = config.mediaUrl.match(/\.(mp4|webm|ogg)$/i) || config.mediaUrl.includes('video');

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', backgroundColor: '#000', overflow: 'hidden' }}>
      
      {/* LỚP NỀN: TỰ ĐỘNG CHỌN VIDEO HOẶC HÌNH ẢNH */}
      {isVideo ? (
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
        >
          <source src={config.mediaUrl} type="video/mp4" />
        </video>
      ) : (
        <img 
          src={config.mediaUrl} 
          alt={config.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
        />
      )}

      {/* LỚP TEXT ĐÈ LÊN TRÊN */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#fff', width: '100%', zIndex: 2 }}>
          <p style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px', fontWeight: '500' }}>
            {config.subtitle}
          </p>
          <h2 style={{ fontSize: '50px', margin: '0 0 25px 0', fontFamily: "'Playfair Display', serif", fontWeight: '400' }}>
            {config.title}
          </h2>
          {config.link && (
            <Link to={config.link} style={{ textDecoration: 'none', padding: '12px 30px', border: '1px solid #fff', color: '#fff', display: 'inline-block', transition: 'all 0.3s' }}
                  onMouseOver={e => {e.target.style.backgroundColor='#fff'; e.target.style.color='#000'}} 
                  onMouseOut={e => {e.target.style.backgroundColor='transparent'; e.target.style.color='#fff'}}>
                {config.btnText}
            </Link>
          )}
      </div>
    </div>
  );
}

export default HeroVideo;