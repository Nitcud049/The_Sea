import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function ProfilePage({
  currentUser,
  setCurrentUser,
  handleLogout,
  setShowLoginModal
}) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: 'Khác',
    firstName: '',
    lastName: '',
    phonePrefix: '+84',
    phoneNumber: '',
    country: 'Việt Nam',
    address: '',
    dobDay: '4',
    dobMonth: 'September',
    dobYear: '2005'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const tabs = [
    { id: 'overview', label: 'Tổng quan' },
    { id: 'profile', label: 'Tài khoản của tôi' },
    { id: 'orders', label: 'Đơn hàng của tôi' },
    { id: 'wishlist', label: 'Danh sách yêu thích của tôi' },
    { id: 'appointments', label: 'Cuộc hẹn của tôi' }
  ];

  useEffect(() => {
    if (currentUser) {
      const nameParts = currentUser.name ? currentUser.name.trim().split(' ') : [];
      const firstName = nameParts.length > 0 ? nameParts[nameParts.length - 1] : '';
      const lastName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : '';

      let dobDay = '4', dobMonth = 'September', dobYear = '2005';
      if (currentUser.dob) {
        const parts = currentUser.dob.split('-');
        if (parts.length === 3) {
          dobYear = parts[0];
          dobMonth = parts[1];
          dobDay = parts[2];
        }
      }

      setFormData({
        title: currentUser.title || 'Khác',
        firstName: currentUser.firstName || firstName || '',
        lastName: currentUser.lastName || lastName || '',
        phonePrefix: '+84',
        phoneNumber: currentUser.phone || '',
        country: currentUser.country || 'Việt Nam',
        address: currentUser.address || '',
        dobDay: currentUser.dobDay || dobDay,
        dobMonth: currentUser.dobMonth || dobMonth,
        dobYear: currentUser.dobYear || dobYear
      });
    }
  }, [currentUser]);

  const handleTabClick = (tabId) => {
    if (tabId === 'overview') navigate('/account');
    else if (tabId === 'orders') navigate('/my-orders');
    else if (tabId === 'wishlist') navigate('/wishlist');
    else if (tabId === 'appointments') navigate('/book-appointment');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser || !currentUser._id) {
      alert('⚠️ Vui lòng đăng nhập để cập nhật hồ sơ!');
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
    setSuccessMsg('');

    try {
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

      const response = await fetch(`http://127.0.0.1:5000/api/users/${currentUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMsg('✨ Đã cập nhật thông tin hồ sơ cá nhân thành công!');
        if (typeof setCurrentUser === 'function') {
          setCurrentUser(prev => ({
            ...prev,
            ...(data.user || updateData)
          }));
        }
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        alert('⚠️ ' + (data.message || 'Không thể lưu thông tin lúc này.'));
      }
    } catch (error) {
      console.error('Lỗi cập nhật hồ sơ:', error);
      alert('⚠️ Lỗi kết nối đến máy chủ Backend.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!currentUser) {
    return (
      <div style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 20px 80px',
        backgroundColor: '#fafafa',
        textAlign: 'center',
        fontFamily: "'Jost', sans-serif"
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '500',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: '16px',
          fontFamily: "'Playfair Display', serif"
        }}>
          Tài khoản của tôi
        </h2>
        <p style={{ color: '#666', fontSize: '15px', marginBottom: '32px' }}>
          Vui lòng đăng nhập để xem và quản lý thông tin hồ sơ của bạn.
        </p>
        <button
          onClick={() => setShowLoginModal && setShowLoginModal(true)}
          style={{
            height: '48px',
            padding: '0 40px',
            backgroundColor: '#000000',
            color: '#ffffff',
            borderRadius: '9999px',
            border: 'none',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Đăng nhập ngay
        </button>
      </div>
    );
  }

  const isGoogleLogin = currentUser?.googleId || (currentUser?.email && !currentUser?.password);
  const loginMethodText = isGoogleLogin
    ? `Google: ${currentUser?.email}`
    : `Thành viên: ${currentUser?.email || currentUser?.username}`;

  const displayName = currentUser.name || currentUser.username || currentUser.email?.split('@')[0] || 'Tài khoản';

  const labelStyle = { display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: '#1a1a1a', letterSpacing: '0.4px', textTransform: 'uppercase' };
  const inputStyle = {
    width: '100%', padding: '12px 14px', border: '1px solid #dcdcdc',
    borderRadius: '4px', fontSize: '14px', outline: 'none', backgroundColor: '#ffffff',
    boxSizing: 'border-box', transition: 'border-color 0.2s ease'
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '90vh', color: '#111111', fontFamily: "'Jost', sans-serif" }}>
      {/* 1. TOP TABS MENU */}
      <div style={{
        borderBottom: '1px solid #e5e5e5',
        borderTop: '1px solid #e5e5e5',
        backgroundColor: '#ffffff',
        overflowX: 'auto',
        whiteSpace: 'nowrap'
      }}>
        <div style={{
          display: 'flex',
          maxWidth: '1240px',
          margin: '0 auto',
          minWidth: '720px'
        }}>
          {tabs.map((tab) => {
            const isActive = tab.id === 'profile';
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                style={{
                  flex: 1,
                  padding: '16px 14px',
                  background: 'none',
                  border: 'none',
                  borderRight: '1px solid #e5e5e5',
                  borderBottom: isActive ? '3px solid #000000' : '3px solid transparent',
                  color: isActive ? '#000000' : '#444444',
                  fontSize: '13px',
                  fontWeight: isActive ? '600' : '400',
                  letterSpacing: '0.3px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  backgroundColor: isActive ? '#fafafa' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = '#f7f7f7';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. USER NAME HEADING */}
      <div style={{ textAlign: 'center', padding: '42px 20px 24px' }}>
        <h1 style={{
          fontSize: '26px',
          fontWeight: '500',
          letterSpacing: '0.8px',
          color: '#111111',
          margin: 0
        }}>
          {displayName}
        </h1>
        <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#666' }}>
          Tài khoản của tôi
        </p>
      </div>

      {/* 3. MAIN FORM CONTAINER */}
      <div style={{
        maxWidth: '720px',
        margin: '0 auto',
        padding: '0 24px 60px',
        boxSizing: 'border-box'
      }}>
        <div style={{
          border: '1px solid #e5e5e5',
          backgroundColor: '#ffffff',
          padding: '36px 40px'
        }}>
          {/* Card Header */}
          <div style={{ paddingBottom: '20px', borderBottom: '1px solid #f0f0f0', marginBottom: '28px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '500', margin: 0, color: '#111111' }}>
              Hồ sơ cá nhân
            </h2>
            <div style={{ fontSize: '13px', color: '#666', marginTop: '6px' }}>
              Đang đăng nhập bằng: <strong>{loginMethodText}</strong>
            </div>
          </div>

          {/* Success Banner */}
          {successMsg && (
            <div style={{
              backgroundColor: '#ecfdf5',
              color: '#065f46',
              border: '1px solid #a7f3d0',
              padding: '12px 16px',
              borderRadius: '4px',
              fontSize: '13px',
              marginBottom: '24px'
            }}>
              {successMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Danh xưng */}
            <div style={{ marginBottom: '22px' }}>
              <label style={labelStyle}>Danh xưng *</label>
              <select
                name="title"
                value={formData.title}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="Ông">Ông</option>
                <option value="Bà">Bà</option>
                <option value="Cô">Cô</option>
                <option value="Khác">Khác</option>
              </select>
            </div>

            {/* Họ & Tên */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '22px' }}>
              <div>
                <label style={labelStyle}>Họ</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Nhập họ..."
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Tên *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Nhập tên..."
                  style={inputStyle}
                  required
                />
              </div>
            </div>

            {/* Số điện thoại */}
            <div style={{ marginBottom: '22px' }}>
              <label style={labelStyle}>Số điện thoại *</label>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '12px' }}>
                <select
                  name="phonePrefix"
                  value={formData.phonePrefix}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option value="+84">+84 (VN)</option>
                  <option value="+1">+1 (US)</option>
                  <option value="+33">+33 (FR)</option>
                  <option value="+81">+81 (JP)</option>
                </select>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Nhập số điện thoại..."
                  style={inputStyle}
                  required
                />
              </div>
            </div>

            {/* Địa chỉ */}
            <div style={{ marginBottom: '22px' }}>
              <label style={labelStyle}>Địa chỉ giao hàng mặc định</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Số nhà, đường, phường/xã, quận/huyện..."
                style={inputStyle}
              />
            </div>

            {/* Quốc gia */}
            <div style={{ marginBottom: '22px' }}>
              <label style={labelStyle}>Quốc gia / Khu vực *</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="Việt Nam">Việt Nam</option>
                <option value="Hoa Kỳ">Hoa Kỳ</option>
                <option value="Pháp">Pháp</option>
                <option value="Nhật Bản">Nhật Bản</option>
              </select>
            </div>

            {/* Ngày sinh */}
            <div style={{ marginBottom: '32px' }}>
              <label style={labelStyle}>Ngày sinh *</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <select name="dobDay" value={formData.dobDay} onChange={handleChange} style={inputStyle}>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <select name="dobMonth" value={formData.dobMonth} onChange={handleChange} style={inputStyle}>
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
                <select name="dobYear" value={formData.dobYear} onChange={handleChange} style={inputStyle}>
                  {Array.from({ length: 100 }, (_, i) => 2026 - i).map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                height: '48px',
                backgroundColor: isSubmitting ? '#555555' : '#000000',
                color: '#ffffff',
                border: 'none',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: '500',
                letterSpacing: '0.6px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) e.currentTarget.style.backgroundColor = '#262626';
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) e.currentTarget.style.backgroundColor = '#000000';
              }}
            >
              {isSubmitting ? 'Đang lưu thông tin...' : 'Lưu thông tin hồ sơ'}
            </button>
          </form>
        </div>

        {/* 4. BOTTOM BAR: Điều khoản & Nút Đăng xuất / Lên đầu trang */}
        <div style={{
          marginTop: '60px',
          paddingTop: '24px',
          borderTop: '1px solid #eeeeee',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <Link
              to="/legal/privacy"
              style={{
                color: '#111111',
                fontSize: '13px',
                textDecoration: 'underline',
                letterSpacing: '0.4px'
              }}
            >
              Điều khoản và Điều kiện
            </Link>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <button
              onClick={handleLogout}
              style={{
                height: '42px',
                padding: '0 28px',
                backgroundColor: '#dcdcdc',
                color: '#111111',
                border: '1px solid #999999',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#cecece';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#dcdcdc';
              }}
            >
              Đăng xuất
            </button>

            <button
              onClick={scrollToTop}
              style={{
                height: '42px',
                padding: '0 20px',
                backgroundColor: 'transparent',
                color: '#333333',
                border: '1px solid #999999',
                borderRadius: '9999px',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <span>Quay lại đầu trang</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
