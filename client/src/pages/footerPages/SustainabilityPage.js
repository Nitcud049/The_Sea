import React from 'react';
import { Link } from 'react-router-dom';
import './footerPages.css';

const SustainabilityPage = () => {
  const commitments = [
    {
      title: "100% Da Thuộc Được Chứng Nhận LWG",
      desc: "Toàn bộ nguồn da sử dụng tại THE SEA đều đến từ các nhà thuộc da đạt chứng chỉ Vàng của Leather Working Group, đảm bảo tiết kiệm nước tối đa và không xả thải hóa chất độc hại ra môi trường.",
      icon: "🌱"
    },
    {
      title: "Bao Bì Không Nhựa & 100% Tái Chế",
      desc: "Hộp quà, túi xách giấy, ruy-băng và lớp bọc lụa của chúng tôi đều đạt chứng nhận FSC rừng bền vững, có khả năng phân hủy sinh học và loại bỏ hoàn toàn nhựa dùng một lần.",
      icon: "📦"
    },
    {
      title: "Mục Tiêu Net-Zero Carbon Vào Năm 2030",
      desc: "Tối ưu hóa chuỗi cung ứng, chuyển đổi 100% năng lượng tại các xưởng Atelier và Boutique sang điện mặt trời và năng lượng tái tạo.",
      icon: "☀️"
    },
    {
      title: "Kinh Tế Tuần Hoàn & Phục Chế Trọn Đời",
      desc: "Kéo dài tuổi thọ của từng sản phẩm thông qua dịch vụ sửa chữa chuyên nghiệp, giảm thiểu rác thải tiêu dùng và thúc đẩy văn hóa sử dụng bền lâu.",
      icon: "🔄"
    }
  ];

  return (
    <div className="luxury-page">
      <div className="luxury-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80')` }}>
        <div className="luxury-hero-overlay"></div>
        <div className="luxury-hero-content">
          <span className="luxury-hero-tag">Ecological Commitment</span>
          <h1 className="luxury-hero-title">Phát Triển Bền Vững</h1>
          <p className="luxury-hero-desc">
            Trách nhiệm bảo vệ thiên nhiên và gìn giữ vẻ đẹp nguyên sơ của đại dương cho các thế hệ mai sau.
          </p>
          <div className="luxury-breadcrumb">
            <Link to="/homepage">Trang chủ</Link>
            <span>/</span>
            <span>About THE SEA</span>
            <span>/</span>
            <span>Sustainability</span>
          </div>
        </div>
      </div>

      <div className="luxury-container">
        {/* Intro Highlight */}
        <div style={{ maxWidth: "800px", margin: "0 auto 80px auto", textAlign: "center" }}>
          <span className="luxury-split-tag">Trách Nhiệm Sinh Thái</span>
          <h2 className="luxury-section-title">Xa Xỉ Đích Thực Phải Đi Đôi Với Sự Bền Vững</h2>
          <p style={{ fontSize: "15px", lineHeight: "1.9", color: "#555" }}>
            Tại THE SEA, chúng tôi định nghĩa lại sự xa xỉ không chỉ nằm ở chất lượng hoàn mỹ của từng đường kim mũi chỉ, mà còn ở cách chúng tôi đối xử với hành tinh này. Từ xưởng thuộc da đến chiếc hộp trao tay khách hàng, mọi mắt xích đều được kiểm soát nghiêm ngặt theo tiêu chuẩn sinh thái cao nhất.
          </p>
        </div>

        {/* 4 Pillars */}
        <div className="luxury-grid-4">
          {commitments.map((item, idx) => (
            <div key={idx} className="luxury-card" style={{ padding: "35px 25px", textAlign: "center" }}>
              <div style={{ fontSize: "38px", marginBottom: "15px" }}>{item.icon}</div>
              <h3 className="luxury-card-title" style={{ fontSize: "17px" }}>{item.title}</h3>
              <p className="luxury-card-text" style={{ fontSize: "13.5px" }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Marine Preservation Spotlight */}
        <div className="luxury-split-row" style={{ marginTop: "70px" }}>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1000&q=80" 
              alt="Bảo tồn biển và rạn san hô" 
              className="luxury-split-img" 
            />
          </div>
          <div className="luxury-split-content">
            <span className="luxury-split-tag">Chương Trình 'Blue Ocean'</span>
            <h2 className="luxury-split-title">Dành 5% Doanh Thu Cho Dự Án Phục Hồi Biển</h2>
            <p className="luxury-split-desc">
              Thông qua Quỹ Foundation THE SEA, mỗi đơn hàng của quý khách trực tiếp đóng góp vào các dự án trồng lại rạn san hô bị tẩy trắng tại vùng biển nhiệt đới và tài trợ các công nghệ thu gom rác thải nhựa đại dương.
            </p>
            <Link to="/about/foundation" className="luxury-btn-dark">Tìm Hiểu Về Quỹ The Sea</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityPage;
