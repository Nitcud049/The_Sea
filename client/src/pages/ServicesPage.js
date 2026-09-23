import React, { useState } from 'react';


export default function StoreAppointment() {
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Form State cho Bước 2
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: 'Viet Nam',
    phoneType: 'Điện thoại di động',
    phoneCode: '+84',
    phoneNumber: ''
  });

  // Hàm xử lý định vị tự động
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Trình duyệt của bạn không hỗ trợ định vị.");
      return;
    }

    // Tạm thời hiển thị chữ "Đang tìm..." trong khi chờ API
    setLocation("Đang lấy vị trí...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Sử dụng Nominatim API (miễn phí) để dịch tọa độ thành địa chỉ
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          
          if (data && data.display_name) {
            setLocation(data.display_name);
          } else {
            setLocation(`${latitude}, ${longitude}`);
          }
        } catch (error) {
          console.error("Lỗi khi chuyển đổi địa chỉ:", error);
          setLocation(`${latitude}, ${longitude}`); // Fallback nếu lỗi mạng
        }
      },
      (error) => {
        console.error("Lỗi lấy vị trí:", error);
        alert("Không thể lấy vị trí. Vui lòng cấp quyền truy cập vị trí trên trình duyệt.");
        setLocation("");
      }
    );
  };

  // Hoàn thành chọn ngày, tự động chuyển sang Bước 2
  const handleConfirmDate = () => {
    setSelectedDate('24 Tháng 9 2026, 14:00'); // Giả lập ngày giờ đã chọn
    setShowDatePicker(false);
    setStep(2); // Kích hoạt Bước 2 trượt ra
  };

  return (
    <div className="appointment-page">
      <h1 className="appointment-title">Đặt lịch hẹn ở cửa hàng</h1>

      <div className="appointment-container">
        {/* ================= BƯỚC 1: CHI TIẾT CUỘC HẸN ================= */}
        <div className="step-card">
          <div className="step-header">
            <span className="step-number">1</span>
            Chi tiết cuộc hẹn
          </div>
          
          <div className="input-group">
            <p style={{ fontSize: '14px', marginBottom: '15px', color: '#666' }}>
              Vui lòng chọn địa điểm, sau đó chọn ngày.
            </p>
            <input 
              type="text" 
              className="text-input" 
              placeholder="Địa chỉ, Cửa hàng, Thành phố" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)}
            />
            <button className="location-btn" onClick={handleGetLocation}>
              📍 Sử dụng vị trí hiện tại của tôi
            </button>
          </div>

          {/* Chỉ hiện khung chọn Ngày khi đã có địa chỉ */}
          {location && (
            <div className="input-group" style={{ marginTop: '20px' }}>
              <label className="input-label">Ngày</label>
              <div className="date-selector-box" onClick={() => setShowDatePicker(true)}>
                {selectedDate ? selectedDate : "Chọn ngày"}
              </div>
            </div>
          )}
        </div>

        {/* ================= BƯỚC 2: THÔNG TIN LIÊN HỆ ================= */}
        <div className={`step-card ${step < 2 ? 'disabled' : ''}`}>
          <div className="step-header">
            <span className="step-number">2</span>
            Thông tin liên hệ
          </div>

          {/* Lớp div này tạo hiệu ứng trượt mượt mà (slide down) */}
          <div className={`step-content ${step === 2 ? 'active' : ''}`}>
            
            <div className="input-group">
              <label className="input-label">Tên*</label>
              <input type="text" className="text-input" />
            </div>

            <div className="input-group">
              <label className="input-label">Họ*</label>
              <input type="text" className="text-input" />
            </div>

            <div className="input-group">
              <label className="input-label">Email*</label>
              <input type="email" className="text-input" placeholder="example@domain.com" />
            </div>

            <div className="input-group">
              <label className="input-label">Quốc gia/Khu vực và vùng lãnh thổ*</label>
              <select className="select-input" value={contactInfo.country} onChange={(e) => setContactInfo({...contactInfo, country: e.target.value})}>
                <option value="Viet Nam">Viet Nam</option>
                <option value="USA">United States</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label" style={{textTransform: 'uppercase'}}>Số điện thoại</label>
              <select className="select-input" style={{marginBottom: '10px'}} value={contactInfo.phoneType} onChange={(e) => setContactInfo({...contactInfo, phoneType: e.target.value})}>
                <option>Điện thoại di động</option>
                <option>Điện thoại bàn</option>
              </select>
              
              <div className="phone-input-group">
                <select className="select-input phone-code" value={contactInfo.phoneCode} onChange={(e) => setContactInfo({...contactInfo, phoneCode: e.target.value})}>
                  <option>+84</option>
                  <option>+1</option>
                </select>
                <input type="text" className="text-input phone-number" placeholder="Nhập số điện thoại" />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ================= MODAL CHỌN NGÀY (TRƯỢT TỪ PHẢI) ================= */}
      <div className={`drawer-overlay ${showDatePicker ? 'open' : ''}`} onClick={() => setShowDatePicker(false)}></div>
      <div className={`date-drawer ${showDatePicker ? 'open' : ''}`}>
        <div className="drawer-header">
          <span style={{ fontSize: '18px' }}>CHỌN NGÀY</span>
          <button className="close-btn" onClick={() => setShowDatePicker(false)}>✕</button>
        </div>
        
        <div className="drawer-body">
          <p style={{marginBottom: '20px', color: '#666'}}>Lịch trống trong 30 ngày tiếp theo.</p>
          
          {/* Giả lập giao diện chọn lịch như ảnh */}
          <div style={{ padding: '20px', border: '1px solid #eee', cursor: 'pointer' }} onClick={() => setSelectedDate('24 Tháng 9 2026')}>
            Thứ 5, 24 Tháng 9 2026
          </div>
        </div>
        
        <button 
          className="confirm-btn active" 
          onClick={handleConfirmDate}
        >
          Chọn
        </button>
      </div>

    </div>
  );
}