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
    address: '',
    dobDay: '4',
    dobMonth: 'September',
    dobYear: '2005'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Tự động điền thông tin có sẵn từ currentUser khi mở Modal
  useEffect(() => {
    if (currentUser) {
      // Tách họ và tên từ trường name (nếu có)
      const nameParts = currentUser.name ? currentUser.name.trim().split(' ') : [];
      const firstName = nameParts.length > 0 ? nameParts[nameParts.length - 1] : '';
      const lastName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : '';

      // Tách ngày sinh nếu đã lưu dạng YYYY-Month-DD hoặc YYYY-MM-DD
      let dobDay = '4', dobMonth = 'September', dobYear = '2005';
      if (currentUser.dob) {
        const parts = currentUser.dob.split('-');
        if (parts.length === 3) {
          dobYear = parts[0];
          dobMonth = parts[1];
          dobDay = parts[2];
        }
      }

      setFormData(prev => ({
        ...prev,
        title: currentUser.title || 'Khác',
        firstName: currentUser.firstName || firstName || '',
        lastName: currentUser.lastName || lastName || '',
        phoneNumber: currentUser.phone || '',
        country: currentUser.country || 'Việt Nam',
        address: currentUser.address || '',
        dobDay: currentUser.dobDay || dobDay,
        dobMonth: currentUser.dobMonth || dobMonth,
        dobYear: currentUser.dobYear || dobYear
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

    if (!currentUser || !currentUser._id) {
      alert('⚠️ Lỗi: Không tìm thấy ID người dùng! Vui lòng đăng nhập lại.');
      return;
    }

    if (!formData.firstName.trim()) {
      alert('⚠️ Vui lòng nhập Tên của bạn!');
      return;
    }

    if (!formData.phoneNumber.trim()) {
      alert('⚠️ Vui lòng nhập Số điện thoại liên hệ!');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Lắp ráp dữ liệu từ form 
      const fullName = `${formData.lastName} ${formData.firstName}`.trim() || formData.firstName || currentUser.name || currentUser.username;
      
      const updateData = {
        title: formData.title,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        name: fullName,
        phone: formData.phoneNumber.trim(),
        address: formData.address.trim() || currentUser.address || 'Chưa cập nhật',
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

      const data = await response.json();

      if (response.ok && data.success) {
        // 3. Thông báo thành công và cập nhật UI
        alert('✨ Đã cập nhật thông tin hồ sơ cá nhân thành công!');
        
        // Cập nhật lại state user ở App để tên/sđt hiển thị đúng trên Header
        if (typeof setCurrentUser === 'function') {
          setCurrentUser(prev => ({
            ...prev,
            ...(data.user || updateData)
          }));
        }
        
        // Đóng modal
        setShowProfileModal(false);
      } else {
        alert('⚠️ ' + (data.message || 'Không thể lưu thông tin lúc này.'));
      }

    } catch (error) {
      console.error('Lỗi cập nhật profile:', error);
      alert('⚠️ Lỗi kết nối đến máy chủ Backend. Vui lòng kiểm tra lại kết nối!');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Xác định phương thức đăng nhập
  const isGoogleLogin = currentUser?.googleId || (currentUser?.email && !currentUser?.password); 
  const loginMethodText = isGoogleLogin 
    ? `Google: ${currentUser?.email}` 
    : `Thành viên: ${currentUser?.email || currentUser?.username}`;

  // --- STYLES ---
  const overlayStyle = {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.55)', backdropFilter: 'blur(4px)', zIndex: 1999,
    transition: 'opacity 0.3s ease'
  };

  const modalStyle = {
    position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: '480px', height: '100vh',
    backgroundColor: '#ffffff', zIndex: 2000, overflowY: 'auto',
    padding: '35px 40px', boxShadow: '-10px 0 30px rgba(0,0,0,0.15)',
    display: 'flex', flexDirection: 'column', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    animation: 'slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
  };

  const labelStyle = { display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: '#1a1a1a', letterSpacing: '0.5px' };
  const inputStyle = {
    width: '100%', padding: '12px 15px', marginBottom: '20px', border: '1px solid #d9d9d9',
    borderRadius: '6px', fontSize: '14px', outline: 'none', backgroundColor: '#fff',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
  };
  const rowStyle = { display: 'flex', gap: '15px', marginBottom: '20px' };

  return (
    <>
      <div style={overlayStyle} onClick={handleClose}></div>

      <div style={modalStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '600', margin: 0, letterSpacing: '0.5px' }}>Hồ Sơ Cá Nhân</h2>
          <button 
            onClick={handleClose} 
            style={{ 
              background: '#f3f4f6', border: 'none', borderRadius: '50%', 
              width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px', cursor: 'pointer', color: '#555' 
            }}
          >
            &times;
          </button>
        </div>

        <p style={{ fontSize: '13px', color: '#777', marginTop: 0, marginBottom: '20px' }}>
          Đang đăng nhập bằng: <strong>{loginMethodText}</strong>
        </p>

        <p style={{ fontSize: '12px', textAlign: 'right', marginTop: 0, color: '#999' }}>Thông tin bắt buộc *</p>

        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Danh xưng *</label>
          <select name="title" value={formData.title} onChange={handleChange} style={inputStyle}>
            <option value="Khác">Khác</option>
            <option value="Ông">Ông</option>
            <option value="Bà">Bà</option>
          </select>

          <div style={rowStyle}>
            <div style={{ width: '50%' }}>
              <label style={labelStyle}>Họ</label>
              <input 
                type="text" name="lastName" value={formData.lastName} onChange={handleChange} 
                style={{ ...inputStyle, marginBottom: 0 }} 
                placeholder="Nguyễn"
              />
            </div>
            <div style={{ width: '50%' }}>
              <label style={labelStyle}>Tên *</label>
              <input 
                type="text" name="firstName" value={formData.firstName} onChange={handleChange} 
                style={{ ...inputStyle, marginBottom: 0 }} 
                placeholder="Văn A" required 
              />
            </div>
          </div>

          <label style={{...labelStyle, textTransform: 'uppercase', marginTop: '10px'}}>Số điện thoại *</label>
          <div style={rowStyle}>
            <select name="phonePrefix" value={formData.phonePrefix} onChange={handleChange} style={{ ...inputStyle, width: '35%', marginBottom: 0 }}>
              <option value="+84">+84 (VN)</option>
              <option value="+1">+1 (US)</option>
            </select>
            <input 
              type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} 
              style={{ ...inputStyle, width: '65%', marginBottom: 0 }} 
              placeholder="0912345678" required
            />
          </div>

          <label style={{...labelStyle, marginTop: '10px'}}>Địa chỉ giao hàng mặc định</label>
          <input 
            type="text" name="address" value={formData.address} onChange={handleChange} 
            style={inputStyle} 
            placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
          />

          <label style={labelStyle}>Quốc gia/Khu vực *</label>
          <select name="country" value={formData.country} onChange={handleChange} style={inputStyle}>
            <option value="Việt Nam">Việt Nam</option>
            <option value="Mỹ">Mỹ (United States)</option>
            <option value="Nhật Bản">Nhật Bản</option>
            <option value="Pháp">Pháp</option>
          </select>

          <label style={{...labelStyle, textTransform: 'uppercase'}}>Ngày sinh *</label>
          <div style={rowStyle}>
            <select name="dobDay" value={formData.dobDay} onChange={handleChange} style={{ ...inputStyle, width: '28%', marginBottom: 0 }} required>
              <option value="">Ngày</option>
              {Array.from({ length: 31 }, (_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
            </select>
            <select name="dobMonth" value={formData.dobMonth} onChange={handleChange} style={{ ...inputStyle, width: '42%', marginBottom: 0 }} required>
              <option value="">Tháng</option>
              <option value="January">Tháng 1</option>
              <option value="February">Tháng 2</option>
              <option value="March">Tháng 3</option>
              <option value="April">Tháng 4</option>
              <option value="May">Tháng 5</option>
              <option value="June">Tháng 6</option>
              <option value="July">Tháng 7</option>
              <option value="August">Tháng 8</option>
              <option value="September">Tháng 9</option>
              <option value="October">Tháng 10</option>
              <option value="November">Tháng 11</option>
              <option value="December">Tháng 12</option>
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
            disabled={isSubmitting}
            style={{
              width: '100%', padding: '16px', backgroundColor: '#1a1a1a', color: '#fff',
              border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600',
              cursor: isSubmitting ? 'not-allowed' : 'pointer', marginTop: '25px', 
              transition: 'background-color 0.2s ease, opacity 0.2s ease',
              opacity: isSubmitting ? 0.7 : 1
            }}
            onMouseOver={(e) => { if(!isSubmitting) e.target.style.backgroundColor = '#333'; }}
            onMouseOut={(e) => { if(!isSubmitting) e.target.style.backgroundColor = '#1a1a1a'; }}
          >
            {isSubmitting ? 'Đang lưu thông tin...' : 'Lưu Thông Tin Của Bạn'}
          </button>
        </form>
      </div>
    </>
  );
}

export default ProfileModal;