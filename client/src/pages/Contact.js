import React, { useEffect } from 'react';

function Contact() {
  // Cuộn lên đầu trang khi vừa vào
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ padding: '150px 40px 100px 40px', minHeight: '80vh', backgroundColor: '#fff', textAlign: 'center' }}>
      <h2 style={{ fontSize: '32px', fontFamily: "'Playfair Display', serif", marginBottom: '20px' }}>Liên hệ với chúng tôi</h2>
      <p style={{ color: '#666', marginBottom: '50px', fontSize: '15px' }}>
        Đội ngũ tư vấn viên của THE SEA luôn sẵn sàng hỗ trợ bạn.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', flexWrap: 'wrap', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ flex: '1 1 300px', padding: '30px', border: '1px solid #eee', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Gọi điện</h3>
          <p style={{ color: '#666', marginBottom: '15px' }}>Thứ Hai đến Thứ Bảy<br/>Từ 9:00 sáng đến 8:00 tối</p>
          <a href="tel:+84123456789" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#1a1a1a', color: '#fff', textDecoration: 'none', borderRadius: '4px' }}>+84 877 589 808</a>
        </div>

        <div style={{ flex: '1 1 300px', padding: '30px', border: '1px solid #eee', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Gửi Email</h3>
          <p style={{ color: '#666', marginBottom: '15px' }}>Chúng tôi sẽ phản hồi bạn<br/>trong vòng 24 giờ làm việc.</p>
          <a href="mailto:support@thesea.com" style={{ display: 'inline-block', padding: '10px 20px', border: '1px solid #1a1a1a', color: '#1a1a1a', textDecoration: 'none', borderRadius: '4px' }}>Gửi tin nhắn</a>
        </div>
      </div>
    </div>
  );
}

export default Contact;