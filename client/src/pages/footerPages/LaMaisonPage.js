import React from 'react';
import { Link } from 'react-router-dom';
import './footerPages.css';

const LaMaisonPage = () => {
  const milestones = [
    {
      year: "1988",
      title: "Khởi Đầu Tại Bờ Biển",
      desc: "Xưởng chế tác hành lý và túi xách da đầu tiên được thành lập bởi người sáng lập với đam mê cháy bỏng về những chuyến hải trình vượt đại dương."
    },
    {
      year: "2005",
      title: "Khai Trương Flagship Đầu Tiên",
      desc: "Đánh dấu bước ngoặt đưa THE SEA bước vào bản đồ thời trang xa xỉ quốc tế với sự ra đời của dòng túi xách biểu tượng 'The Ocean Wave'."
    },
    {
      year: "2018",
      title: "Đỉnh Cao Kỹ Nghệ Haute Maroquinerie",
      desc: "Mở rộng xưởng Atelier thủ công quy tụ hơn 50 nghệ nhân kỳ cựu sở hữu kỹ thuật khâu tay Saddle-stitch hoàn mỹ."
    },
    {
      year: "2026",
      title: "Kỷ Nguyên Bền Vững & Sáng Tạo Mới",
      desc: "Cam kết 100% nguyên liệu đạt chuẩn sinh thái và phát triển Quỹ Bảo Tồn Biển Foundation THE SEA trên quy mô toàn cầu."
    }
  ];

  return (
    <div className="luxury-page">
      <div className="luxury-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80')` }}>
        <div className="luxury-hero-overlay"></div>
        <div className="luxury-hero-content">
          <span className="luxury-hero-tag">Heritage & Savoir-Faire</span>
          <h1 className="luxury-hero-title">La Maison THE SEA</h1>
          <p className="luxury-hero-desc">
            Hành trình kiến tạo những giá trị vượt thời gian, nơi kỹ nghệ thủ công bậc thầy giao thoa cùng khát vọng khám phá đại dương.
          </p>
          <div className="luxury-breadcrumb">
            <Link to="/homepage">Trang chủ</Link>
            <span>/</span>
            <span>About THE SEA</span>
            <span>/</span>
            <span>La Maison</span>
          </div>
        </div>
      </div>

      <div className="luxury-container">
        {/* Story Section 1 */}
        <div className="luxury-split-row">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1000&q=80" 
              alt="Di sản đồ da The Sea" 
              className="luxury-split-img" 
            />
          </div>
          <div className="luxury-split-content">
            <span className="luxury-split-tag">Triết Lý Sáng Tạo</span>
            <h2 className="luxury-split-title">Đại Dương Là Nguồn Cảm Hứng Bất Tận</h2>
            <p className="luxury-split-desc">
              Từ tiếng sóng vỗ rì rào của bờ biển Normandie đến vẻ huyền bí thẳm sâu của lòng biển cả, THE SEA luôn tìm thấy linh hồn của mình trong nhịp điệu của nước. Chúng tôi tin rằng một món đồ xa xỉ không đơn thuần là một vật phẩm, mà là chứng nhân cho những khoảnh khắc đẹp nhất của cuộc đời.
            </p>
            <p className="luxury-split-desc">
              Mỗi sản phẩm đều mang trong mình những đường cong mềm mại tựa con sóng, kết cấu da bền bỉ có khả năng chống chịu trước thời gian và ánh kim loại ấm áp gợi nhớ ánh hoàng hôn trên mặt biển.
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="luxury-stats-bar">
          <div>
            <div className="luxury-stat-num">35+</div>
            <div className="luxury-stat-label">Năm Di Sản Chế Tác</div>
          </div>
          <div>
            <div className="luxury-stat-num">120+</div>
            <div className="luxury-stat-label">Giờ Chế Tác Mỗi Chiếc Túi</div>
          </div>
          <div>
            <div className="luxury-stat-num">100%</div>
            <div className="luxury-stat-label">Da Thuộc Sinh Thái (LWG)</div>
          </div>
          <div>
            <div className="luxury-stat-num">18</div>
            <div className="luxury-stat-label">Boutique Toàn Cầu</div>
          </div>
        </div>

        {/* Story Section 2: Craftsmanship */}
        <div className="luxury-split-row reversed">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=1000&q=80" 
              alt="Kỹ nghệ khâu tay Atelier" 
              className="luxury-split-img" 
            />
          </div>
          <div className="luxury-split-content">
            <span className="luxury-split-tag">Xưởng Thủ Công Atelier</span>
            <h2 className="luxury-split-title">Kỹ Nghệ Khâu Yên Ngựa Thủ Công</h2>
            <p className="luxury-split-desc">
              Để tạo nên một tác phẩm hoàn hảo, các nghệ nhân của THE SEA mất hàng chục năm rèn luyện kỹ năng khâu hai kim (Saddle-stitch) cùng sợi chỉ sáp lanh nguyên chất. Khác với đường may máy, mỗi mũi khâu thủ công độc lập mang lại độ bền vĩnh cửu: ngay cả khi một mắt chỉ bị đứt, toàn bộ cấu trúc túi vẫn vững chãi như một lời cam kết sắt son về chất lượng.
            </p>
            <Link to="/about/sustainability" className="luxury-btn-outline">Cam Kết Phát Triển Bền Vững</Link>
          </div>
        </div>

        {/* Milestones Timeline */}
        <div style={{ marginTop: "70px", marginBottom: "80px" }}>
          <h2 className="luxury-section-title">Những Cột Mốc Lịch Sử</h2>
          <p className="luxury-section-sub">Từng bước kiến tạo vị thế của Maison THE SEA.</p>

          <div className="luxury-grid-4">
            {milestones.map((item, idx) => (
              <div key={idx} style={{ padding: "30px 20px", background: "#fbfbfa", border: "1px solid #ebe8e2" }}>
                <span style={{ fontSize: "28px", fontFamily: "var(--sea-font-title)", color: "var(--sea-gold)", display: "block", marginBottom: "15px" }}>
                  {item.year}
                </span>
                <h4 style={{ fontSize: "16px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px", margin: 0 }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: "13.5px", lineHeight: "1.7", color: "#666", marginTop: "10px" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaMaisonPage;
