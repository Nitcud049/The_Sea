import React, { useState, useMemo } from 'react';
import './StoreAppointment.css';

export default function StoreAppointment() {
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState('');
  
  // Trạng thái cho việc chọn ngày
  const [selectedDateObj, setSelectedDateObj] = useState(null); // Lưu đối tượng Date được chọn trong modal
  const [confirmedDate, setConfirmedDate] = useState(''); // Lưu chuỗi hiển thị ở Bước 1 sau khi bấm Xác nhận
  const [showDatePicker, setShowDatePicker] = useState(false);

  // State thông tin liên hệ (Bước 2)
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: 'Viet Nam',
    phoneType: 'Điện thoại di động',
    phoneCode: '+84',
    phoneNumber: ''
  });

  // State xử lý gửi dữ liệu lên Backend
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const handleInputChange = (field, value) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  // --- HÀM LẤY VỊ TRÍ HIỆN TẠI VÀ ĐỊNH DẠNG ĐỊA CHỈ TIẾNG VIỆT ---
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Trình duyệt không hỗ trợ định vị.");
      return;
    }
    setLocation("Đang định vị địa chỉ...");
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Thêm tham số accept-language=vi để ưu tiên lấy tên địa danh bằng tiếng Việt
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=vi`
          );
          const data = await res.json();

          if (data && data.address) {
            const addr = data.address;

            // Bóc tách từng phần thông tin địa chỉ
            const houseNumber = addr.house_number || addr.amenity || addr.shop || addr.building || '';
            const road = addr.road || addr.street || addr.pedestrian || '';
            const ward = addr.suburb || addr.quarter || addr.neighbourhood || addr.village || addr.ward || '';
            const district = addr.city_district || addr.district || addr.county || addr.town || '';
            const city = addr.city || addr.state || addr.province || 'Hồ Chí Minh';
            const country = addr.country || 'Việt Nam';

            // Ghép Số nhà và Tên đường
            const streetAddress = [houseNumber, road].filter(Boolean).join(' ');

            // Ghép thành chuỗi hoàn chỉnh theo định dạng mong muốn
            const formattedAddress = [
              streetAddress,
              ward,
              district,
              city,
              country
            ].filter(Boolean).join(', ');

            if (formattedAddress) {
              setLocation(formattedAddress);
              return;
            }
          }

          // Fallback nếu không giải mã được chi tiết
          setLocation(data?.display_name || `${latitude}, ${longitude}`);
        } catch (error) {
          console.error("Lỗi định vị địa chỉ:", error);
          alert("Không thể lấy thông tin địa chỉ chi tiết.");
          setLocation("");
        }
      },
      (err) => {
        console.error(err);
        alert("Không thể lấy vị trí. Vui lòng cho phép quyền truy cập vị trí trên trình duyệt.");
        setLocation("");
      }
    );
  };

  // --- LOGIC TẠO LỊCH 30 NGÀY ---
  const calendarData = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const validTimes = [];
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      validTimes.push(d.getTime());
    }

    const start = new Date(today);
    const end = new Date(today);
    end.setDate(today.getDate() + 29);

    let currentMonth = new Date(start.getFullYear(), start.getMonth(), 1);
    const endMonth = new Date(end.getFullYear(), end.getMonth(), 1);

    const months = [];

    while (currentMonth <= endMonth) {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDayIdx = (new Date(year, month, 1).getDay() + 6) % 7;

      const cells = Array(firstDayIdx).fill(null);

      for (let d = 1; d <= daysInMonth; d++) {
        const dateObj = new Date(year, month, d);
        cells.push({
          date: dateObj,
          dayNum: d,
          isValid: validTimes.includes(dateObj.getTime())
        });
      }

      months.push({ year, month, cells });
      currentMonth.setMonth(currentMonth.getMonth() + 1);
    }

    return months;
  }, []);

  const formatDisplayDate = (date) => {
    if (!date) return '';
    const days = ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    return `${days[date.getDay()]}, ${date.getDate()} Tháng ${date.getMonth() + 1} ${date.getFullYear()}`;
  };

  const handleSelectDay = (dayData) => {
    if (dayData && dayData.isValid) {
      setSelectedDateObj(dayData.date);
    }
  };

  const handleConfirmDate = () => {
    if (selectedDateObj) {
      setConfirmedDate(`${formatDisplayDate(selectedDateObj)}, 14:00`); 
      setShowDatePicker(false);
      setStep(2);
    }
  };

  // --- HÀM GỬI EMAIL ĐẶT LỊCH HẸN VỀ BACKEND ---
  const handleSubmitAppointment = async (e) => {
    e.preventDefault();
    setStatusMessage({ type: '', text: '' });

    if (!location || !confirmedDate) {
      setStatusMessage({ type: 'error', text: 'Vui lòng chọn địa điểm và ngày hẹn ở Bước 1!' });
      setStep(1);
      return;
    }

    if (!contactInfo.firstName || !contactInfo.lastName || !contactInfo.email || !contactInfo.phoneNumber) {
      setStatusMessage({ type: 'error', text: 'Vui lòng điền đầy đủ thông tin cá nhân bắt buộc (*).' });
      return;
    }

    setLoading(true);

    const appointmentPayload = {
      location,
      appointmentDate: confirmedDate,
      ...contactInfo
    };

    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentPayload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatusMessage({
          type: 'success',
          text: '🎉 Đặt lịch hẹn thành công! Chúng tôi đã gửi email xác nhận cho bạn.'
        });
        
        // Reset form
        setLocation('');
        setConfirmedDate('');
        setSelectedDateObj(null);
        setContactInfo({
          firstName: '',
          lastName: '',
          email: '',
          country: 'Viet Nam',
          phoneType: 'Điện thoại di động',
          phoneCode: '+84',
          phoneNumber: ''
        });
        setStep(1);
      } else {
        setStatusMessage({
          type: 'error',
          text: `❌ ${data.message || 'Gửi yêu cầu thất bại. Vui lòng thử lại sau.'}`
        });
      }
    } catch (error) {
      console.error('Lỗi khi gửi lịch hẹn:', error);
      setStatusMessage({
        type: 'error',
        text: '❌ Không thể kết nối tới server. Vui lòng kiểm tra lại kết nối mạng.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appointment-page">
      <h1 className="appointment-title">Đặt lịch hẹn ở cửa hàng</h1>

      {/* Hiển thị thông báo trạng thái */}
      {statusMessage.text && (
        <div 
          style={{
            maxWidth: '800px',
            margin: '0 auto 20px auto',
            padding: '15px 20px',
            borderRadius: '4px',
            backgroundColor: statusMessage.type === 'success' ? '#e6ffe6' : '#ffe6e6',
            color: statusMessage.type === 'success' ? '#006600' : '#cc0000',
            border: `1px solid ${statusMessage.type === 'success' ? '#b3ffb3' : '#ffb3b3'}`,
            fontSize: '14px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          {statusMessage.text}
        </div>
      )}

      <div className="appointment-container">
        {/* ================= BƯỚC 1: CHI TIẾT CUỘC HẸN ================= */}
        <div className="step-card">
          <div className="step-header">
            <span className="step-number">1</span>
            Chi tiết cuộc hẹn
          </div>
          
          <div className="input-group">
            <p className="helper-text">Vui lòng chọn địa điểm, sau đó chọn ngày.</p>
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

          {location && (
            <div className="input-group" style={{ marginTop: '20px' }}>
              <label className="input-label">Ngày</label>
              <div className="date-selector-box" onClick={() => setShowDatePicker(true)}>
                {confirmedDate ? confirmedDate : "Chọn ngày"}
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

          <div className={`step-content ${step === 2 ? 'active' : ''}`}>
            <form onSubmit={handleSubmitAppointment}>
              <div className="input-group">
                <label className="input-label">Tên*</label>
                <input 
                  type="text" 
                  className="text-input" 
                  value={contactInfo.firstName} 
                  onChange={(e) => handleInputChange('firstName', e.target.value)} 
                  required
                />
              </div>
              <div className="input-group">
                <label className="input-label">Họ*</label>
                <input 
                  type="text" 
                  className="text-input" 
                  value={contactInfo.lastName} 
                  onChange={(e) => handleInputChange('lastName', e.target.value)} 
                  required
                />
              </div>
              <div className="input-group">
                <label className="input-label">Email*</label>
                <input 
                  type="email" 
                  className="text-input" 
                  placeholder="example@domain.com" 
                  value={contactInfo.email} 
                  onChange={(e) => handleInputChange('email', e.target.value)} 
                  required
                />
              </div>
              <div className="input-group">
                <label className="input-label">Quốc gia/Khu vực và vùng lãnh thổ*</label>
                <select 
                  className="select-input" 
                  value={contactInfo.country} 
                  onChange={(e) => handleInputChange('country', e.target.value)}
                >
                  <option value="Viet Nam">Viet Nam</option>
                  <option value="USA">United States</option>
                </select>
              </div>
              <div className="input-group">
                <label className="input-label" style={{ textTransform: 'uppercase' }}>Số điện thoại*</label>
                <select 
                  className="select-input" 
                  style={{ marginBottom: '10px' }} 
                  value={contactInfo.phoneType} 
                  onChange={(e) => handleInputChange('phoneType', e.target.value)}
                >
                  <option value="Điện thoại di động">Điện thoại di động</option>
                  <option value="Điện thoại bàn">Điện thoại bàn</option>
                </select>
                <div className="phone-input-group">
                  <select 
                    className="select-input phone-code" 
                    value={contactInfo.phoneCode} 
                    onChange={(e) => handleInputChange('phoneCode', e.target.value)}
                  >
                    <option value="+84">+84</option>
                    <option value="+1">+1</option>
                  </select>
                  <input 
                    type="text" 
                    className="text-input phone-number" 
                    placeholder="Nhập số điện thoại" 
                    value={contactInfo.phoneNumber} 
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)} 
                    required
                  />
                </div>
              </div>

              {/* Nút gửi thông tin đặt lịch */}
              <div style={{ marginTop: '30px' }}>
                <button 
                  type="submit" 
                  className="confirm-btn active" 
                  style={{ width: '100%', padding: '15px', textTransform: 'uppercase', cursor: loading ? 'wait' : 'pointer' }}
                  disabled={loading}
                >
                  {loading ? 'ĐANG XỬ LÝ GỬI EMAIL...' : 'XÁC NHẬN ĐẶT LỊCH HẸN'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ================= MODAL LỊCH 30 NGÀY ================= */}
      <div className={`drawer-overlay ${showDatePicker ? 'open' : ''}`} onClick={() => setShowDatePicker(false)}></div>
      <div className={`date-drawer ${showDatePicker ? 'open' : ''}`}>
        <div className="drawer-header">
          <span className="drawer-title">CHỌN NGÀY</span>
          <button className="close-btn" onClick={() => setShowDatePicker(false)}>✕</button>
        </div>
        
        <div className="drawer-body">
          <p className="calendar-subtitle">Lịch trống trong 30 ngày tiếp theo.</p>
          
          <div className="calendar-container">
            {calendarData.map((monthData, index) => (
              <div key={index} className="calendar-month-block">
                <h3 className="calendar-month-title">Tháng {monthData.month + 1} {monthData.year}</h3>
                
                <div className="calendar-grid-header">
                  <span>Thứ 2</span><span>Thứ 3</span><span>Thứ 4</span>
                  <span>Thứ 5</span><span>Thứ 6</span><span>Thứ 7</span><span>CN</span>
                </div>
                
                <div className="calendar-grid">
                  {monthData.cells.map((cell, idx) => {
                    if (!cell) return <div key={idx} className="calendar-day empty"></div>;
                    
                    const isSelected = selectedDateObj && cell.isValid && selectedDateObj.getTime() === cell.date.getTime();
                    
                    return (
                      <div 
                        key={idx} 
                        className={`calendar-day ${cell.isValid ? 'valid' : 'invalid'} ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleSelectDay(cell)}
                      >
                        {cell.isValid ? cell.dayNum : ''} 
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="drawer-footer">
          {!selectedDateObj && (
            <p className="footer-warning">Vui lòng chọn một ngày phù hợp với yêu cầu của bạn.</p>
          )}
          <button 
            className={`confirm-btn ${selectedDateObj ? 'active' : ''}`} 
            onClick={handleConfirmDate}
            disabled={!selectedDateObj}
          >
            Chọn
          </button>
        </div>
      </div>

    </div>
  );
}