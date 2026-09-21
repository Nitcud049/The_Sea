import React from 'react';

const ContactPage = () => {
  const styles = {
    page: {
      backgroundColor: '#f6f5f3',
      minHeight: '100vh',
      color: '#231F20', // Màu đen ấm sẽ được kế thừa, nhưng giữ ở đây để chắc chắn
      paddingBottom: '100px',
    },
    topNav: {
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e5e5e5',
      height: '65px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      padding: '0 0 0 50px',
    },
    navTitle: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '13px',
      fontWeight: '400', 
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      color: '#231F20',
    },
    navLinks: {
      display: 'flex',
      height: '100%',
    },
    navLinkActive: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 35px',
      fontSize: '12px',
      fontWeight: '400',
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: '#231F20',
      textDecoration: 'none',
      borderBottom: '2px solid #231F20',
      backgroundColor: '#ffffff',
    },
    navLink: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 35px',
      fontSize: '12px',
      fontWeight: '400',
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: '#5C5552',
      textDecoration: 'none',
      borderLeft: '1px solid #f0f0f0',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '50px 20px 0 20px',
    },
    headerTitle: {
      fontSize: '28px',
      fontWeight: '400',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      marginBottom: '16px',
      color: '#231F20',
    },
    headerDesc: {
      fontSize: '14px',
      fontWeight: '400',
      letterSpacing: '0.02em',
      color: '#4A4542',
      marginBottom: '40px',
      lineHeight: '1.6',
    },
    gridCards: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      backgroundColor: '#ffffff',
      border: '1px solid #eaeaea',
      marginBottom: '40px',
    },
    cardCol: {
      padding: '40px 30px',
      borderRight: '1px solid #eaeaea',
      display: 'flex',
      flexDirection: 'column',
    },
    cardColLast: {
      padding: '40px 30px',
      display: 'flex',
      flexDirection: 'column',
    },
    cardTitle: {
      fontSize: '13px',
      fontWeight: '400',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      marginBottom: '12px',
      color: '#231F20',
    },
    cardDesc: {
      fontSize: '13px',
      fontWeight: '400',
      letterSpacing: '0.02em',
      color: '#4A4542',
      lineHeight: '1.6',
      flexGrow: 1,
      minHeight: '38px',
    },
    btnWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      marginTop: '30px',
    },
    pillBtn: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: '12px 20px',
      border: '1px solid #231F20',
      borderRadius: '50px',
      backgroundColor: '#ffffff',
      color: '#231F20',
      fontSize: '13px',
      fontWeight: '400',
      letterSpacing: '0.02em',
      cursor: 'pointer',
      boxSizing: 'border-box',
    },
    iconStyle: {
      marginRight: '8px',
      display: 'flex',
      alignItems: 'center',
    },
    faqSection: {
      backgroundColor: '#ffffff',
      padding: '40px',
      border: '1px solid #eaeaea',
    },
    faqHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '40px',
    },
    faqTitle: {
      fontSize: '22px',
      fontWeight: '400',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      color: '#231F20',
    },
    searchWrapper: {
      position: 'relative',
      width: '360px',
    },
    searchInput: {
      width: '100%',
      padding: '12px 15px 12px 42px',
      backgroundColor: '#f5f5f5',
      border: 'none',
      borderRadius: '4px',
      fontSize: '13px',
      fontWeight: '400',
      letterSpacing: '0.02em',
      outline: 'none',
      boxSizing: 'border-box',
      color: '#231F20',
    },
    searchIcon: {
      position: 'absolute',
      left: '14px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#777',
      display: 'flex',
      alignItems: 'center',
    },
    faqGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '24px 40px',
      marginBottom: '40px',
    },
    faqLink: {
      fontSize: '13px',
      fontWeight: '400',
      letterSpacing: '0.02em',
      color: '#231F20',
      textDecoration: 'none',
      lineHeight: '1.6',
      display: 'block',
    },
    exploreBtn: {
      display: 'block',
      width: '100%',
      padding: '14px 0',
      border: '1px solid #231F20',
      borderRadius: '50px',
      backgroundColor: '#ffffff',
      color: '#231F20',
      fontSize: '13px',
      fontWeight: '400',
      letterSpacing: '0.02em',
      textAlign: 'center',
      cursor: 'pointer',
    },
  };

  const PhoneIcon = () => (
    <svg style={styles.iconStyle} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
  );
  const MailIcon = () => (
    <svg style={styles.iconStyle} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
  );
  const ZaloIcon = () => (
    <svg style={styles.iconStyle} width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.03 2 11c0 2.83 1.48 5.35 3.79 7.03-.4.87-1.12 2.37-1.16 2.45-.08.18-.11.4-.02.58.1.18.28.29.49.29.13 0 1.95-.23 3.61-1.07 1.05.28 2.16.42 3.29.42 5.52 0 10-4.03 10-9s-4.48-9-10-9z"/></svg>
  );
  const WhatsAppIcon = () => (
    <svg style={styles.iconStyle} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
  );
  const AppleIcon = () => (
    <svg style={styles.iconStyle} width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16.36 14.15c-.03-2.61 2.13-3.87 2.23-3.92-1.22-1.78-3.11-2.02-3.8-2.05-1.61-.16-3.15.95-3.98.95-.82 0-2.09-.92-3.41-.9-1.72.02-3.32.99-4.2 2.52-1.79 3.1-.46 7.69 1.28 10.19.85 1.23 1.86 2.62 3.19 2.57 1.28-.05 1.78-.83 3.33-.83 1.54 0 2.01.83 3.34.8 1.37-.03 2.23-1.28 3.08-2.51.98-1.42 1.38-2.8 1.4-2.88-.03-.01-2.67-1.02-2.7-4.01zM14.93 5.4c.71-.85 1.18-2.04 1.05-3.23-1.02.04-2.26.68-3 1.56-.59.7-1.15 1.92-1 3.09 1.15.09 2.27-.56 2.95-1.42z"/></svg>
  );

  return (
    <div style={styles.page}>
      <nav style={styles.topNav}>
        <div style={styles.navTitle}>CẦN TRỢ GIÚP</div>
        <div style={styles.navLinks}>
          <a href="#contact" style={styles.navLinkActive}>LIÊN HỆ VỚI CHÚNG TÔI</a>
          <a href="#faq" style={styles.navLink}>CÂU HỎI THƯỜNG GẶP</a>
          <a href="#care" style={styles.navLink}>DỊCH VỤ CHĂM SÓC</a>
        </div>
      </nav>

      <div style={styles.container}>
        <div>
          <h1 style={styles.headerTitle}>LIÊN HỆ VỚI CHÚNG TÔI</h1>
          <p style={styles.headerDesc}>
            Quý khách có thể tìm hiểu thêm thông tin trong mục Câu hỏi thường gặp hoặc liên hệ với Trung tâm Tư vấn Khách hàng của chúng tôi<br/>qua các kênh dưới đây
          </p>
        </div>

        <div style={styles.gridCards}>
          <div style={styles.cardCol}>
            <div style={styles.cardTitle}>LIÊN HỆ HOTLINE</div>
            <div style={styles.cardDesc}>Thứ Hai đến Chủ nhật: 10 giờ sáng - 8 giờ tối</div>
            <div style={styles.btnWrapper}>
              <button style={styles.pillBtn}><PhoneIcon /> +84 2838614107</button>
              <button style={styles.pillBtn}><PhoneIcon /> +84 2871059504</button>
            </div>
          </div>
          <div style={styles.cardCol}>
            <div style={styles.cardTitle}>GỬI EMAIL</div>
            <div style={styles.cardDesc}>Các chuyên viên tư vấn rất sẵn lòng giải đáp thắc mắc của quý khách.</div>
            <div style={styles.btnWrapper}>
              <button style={styles.pillBtn}><MailIcon /> Gửi email</button>
            </div>
          </div>
          <div style={styles.cardColLast}>
            <div style={styles.cardTitle}>GỬI TIN NHẮN</div>
            <div style={styles.cardDesc}>Các chuyên viên tư vấn hân hạnh được hỗ trợ quý khách.</div>
            <div style={styles.btnWrapper}>
              <button style={styles.pillBtn}><ZaloIcon /> Zalo</button>
              <button style={styles.pillBtn}><WhatsAppIcon /> WhatsApp</button>
              <button style={styles.pillBtn}><AppleIcon /> Apple Messages</button>
            </div>
          </div>
        </div>

        <div style={styles.faqSection}>
          <div style={styles.faqHeader}>
            <h2 style={styles.faqTitle}>NHỮNG CÂU HỎI THƯỜNG GẶP</h2>
            <div style={styles.searchWrapper}>
              <span style={styles.searchIcon}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </span>
              <input type="text" placeholder="Chúng tôi có thể hỗ trợ gì cho quý khách" style={styles.searchInput} />
            </div>
          </div>

          <div style={styles.faqGrid}>
            <a href="#faq1" style={styles.faqLink}>Dịch vụ chăm sóc đồng hồ của chúng tôi như thế nào?</a>
            <a href="#faq2" style={styles.faqLink}>Đồ gia dụng</a>
            <a href="#faq3" style={styles.faqLink}>Dịch vụ chăm sóc phụ kiện của chúng tôi như thế nào?</a>
            <a href="#faq4" style={styles.faqLink}>Dịch vụ chăm sóc sản phẩm bằng da của chúng tôi như thế nào?</a>
            <a href="#faq5" style={styles.faqLink}>Chăm sóc sản phẩm trò chơi và thiết bị thể thao</a>
            <a href="#faq6" style={styles.faqLink}>Tôi muốn được tư vấn chọn quà Louis Vuitton. Bạn có thể hỗ trợ tôi không?</a>
          </div>

          <button style={styles.exploreBtn}>Khám phá tất cả</button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;