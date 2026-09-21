import React from 'react';

// Giao diện (UI) chỉ nhận dữ liệu thông qua "props" từ file Logic truyền sang
function AuthModalUI({
  showLoginModal, setShowLoginModal, 
  isRegister, setIsRegister,
  username, setUsername,
  password, setPassword,
  name, setName,
  email, setEmail,
  phone, setPhone,
  address, setAddress,
  addressStatus, verifyAddressOnMap,
  handleAuthSubmit
}) {

  if (!showLoginModal) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        
        {/* Nút tắt */}
        <button onClick={() => setShowLoginModal(false)} style={closeBtnStyle}>&times;</button>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ margin: '0 0 10px 0', textTransform: 'uppercase' }}>
            {isRegister ? 'Tạo Tài Khoản' : 'Đăng Nhập'}
          </h2>
        </div>

        {/* Form nhập liệu - Khi Submit sẽ gọi hàm từ file Logic */}
        <form onSubmit={handleAuthSubmit}>
          <div style={inputGroup}>
            <input type="text" placeholder="Tên đăng nhập *" value={username} onChange={(e) => setUsername(e.target.value)} style={inputField} />
          </div>

          <div style={inputGroup}>
            <input type="password" placeholder="Mật khẩu *" value={password} onChange={(e) => setPassword(e.target.value)} style={inputField} />
          </div>

          {isRegister && (
            <>
              <div style={inputGroup}>
                <input type="text" placeholder="Họ và tên *" value={name} onChange={(e) => setName(e.target.value)} style={inputField} />
              </div>
              <div style={inputGroup}>
                <input type="email" placeholder="Email liên hệ *" value={email} onChange={(e) => setEmail(e.target.value)} style={inputField} />
              </div>
              <div style={inputGroup}>
                <input type="text" placeholder="Số điện thoại di động (10 số) *" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputField} />
              </div>
              
              {/* Ô Nhập Địa Chỉ Có Định Vị */}
              <div style={{ ...inputGroup, position: 'relative' }}>
                <input 
                  type="text" 
                  placeholder="Địa chỉ giao hàng (Số nhà, Phường, Tỉnh) *" 
                  value={address} 
                  onChange={(e) => {
                    setAddress(e.target.value);
                    // Lưu ý: hàm cập nhật trạng thái reset được xử lý bên file logic
                  }} 
                  onBlur={verifyAddressOnMap} 
                  style={{ ...inputField, paddingRight: '35px' }} 
                />
                
                <div style={{ position: 'absolute', right: '10px', top: '10px', fontSize: '14px' }}>
                  {addressStatus === 'checking' && <span title="Đang quét bản đồ...">⏳</span>}
                  {addressStatus === 'valid' && <span title="Địa chỉ hợp lệ">✅</span>}
                  {addressStatus === 'invalid' && <span title="Địa chỉ ảo/Không tồn tại">❌</span>}
                </div>
              </div>
            </>
          )}

          <button type="submit" style={submitBtn}>
            {isRegister ? 'Đăng ký' : 'Đăng nhập'}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#666' }}>
            {isRegister ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'}
            <button 
              type="button" 
              onClick={() => setIsRegister(!isRegister)} 
              style={switchBtn}
            >
              {isRegister ? 'Đăng nhập' : 'Tạo tài khoản'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}

// BẠN CÓ THỂ THAY ĐỔI TOÀN BỘ CSS/STYLE Ở ĐÂY MÀ KHÔNG ẢNH HƯỞNG ĐẾN CHỨC NĂNG
const overlayStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 999999, display: 'flex', justifyContent: 'center', alignItems: 'center' };
const modalStyle = { backgroundColor: '#fff', padding: '40px', width: '100%', maxWidth: '400px', position: 'relative', borderRadius: '8px' };
const closeBtnStyle = { position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' };
const inputGroup = { marginBottom: '15px' };
const inputField = { width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' };
const submitBtn = { width: '100%', padding: '14px', backgroundColor: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' };
const switchBtn = { background: 'none', border: 'none', color: '#1a1a1a', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' };

export default AuthModalUI;