import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './footerPages.css';

const ProductCarePage = () => {
  const [activeTab, setActiveTab] = useState('leather');

  const categories = [
    { id: 'leather', name: 'Đồ Da & Túi Xách' },
    { id: 'ready-to-wear', name: 'Trang Phục & Lụa' },
    { id: 'jewelry', name: 'Trang Sức & Đồng Hồ' },
    { id: 'shoes', name: 'Giày Thủ Công' }
  ];

  const contentMap = {
    leather: {
      title: "Chăm sóc & Bảo quản Đồ Da Cao Cấp",
      subtitle: "Da thật là chất liệu sống, phát triển lớp patina độc đáo và ngày càng trở nên quyến rũ theo thời gian nếu được trân trọng nâng niu.",
      img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1000&q=80",
      tips: [
        {
          title: "Tránh tiếp xúc với nước và chất lỏng",
          desc: "Nếu túi da vô tình bị dính nước mưa hoặc chất lỏng, hãy dùng khăn mềm sạch màu sáng thấm nhẹ lập tức (không chà xát). Để khô tự nhiên ở nơi thoáng gió, tránh dùng máy sấy nhiệt hoặc phơi nắng trực tiếp."
        },
        {
          title: "Bảo quản dáng túi (Structure)",
          desc: "Khi không sử dụng, hãy chèn giấy lụa không axit hoặc túi độn mềm chuyên dụng vào trong lòng túi để giữ form dáng. Tránh để túi quá tải làm biến dạng quai đeo và cấu trúc may."
        },
        {
          title: "Bảo quản trong túi chống bụi (Dust bag)",
          desc: "Luôn cất giữ túi trong túi chống bụi nguyên bản của THE SEA ở nơi khô ráo, tránh ánh sáng mặt trời gay gắt làm phai màu hoặc làm khô lớp dầu tự nhiên của da."
        },
        {
          title: "Tránh cọ xát với trang phục sẫm màu",
          desc: "Các dòng túi da sáng màu (trắng, kem, pastel) có nguy cơ hút màu nhuộm từ quần jean hoặc vải dệt tối màu khi cọ xát thường xuyên."
        }
      ]
    },
    'ready-to-wear': {
      title: "Chăm sóc Lụa Tơ Tằm & Len Cashmere",
      subtitle: "Những sợi dệt thượng hạng đòi hỏi sự chăm sóc tinh tế nhất để gìn giữ độ mềm mại và bóng mượt nguyên bản.",
      img: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=1000&q=80",
      tips: [
        {
          title: "Giặt hấp chuyên nghiệp (Dry Clean)",
          desc: "Hầu hết các sáng tạo thời trang THE SEA từ lụa Silk Mulberry và Cashmere nguyên chất được khuyến nghị chỉ nên giặt hấp tại các tiệm giặt ủi uy tín chuyên đồ hiệu."
        },
        {
          title: "Ủi nhiệt độ thấp có lớp lót",
          desc: "Luôn ủi ở mặt trái với nhiệt độ dành riêng cho lụa/len, hoặc sử dụng bàn ủi hơi nước cầm tay cách bề mặt vải 10cm."
        },
        {
          title: "Cất giữ len đúng cách",
          desc: "Áo len Cashmere nên được gấp gọn gàng thay vì treo móc để tránh làm dão sợi và biến dạng vai áo. Dùng hạt gỗ tuyết tùng tự nhiên để chống côn trùng."
        }
      ]
    },
    jewelry: {
      title: "Chăm sóc Trang Sức Tinh Xảo & Đồng Hồ",
      subtitle: "Bảo tồn độ rạng rỡ của vàng, kim cương và bộ máy cơ khí chính xác theo chuẩn Thụy Sĩ.",
      img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1000&q=80",
      tips: [
        {
          title: "Quy tắc 'Đeo sau cùng, Tháo đầu tiên'",
          desc: "Hãy xịt nước hoa, thoa kem dưỡng và tạo kiểu tóc trước khi đeo trang sức. Các hóa chất trong mỹ phẩm có thể làm xỉn màu kim loại quý và ngọc trai."
        },
        {
          title: "Làm sạch định kỳ",
          desc: "Dùng khăn nhung mềm chuyên dụng lau nhẹ bề mặt sau mỗi lần đeo. Không ngâm ngọc trai hoặc đá quý tự nhiên trong dung dịch hóa chất mạnh."
        },
        {
          title: "Bảo dưỡng bộ máy đồng hồ",
          desc: "Đối với đồng hồ cơ tự động THE SEA, khuyến nghị kiểm tra độ chống nước hàng năm và bảo dưỡng tra dầu bộ máy mỗi 3 - 5 năm tại trung tâm dịch vụ được ủy quyền."
        }
      ]
    },
    shoes: {
      title: "Chăm sóc Giày Da Thủ Công",
      subtitle: "Đôi giày hoàn hảo nâng đỡ từng bước chân và khẳng định phong thái quý ông, quý cô thanh lịch.",
      img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1000&q=80",
      tips: [
        {
          title: "Sử dụng đón gót giày (Shoe horn)",
          desc: "Luôn dùng đón gót khi xỏ giày để bảo vệ phần gót cứng cáp không bị gãy hoặc mất phom dáng ban đầu."
        },
        {
          title: "Dùng cây giữ phom gỗ tuyết tùng (Shoe tree)",
          desc: "Cây giữ phom bằng gỗ tuyết tùng tự nhiên giúp hút ẩm mồ hôi và kéo căng các nếp nhăn tự nhiên trên da sau ngày dài sải bước."
        },
        {
          title: "Đảo lịch sử dụng giày",
          desc: "Tránh đi một đôi giày da liên tục hai ngày liên tiếp để da có thời gian thở và khô thoáng hoàn toàn."
        }
      ]
    }
  };

  const current = contentMap[activeTab];

  return (
    <div className="luxury-page">
      <div className="luxury-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80')` }}>
        <div className="luxury-hero-overlay"></div>
        <div className="luxury-hero-content">
          <span className="luxury-hero-tag">Savoir-Faire</span>
          <h1 className="luxury-hero-title">Bảo Quản & Chăm Sóc Sản Phẩm</h1>
          <p className="luxury-hero-desc">
            Hướng dẫn nghệ thuật giữ gìn vẻ đẹp vĩnh cửu cho các tác phẩm chế tác từ Maison THE SEA.
          </p>
          <div className="luxury-breadcrumb">
            <Link to="/homepage">Trang chủ</Link>
            <span>/</span>
            <span>Dịch vụ</span>
            <span>/</span>
            <span>Product Care</span>
          </div>
        </div>
      </div>

      <div className="luxury-container">
        {/* Tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap", marginBottom: "60px" }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              style={{
                background: activeTab === cat.id ? "#111" : "transparent",
                color: activeTab === cat.id ? "#fff" : "#222",
                border: "1px solid #111",
                padding: "12px 28px",
                fontSize: "12px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                cursor: "pointer",
                fontWeight: "500",
                transition: "all 0.3s ease"
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Content Split */}
        <div className="luxury-split-row">
          <div>
            <img src={current.img} alt={current.title} className="luxury-split-img" />
          </div>
          <div className="luxury-split-content">
            <span className="luxury-split-tag">Care Guide</span>
            <h2 className="luxury-split-title">{current.title}</h2>
            <p className="luxury-split-desc">{current.subtitle}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {current.tips.map((tip, idx) => (
                <div key={idx} style={{ paddingLeft: "15px", borderLeft: "2px solid #bfa15f" }}>
                  <h4 style={{ margin: "0 0 6px 0", fontSize: "15px", fontWeight: "600" }}>{tip.title}</h4>
                  <p style={{ margin: 0, fontSize: "13.5px", lineHeight: "1.7", color: "#555" }}>{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Atelier Service Callout */}
        <div className="luxury-highlight-box" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "25px" }}>
          <div style={{ maxWidth: "700px" }}>
            <h3 className="luxury-highlight-title" style={{ fontSize: "18px" }}>Dịch vụ Phục Chế Chuyên Sâu tại Atelier</h3>
            <p className="luxury-highlight-text">
              Nếu sản phẩm của quý khách cần thay thế phụ kiện kim loại, xử lý vết bẩn phức tạp hoặc phục hồi lớp màu da, hãy gửi gắm tác phẩm cho các nghệ nhân bậc thầy của THE SEA.
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <Link to="/services/repairs" className="luxury-btn-dark">Dịch Vụ Sửa Chữa</Link>
            <Link to="/book-appointment" className="luxury-btn-outline">Đặt Hẹn Tư Vấn</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCarePage;
