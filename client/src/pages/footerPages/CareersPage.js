import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './footerPages.css';

const CareersPage = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicant, setApplicant] = useState({ name: '', email: '', phone: '', note: '' });
  const [submitted, setSubmitted] = useState(false);

  const jobs = [
    {
      id: 1,
      title: "Senior Client Advisor (Chuyên Viên Tư Vấn Xa Xỉ)",
      dept: "Retail & Client Experience",
      location: "TP. Hồ Chí Minh & Hà Nội",
      type: "Toàn thời gian",
      desc: "Đại diện cho hình ảnh tinh tế của Maison, tư vấn phong cách riêng biệt và xây dựng mối quan hệ gắn kết bền chặt với tệp khách hàng thượng lưu."
    },
    {
      id: 2,
      title: "Master Leather Artisan (Nghệ Nhân Chế Tác Đồ Da)",
      dept: "Atelier & Savoir-Faire",
      location: "Hà Nội",
      type: "Toàn thời gian",
      desc: "Tham gia chế tác các phiên bản Bespoke cao cấp, phục hồi tác phẩm da và thực hiện kỹ thuật dập nhũ kim Hot Stamping theo yêu cầu của khách hàng."
    },
    {
      id: 3,
      title: "Visual Merchandiser (Chuyên Viên Trưng Bày Boutique)",
      dept: "Creative & Brand Image",
      location: "TP. Hồ Chí Minh",
      type: "Toàn thời gian",
      desc: "Thiết kế và thi công hệ thống trưng bày cửa sổ và không gian nội thất theo concept của từng mùa thời trang, đảm bảo tiêu chuẩn hình ảnh Haute Couture."
    },
    {
      id: 4,
      title: "E-Commerce & Digital Experience Specialist",
      dept: "Digital Marketing",
      location: "Trụ sở chính",
      type: "Toàn thời gian",
      desc: "Tối ưu hóa hành trình mua sắm trực tuyến, phát triển ứng dụng di động và nâng tầm trải nghiệm cá nhân hóa cho khách hàng kỹ thuật số."
    }
  ];

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!applicant.name || !applicant.email || !applicant.phone) {
      alert("Vui lòng điền đầy đủ Họ tên, Email và Số điện thoại!");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="luxury-page">
      <div className="luxury-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1600&q=80')` }}>
        <div className="luxury-hero-overlay"></div>
        <div className="luxury-hero-content">
          <span className="luxury-hero-tag">Join The Sea Family</span>
          <h1 className="luxury-hero-title">Cơ Hội Nghề Nghiệp</h1>
          <p className="luxury-hero-desc">
            Khám phá môi trường làm việc truyền cảm hứng, nơi tài năng và niềm đam mê sáng tạo được trân trọng và tỏa sáng.
          </p>
          <div className="luxury-breadcrumb">
            <Link to="/homepage">Trang chủ</Link>
            <span>/</span>
            <span>About THE SEA</span>
            <span>/</span>
            <span>Careers</span>
          </div>
        </div>
      </div>

      <div className="luxury-container">
        {/* Culture statement */}
        <div style={{ maxWidth: "800px", margin: "0 auto 70px auto", textAlign: "center" }}>
          <span className="luxury-split-tag">Văn Hóa Maison</span>
          <h2 className="luxury-section-title">Nuôi Dưỡng Tinh Hoa & Đam Mê</h2>
          <p style={{ fontSize: "15px", lineHeight: "1.9", color: "#555" }}>
            Tại THE SEA, chúng tôi tin rằng mỗi thành viên là một đại sứ mang theo linh hồn của thương hiệu. Chúng tôi cam kết tạo ra môi trường làm việc đa văn hóa, bình đẳng và trao quyền tối đa để mỗi cá nhân phát triển vượt bậc trên con đường sự nghiệp xa xỉ quốc tế.
          </p>
        </div>

        {/* Job Openings List */}
        <div style={{ marginBottom: "80px" }}>
          <h2 className="luxury-section-title">Vị Trí Đang Tuyển Dụng</h2>
          <p className="luxury-section-sub">Gia nhập đội ngũ tài năng của chúng tôi tại các thành phố trọng điểm.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "950px", margin: "0 auto" }}>
            {jobs.map(job => (
              <div 
                key={job.id} 
                style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  padding: "30px", 
                  background: "#fff", 
                  border: "1px solid var(--sea-border)", 
                  flexWrap: "wrap", 
                  gap: "20px",
                  transition: "all 0.3s"
                }}
              >
                <div style={{ maxWidth: "600px" }}>
                  <span style={{ fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--sea-gold)", fontWeight: "600" }}>
                    {job.dept} • {job.location} • {job.type}
                  </span>
                  <h3 style={{ fontFamily: "var(--sea-font-title)", fontSize: "20px", margin: "8px 0 10px 0" }}>
                    {job.title}
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "#666", margin: 0, lineHeight: "1.6" }}>
                    {job.desc}
                  </p>
                </div>
                <div>
                  <button 
                    onClick={() => { setSelectedJob(job); setSubmitted(false); }}
                    className="luxury-btn-dark"
                  >
                    Ứng Tuyển Ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Modal */}
        {selectedJob && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "20px"
          }}>
            <div style={{
              backgroundColor: "#fff",
              maxWidth: "600px",
              width: "100%",
              padding: "40px",
              position: "relative",
              borderRadius: "2px"
            }}>
              <button 
                onClick={() => setSelectedJob(null)}
                style={{ position: "absolute", top: "20px", right: "20px", background: "none", border: "none", fontSize: "22px", cursor: "pointer" }}
              >
                ✕
              </button>

              {!submitted ? (
                <div>
                  <span className="luxury-split-tag">Ứng Tuyển Vị Trí</span>
                  <h2 style={{ fontFamily: "var(--sea-font-title)", fontSize: "22px", margin: "6px 0 20px 0" }}>
                    {selectedJob.title}
                  </h2>

                  <form onSubmit={handleApplySubmit}>
                    <div className="luxury-input-group">
                      <label className="luxury-label">Họ và tên của bạn *</label>
                      <input 
                        type="text" 
                        required 
                        className="luxury-input" 
                        value={applicant.name} 
                        onChange={(e) => setApplicant({...applicant, name: e.target.value})} 
                        placeholder="Nguyễn Văn A" 
                      />
                    </div>
                    <div className="luxury-input-group">
                      <label className="luxury-label">Email liên hệ *</label>
                      <input 
                        type="email" 
                        required 
                        className="luxury-input" 
                        value={applicant.email} 
                        onChange={(e) => setApplicant({...applicant, email: e.target.value})} 
                        placeholder="email@example.com" 
                      />
                    </div>
                    <div className="luxury-input-group">
                      <label className="luxury-label">Số điện thoại *</label>
                      <input 
                        type="tel" 
                        required 
                        className="luxury-input" 
                        value={applicant.phone} 
                        onChange={(e) => setApplicant({...applicant, phone: e.target.value})} 
                        placeholder="+84 90 123 4567" 
                      />
                    </div>
                    <div className="luxury-input-group">
                      <label className="luxury-label">Đôi nét về kinh nghiệm của bạn</label>
                      <textarea 
                        rows="3" 
                        className="luxury-textarea" 
                        value={applicant.note} 
                        onChange={(e) => setApplicant({...applicant, note: e.target.value})} 
                        placeholder="Tóm tắt ngắn gọn kinh nghiệm trong ngành xa xỉ..."
                      ></textarea>
                    </div>

                    <div style={{ marginTop: "25px", display: "flex", gap: "15px" }}>
                      <button type="submit" className="luxury-btn-dark" style={{ flex: 1 }}>
                        Gửi Hồ Sơ Ứng Tuyển
                      </button>
                      <button type="button" onClick={() => setSelectedJob(null)} className="luxury-btn-outline">
                        Hủy
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "30px 10px" }}>
                  <div style={{ fontSize: "48px", marginBottom: "15px" }}>✨</div>
                  <h3 style={{ fontFamily: "var(--sea-font-title)", fontSize: "24px", marginBottom: "10px" }}>Hồ Sơ Đã Được Ghi Nhận</h3>
                  <p style={{ color: "#666", fontSize: "14px", lineHeight: "1.7", marginBottom: "25px" }}>
                    Cảm ơn bạn đã quan tâm đến cơ hội nghề nghiệp tại THE SEA. Bộ phận Tuyển dụng Nhân sự của chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
                  </p>
                  <button onClick={() => setSelectedJob(null)} className="luxury-btn-dark">
                    Hoàn Tất
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareersPage;
