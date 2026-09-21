import React, { useState, useEffect } from 'react';

function ProfileModal({ setShowProfileModal, currentUser, setCurrentUser }) {
  // Khởi tạo state lưu trữ dữ liệu form
  const [formData, setFormData] = useState({
    title: 'Khác',
    firstName: '',
    lastName: '',
    phoneType: 'Di động',
    phonePrefix: '+84',
    phoneNumber: '',
    country: 'Việt Nam',
    dobDay: '4',
    dobMonth: 'September',
    dobYear: '2005'
  });

  // Tự động điền thông tin có sẵn từ currentUser khi mở Modal
  useEffect(() => {
    if (currentUser) {
      // Tách họ và tên từ trường name (nếu có)
      const nameParts = currentUser.name ? currentUser.name.trim().split(' ') : [];
      const firstName = nameParts.length > 0 ? nameParts[nameParts.length - 1] : '';
      const lastName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : '';

      setFormData(prev => ({
        ...prev,
        firstName: currentUser.firstName || firstName || '',
        lastName: currentUser.lastName || lastName || '',
        phoneNumber: currentUser.phone || '',
      }));
    }
  }, [currentUser]);

  const handleClose = () => {
    setShowProfileModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Hàm xử lý gửi dữ liệu lên Backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isMissingInfo) {
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc (*)');
      return;
    }

    if (!currentUser || !currentUser._id) {
      alert('Lỗi: Không tìm thấy ID người dùng!');
      return;
    }

    try {
      // 1. Lắp ráp dữ liệu từ form 
      const updateData = {
        title: formData.title,
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.lastName} ${formData.firstName}`.trim(), // Ghép lại thành 'name' để lưu vào CSDL
        phone: formData.phoneNumber,
        dob: `${formData.dobYear}-${formData.dobMonth}-${formData.dobDay}`,
        country: formData.country
      };

      // 2. Gửi request lên Backend
      const response = await fetch(`http://127.0.0.1:5000/api/users/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        throw new Error('Lỗi khi cập nhật thông tin');
      }

      // Backend trả về thông tin user mới nhất
      const updatedUser = await response.json();

      // 3. Thông báo thành công và cập nhật UI
      alert('Đã cập nhật thông tin cá nhân thành công!');
      
      // Cập nhật lại state user ở App.js để tên/sđt trên Header thay đổi theo
      if (setCurrentUser) {
        setCurrentUser(updatedUser.user || updatedUser); // Phụ thuộc vào cách backend bạn trả về data
      }
      
      // Đóng modal
      setShowProfileModal(false);

    } catch (error) {
      console.error('Lỗi cập nhật:', error);
      alert('Không thể lưu thông tin lúc này. Vui lòng kiểm tra lại Backend (route PUT /api/users/:id).');
    }
  };

  // Xác định phương thức đăng nhập
  const isGoogleLogin = currentUser?.googleId || (currentUser?.email && !currentUser?.password); 
  const loginMethodText = isGoogleLogin 
    ? `Google: ${currentUser?.email}` 
    : `Thành viên: ${currentUser?.name || currentUser?.username}`;

  // Kiểm tra thiếu thông tin (số điện thoại hoặc ngày sinh)
  const isMissingInfo = !formData.phoneNumber || !formData.dobDay || !formData.firstName;

  // --- STYLES ---
  const overlayStyle = {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1999,
    transition: 'opacity 0.3s ease'
  };

  const modalStyle = {
    position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: '450px', height: '100vh',
    backgroundColor: '#ffffff', zIndex: 2000, overflowY: 'auto',
    padding: '30px 40px', boxShadow: '-5px 0 15px rgba(0,0,0,0.1)',
    display: 'flex', flexDirection: 'column', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
  };

  const labelStyle = { display: 'block', fontSize: '12px', marginBottom: '8px', color: '#1a1a1a' };
  const inputStyle = {
    width: '100%', padding: '12px 15px', marginBottom: '20px', border: '1px solid #d9d9d9',
    borderRadius: '4px', fontSize: '14px', outline: 'none', backgroundColor: '#fff'
  };
  const rowStyle = { display: 'flex', gap: '15px', marginBottom: '20px' };

  return (
    <>
      <div style={overlayStyle} onClick={handleClose}></div>

      <div style={modalStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '400', margin: 0 }}>Thông tin cá nhân</h2>
          <button onClick={handleClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#666' }}>&times;</button>
        </div>

        <p style={{ fontSize: '13px', color: '#666', marginTop: 0, marginBottom: '20px', fontStyle: 'italic' }}>
          Đang đăng nhập bằng {loginMethodText}
        </p>

        {isMissingInfo && (
          <div style={{ backgroundColor: '#fff1f0', border: '1px solid #ffa39e', padding: '10px 15px', borderRadius: '4px', marginBottom: '20px' }}>
            <p style={{ margin: 0, fontSize: '13px', color: '#cf1322' }}>
              * Vui lòng bổ sung các thông tin còn thiếu để chúng tôi có thể hỗ trợ bạn tốt nhất.
            </p>
          </div>
        )}

        <p style={{ fontSize: '12px', textAlign: 'right', marginTop: 0, color: '#666' }}>Thông tin bắt buộc *</p>

        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Tiêu đề *</label>
          <select name="title" value={formData.title} onChange={handleChange} style={inputStyle}>
            <option value="Khác">Khác</option>
            <option value="Ông">Ông</option>
            <option value="Bà">Bà</option>
          </select>

          <label style={labelStyle}>Tên *</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} style={inputStyle} required />

          <label style={labelStyle}>Họ *</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} style={inputStyle} required />

          <label style={{...labelStyle, textTransform: 'uppercase'}}>Số điện thoại *</label>
          <select name="phoneType" value={formData.phoneType} onChange={handleChange} style={inputStyle}>
            <option value="Di động">Di động</option>
            <option value="Cố định">Cố định</option>
          </select>

          <div style={rowStyle}>
            <select name="phonePrefix" value={formData.phonePrefix} onChange={handleChange} style={{ ...inputStyle, width: '35%', marginBottom: 0 }}>
              <option value="+84">+84</option>
              <option value="+1">+1</option>
            </select>
            <input 
              type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} 
              style={{ ...inputStyle, width: '65%', marginBottom: 0 }} 
              placeholder="Nhập số điện thoại" required
            />
          </div>

          <label style={{...labelStyle, marginTop: '20px'}}>Quốc gia/Khu vực và vùng lãnh thổ *</label>
          <select name="country" value={formData.country} onChange={handleChange} style={inputStyle}>
            <option value="Việt Nam">Việt Nam</option>
            <option value="Mỹ">Mỹ</option>
          </select>

          <label style={{...labelStyle, textTransform: 'uppercase'}}>Ngày sinh *</label>
          <div style={rowStyle}>
            <select name="dobDay" value={formData.dobDay} onChange={handleChange} style={{ ...inputStyle, width: '25%', marginBottom: 0 }} required>
              <option value="">Ngày</option>
              {Array.from({ length: 31 }, (_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
            </select>
            <select name="dobMonth" value={formData.dobMonth} onChange={handleChange} style={{ ...inputStyle, width: '45%', marginBottom: 0 }} required>
              <option value="">Tháng</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
            <select name="dobYear" value={formData.dobYear} onChange={handleChange} style={{ ...inputStyle, width: '30%', marginBottom: 0 }} required>
              <option value="">Năm</option>
              {Array.from({ length: 100 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return <option key={year} value={year}>{year}</option>
              })}
            </select>
          </div>

          <button 
            type="submit" 
            style={{
              width: '100%', padding: '16px', backgroundColor: '#000', color: '#fff',
              border: 'none', borderRadius: '30px', fontSize: '14px', fontWeight: 'bold',
              cursor: 'pointer', marginTop: '30px', transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#333'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#000'}
          >
            Lưu thông tin của bạn
          </button>
        </form>
      </div>
    </>
  );
}

export default ProfileModal;