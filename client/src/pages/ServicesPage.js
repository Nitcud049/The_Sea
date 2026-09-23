import React from 'react';
import { Link } from 'react-router-dom';

function ServicesPage() {
  return (
    <div className="services-page-container">
      <style>{`
        /* Reset cơ bản và Font chữ */
        .services-page-container {
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          color: #1a1a1a;
          background-color: #fff;
          width: 100%;
          overflow-x: hidden;
        }

        /* Kiểu dáng chung cho các phần chia 2 cột */
        .split-section {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        @media (min-width: 900px) {
          .split-section {
            flex-direction: row;
            height: 80vh; /* Tương tự video, mỗi section chiếm khoảng 80% màn hình */
            min-height: 600px;
          }
          /* Đảo ngược layout cho section thứ 2 */
          .split-section.reverse {
            flex-direction: row-reverse;
          }
        }

        .split-image {
          flex: 1;
          width: 100%;
          height: 50vh;
        }

        @media (min-width: 900px) {
          .split-image {
            height: 100%;
          }
        }

        .split-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .split-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 60px 20px;
          text-align: center;
        }

        @media (min-width: 900px) {
          .split-content {
            padding: 0 15%;
          }
        }

        .split-title {
          font-size: 24px;
          font-weight: 400;
          margin-bottom: 20px;
          letter-spacing: 0.5px;
        }

        .split-desc {
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 30px;
          color: #4a4a4a;
        }

        /* Nút Link gạch chân đặc trưng của Luxury Brand */
        .underline-link {
          font-size: 13px;
          color: #1a1a1a;
          text-decoration: none;
          padding-bottom: 3px;
          border-bottom: 1px solid #1a1a1a;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .underline-link:hover {
          color: #666;
          border-bottom-color: #666;
        }

        /* Phần Các Dịch vụ đặc trưng (Grid 3 cột) */
        .signature-services {
          padding: 80px 20px;
          text-align: center;
        }

        .signature-header {
          margin-bottom: 60px;
        }

        .signature-title {
          font-size: 24px;
          font-weight: 400;
          margin-bottom: 15px;
        }

        .signature-subtitle {
          font-size: 14px;
          color: #666;
        }

        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          max-width: 1400px;
          margin: 0 auto;
          text-align: left;
        }

        @media (min-width: 768px) {
          .services-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
          }
        }

        .service-card {
          display: flex;
          flex-direction: column;
        }

        .service-card img {
          width: 100%;
          aspect-ratio: 4/3;
          object-fit: cover;
          margin-bottom: 25px;
        }

        .service-card-title {
          font-size: 18px;
          font-weight: 400;
          margin-bottom: 15px;
        }

        .service-card-desc {
          font-size: 14px;
          line-height: 1.6;
          color: #4a4a4a;
          margin-bottom: 25px;
          flex-grow: 1; /* Đẩy link xuống dưới cùng nếu text ngắn dài khác nhau */
        }

        .service-card .underline-link {
          align-self: flex-start;
          text-transform: none; /* Link ở dưới grid không in hoa toàn bộ */
          letter-spacing: 0;
        }
      `}</style>

      {/* SECTION 1: Chuyên viên tư vấn (Ảnh trái, Chữ phải) */}
      <section className="split-section">
        <div className="split-image">
          {/* Ảnh mẫu túi xách đen cao cấp */}
          <img src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1000&q=80" alt="Túi xách cao cấp" />
        </div>
        <div className="split-content">
          <h2 className="split-title">Chuyên viên tư vấn cá nhân của THE SEA</h2>
          <p className="split-desc">
            Tận hưởng dịch vụ tư vấn phong cách dành riêng cho quý khách, nhận hướng dẫn bảo quản và hỗ trợ mua sắm trực tuyến, bao gồm cả dịch vụ đặt hàng và cá nhân hóa sản phẩm.
          </p>
          <Link to="/contact-us" className="underline-link">Liên hệ với chuyên viên tư vấn</Link>
        </div>
      </section>

      {/* SECTION 2: Cuộc hẹn tại cửa hàng (Chữ trái, Ảnh phải - dùng class reverse) */}
      <section className="split-section reverse">
        <div className="split-image">
          {/* Ảnh mẫu cửa hàng */}
          <img src="https://images.unsplash.com/photo-1555529771-835f59fc5efe?w=1000&q=80" alt="Cửa hàng THE SEA" />
        </div>
        <div className="split-content">
          <h2 className="split-title">Cuộc hẹn tại cửa hàng</h2>
          <p className="split-desc">
            Trải nghiệm các bộ sưu tập của Maison với sự hướng dẫn từ chuyên viên tư vấn tại cửa hàng mà quý khách lựa chọn.
          </p>
          <Link to="/book-appointment" className="underline-link">Đặt lịch hẹn</Link>
        </div>
      </section>

      {/* SECTION 3: Các dịch vụ đặc trưng (Grid 3 cột dưới cùng) */}
      <section className="signature-services">
        <div className="signature-header">
          <h2 className="signature-title">Các dịch vụ đặc trưng</h2>
          <p className="signature-subtitle">Khám phá các dịch vụ thể hiện nhiều khía cạnh chuyên môn của Maison.</p>
        </div>

        <div className="services-grid">
          {/* Card 1 */}
          <div className="service-card">
            <img src="https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80" alt="Cá nhân hóa" />
            <h3 className="service-card-title">Cá nhân hóa sản phẩm</h3>
            <p className="service-card-desc">
              Thể hiện dấu ấn riêng bằng cách tạo nên một sản phẩm độc đáo, truyền tải câu chuyện của quý khách với di sản của Maison.
            </p>
            <Link to="/services/personalization" className="underline-link">Khám phá dịch vụ cá nhân hóa</Link>
          </div>

          {/* Card 2 */}
          <div className="service-card">
            <img src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&q=80" alt="Bảo hành" />
            <h3 className="service-card-title">Yêu cầu bảo hành sản phẩm</h3>
            <p className="service-card-desc">
              Với kỹ nghệ chuyên môn lâu đời của THE SEA, quý khách có thể yêu cầu bảo hành sản phẩm và lưu giữ vẻ đẹp theo thời gian.
            </p>
            <Link to="/services/care" className="underline-link">Khám phá dịch vụ</Link>
          </div>

          {/* Card 3 */}
          <div className="service-card">
            <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80" alt="Gói quà" />
            <h3 className="service-card-title">Nghệ thuật gói quà</h3>
            <p className="service-card-desc">
              Khám phá dịch vụ gói quà độc đáo thể hiện chuyên môn tinh tế của THE SEA trong việc chế tác hộp và đóng gói.
            </p>
            <Link to="/services/gifting" className="underline-link">Tìm quà tặng</Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default ServicesPage;