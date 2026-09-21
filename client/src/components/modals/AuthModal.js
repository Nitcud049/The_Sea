import React, { useState } from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

// --- COMPONENT NỘI DUNG ---
function AuthModalContent({ showLoginModal, setShowLoginModal, setCurrentUser }) {
  const [mode, setMode] = useState('login'); 
  const [step, setStep] = useState(1); 

  const [formData, setFormData] = useState({
    username: '', password: '', name: '', phone: '', address: '', email: '', otp: '', newPassword: ''
  });

  // 1. ĐẶT HOOK GOOGLE Ở TRÊN CÙNG (TRƯỚC LỆNH IF)
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch('http://localhost:5000/api/google-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ access_token: tokenResponse.access_token })
        });
        const data = await res.json();
        
        if (data.success) {
          setCurrentUser(data.user);
          setShowLoginModal(false);
          setFormData({ username: '', password: '', name: '', phone: '', address: '', email: '', otp: '', newPassword: '' });
          setStep(1);
        } else {
          alert("⚠️ " + data.message);
        }
      } catch (error) {
        alert("⚠️ Lỗi kết nối đến máy chủ Backend!");
      }
    },
    onError: () => {
      alert("⚠️ Đăng nhập Google thất bại!");
    }
  });

  // 2. LỆNH IF NẰM DƯỚI CÁC HOOK
  if (!showLoginModal) return null;

  const handleInputChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };
  const resetForm = () => { setFormData({ username: '', password: '', name: '', phone: '', address: '', email: '', otp: '', newPassword: '' }); setStep(1); };

  // --- LOGIC XỬ LÝ API ---
  const handleLogin = () => {
    fetch('http://localhost:5000/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: formData.username, password: formData.password }) })
    .then(res => res.json()).then(data => { if (data.success) { setCurrentUser(data.user); setShowLoginModal(false); resetForm(); } else { alert("⚠️ " + data.message); } }).catch(() => alert("⚠️ Lỗi mạng!"));
  };

  const handleFastLoginStep1 = () => {
    const { email, phone } = formData;
    if (!email || !phone) return alert("⚠️ Vui lòng điền đủ Email và Số điện thoại!");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert("⚠️ Định dạng Email không hợp lệ!");
    alert("⏳ Hệ thống THE SEA đang xác thực Email...");
    fetch('http://localhost:5000/api/send-otp-google', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, phone }) })
    .then(res => res.json()).then(data => { if (data.success) { alert("✨ " + data.message); setStep(2); } else { alert("⚠️ " + data.message); } }).catch(() => alert("⚠️ Lỗi hệ thống!"));
  };

  const handleFastLoginStep2 = () => {
    if (!formData.otp) return alert("⚠️ Vui lòng nhập mã OTP!");
    fetch('http://localhost:5000/api/verify-google', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
    .then(res => res.json()).then(data => { if (data.success) { alert("✨ " + data.message); setCurrentUser(data.user); setShowLoginModal(false); resetForm(); } else { alert("⚠️ " + data.message); } }).catch(() => alert("⚠️ Lỗi xác thực!"));
  };

  const handleRegisterStep1 = () => {
    const { username, email, phone, password, name, address } = formData;
    if (!username || !email || !phone || !password || !name || !address) return alert("⚠️ Vui lòng điền đầy đủ thông tin!");
    alert("⏳ Đang gửi OTP...");
    fetch('http://localhost:5000/api/send-otp-register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, email, phone }) })
    .then(res => res.json()).then(data => { if (data.success) { alert("✨ " + data.message); setStep(2); } else { alert("⚠️ " + data.message); } }).catch(() => alert("⚠️ Lỗi!"));
  };

  const handleRegisterStep2 = () => {
    if (!formData.otp) return alert("⚠️ Vui lòng nhập OTP!");
    fetch('http://localhost:5000/api/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
    .then(res => res.json()).then(data => { if (data.success) { alert("✨ Đăng ký thành công!"); setMode('login'); setStep(1); } else { alert("⚠️ " + data.message); } }).catch(() => alert("⚠️ Lỗi!"));
  };

  const handleForgotStep1 = () => {
    const { username, name, phone } = formData;
    if (!username || !name || !phone) return alert("⚠️ Điền đủ thông tin!");
    alert("⏳ Đang xác thực...");
    fetch('http://localhost:5000/api/send-otp-forgot', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, name, phone }) })
    .then(res => res.json()).then(data => { if (data.success) { alert(data.message); setStep(2); } else { alert("⚠️ " + data.message); } }).catch(() => alert("⚠️ Lỗi!"));
  };

  const handleForgotStep2 = () => {
    const { username, otp, newPassword } = formData;
    if (!otp || !newPassword) return alert("⚠️ Nhập đủ OTP và Mật khẩu mới!");
    fetch('http://localhost:5000/api/reset-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, otp, newPassword }) })
    .then(res => res.json()).then(data => { if (data.success) { alert("✨ Đổi mật khẩu thành công!"); setMode('login'); resetForm(); } else { alert("⚠️ " + data.message); } }).catch(() => alert("⚠️ Lỗi!"));
  };

  return (
    <>
      <style>{`
        @keyframes slideInRightPremium { 0% { transform: translateX(100%); } 100% { transform: translateX(0); } }
        @keyframes fadeInBg { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes fadeInContent { 0% { opacity: 0; transform: translateY(15px); } 100% { opacity: 1; transform: translateY(0); } }
        .lv-sidebar { animation: slideInRightPremium 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .lv-overlay { animation: fadeInBg 0.4s ease forwards; }
        .lv-sidebar::-webkit-scrollbar { width: 6px; }
        .lv-sidebar::-webkit-scrollbar-thumb { background: #d0d0d0; border-radius: 10px; }
        .fade-in-content { animation: fadeInContent 0.35s ease-out forwards; }
        .lv-input:focus { border-color: #1a1a1a !important; }
        .lv-form-container { max-width: 520px; margin: 0 auto; width: 100%; position: relative; }
        .material-input { width: 100%; padding: 12px 10px; font-size: 16px; border: none; border-bottom: 1.5px solid #d0d0d0; outline: none; transition: border-color 0.3s; background: transparent; }
        .material-input:focus { border-bottom: 2px solid #000; }
        .btn-material { background-color: #000; color: #fff; border: none; padding: 10px 24px; font-size: 14px; font-weight: 500; border-radius: 4px; cursor: pointer; transition: background 0.2s; }
        .btn-material:hover { background-color: #333; }
        .back-btn:hover { background-color: #f5f5f5 !important; }
      `}</style>

      <div className="lv-overlay" onClick={() => { setShowLoginModal(false); resetForm(); }} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(3px)', zIndex: 9998 }}></div>

      <div className="lv-sidebar" style={{ position: 'fixed', top: 0, right: 0, width: '50vw', minWidth: '450px', backgroundColor: '#fff', height: '100vh', overflowY: 'auto', padding: '60px 40px', boxShadow: '-10px 0 30px rgba(0,0,0,0.15)', zIndex: 9999, fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
        
        <button onClick={() => { setShowLoginModal(false); resetForm(); }} style={{ position: 'absolute', top: '30px', right: '40px', background: 'none', border: 'none', fontSize: '24px', fontWeight: '300', cursor: 'pointer', color: '#1a1a1a', zIndex: 10 }}>✕</button>

        {mode !== 'login' && (
          <button className="back-btn fade-in-content" onClick={() => { setMode('login'); setStep(1); }} style={{ position: 'absolute', top: '30px', left: '40px', background: 'none', border: 'none', cursor: 'pointer', color: '#1a1a1a', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', transition: 'background 0.2s' }} title="Quay lại Đăng nhập">
            <svg style={{ width: '22px', height: '22px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </button>
        )}

        <div className="lv-form-container">
          <h2 className="fade-in-content" style={{ fontSize: '24px', fontWeight: '400', marginBottom: '50px', color: '#1a1a1a', letterSpacing: '0.5px', textAlign: mode !== 'login' ? 'center' : 'left' }}>
            {mode === 'login' && "Thông tin xác nhận"}
            {mode === 'register' && (step === 1 ? "Tạo tài khoản" : "Xác thực mã bảo mật")}
            {mode === 'forgot' && "Khôi phục mật khẩu"}
            {mode === 'fastlogin' && "Đăng nhập nhanh"}
          </h2>

          {mode === 'login' && (
            <div className="fade-in-content">
              <h3 style={{ fontSize: '18px', fontWeight: '400', marginBottom: '25px', color: '#1a1a1a' }}>Tôi đã có tài khoản</h3>
              
              <button style={btnSocialStyle} onClick={() => { setMode('fastlogin'); setStep(1); }}>
                <svg style={{ width: '20px', height: '20px', marginRight: '12px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                Đăng nhập nhanh không cần mật khẩu
              </button>

              <button style={{...btnSocialStyle, marginTop: '15px'}} onClick={() => loginWithGoogle()}>
                <svg style={{ width: '20px', height: '20px', marginRight: '12px' }} viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Tiếp tục với Google
              </button>

              <div style={{ display: 'flex', alignItems: 'center', margin: '35px 0', color: '#888' }}>
                <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #e5e5e5' }} />
                <span style={{ padding: '0 15px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Hoặc</span>
                <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #e5e5e5' }} />
              </div>

              <div style={inputGroupStyle}><label style={labelStyle}>Tên đăng nhập *</label><input type="text" name="username" value={formData.username} onChange={handleInputChange} className="lv-input" style={inputStyle} /></div>
              <div style={inputGroupStyle}><label style={labelStyle}>Mật khẩu *</label><input type="password" name="password" value={formData.password} onChange={handleInputChange} className="lv-input" style={inputStyle} /></div>
              <div style={{ marginBottom: '35px' }}><span onClick={() => { setMode('forgot'); setStep(1); }} style={linkStyle}>Bạn quên mật khẩu?</span></div>
              <button onClick={handleLogin} style={btnPrimaryStyle}>Đăng nhập</button>

              <div style={{ borderTop: '1px solid #e5e5e5', margin: '50px 0 40px' }}></div>
              <h3 style={{ fontSize: '18px', fontWeight: '400', marginBottom: '20px', color: '#1a1a1a' }}>Tôi không có tài khoản</h3>
              <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.6', marginBottom: '30px' }}>Tận hưởng nhiều lợi ích và trải nghiệm phong phú hơn bằng cách tạo tài khoản cá nhân</p>
              <button onClick={() => { setMode('register'); setStep(1); }} style={btnSecondaryStyle}>Tạo tài khoản MY THE SEA</button>
            </div>
          )}
          
          {mode === 'fastlogin' && step === 1 && (
            <div className="fade-in-content">
              <p style={{ fontSize: '14px', color: '#555', marginBottom: '25px', lineHeight: '1.6', textAlign: 'center' }}>Hệ thống sẽ tự động định danh tài khoản của bạn qua Email.</p>
              <div style={inputGroupStyle}><label style={labelStyle}>Địa chỉ Email *</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} className="lv-input" style={inputStyle} /></div>
              <div style={inputGroupStyle}><label style={labelStyle}>Số điện thoại *</label><input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="lv-input" style={inputStyle} /></div>
              <button onClick={handleFastLoginStep1} style={btnPrimaryStyle}>Tiếp tục</button>
            </div>
          )}

          {mode === 'register' && step === 1 && (
            <div className="fade-in-content">
              <div style={{display: 'flex', gap: '15px'}}><div style={{...inputGroupStyle, flex: 1}}><label style={labelStyle}>Tên đăng nhập *</label><input type="text" name="username" value={formData.username} onChange={handleInputChange} className="lv-input" style={inputStyle} /></div><div style={{...inputGroupStyle, flex: 1}}><label style={labelStyle}>Mật khẩu *</label><input type="password" name="password" value={formData.password} onChange={handleInputChange} className="lv-input" style={inputStyle} /></div></div>
              <div style={inputGroupStyle}><label style={labelStyle}>Họ và tên *</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} className="lv-input" style={inputStyle} /></div>
              <div style={{display: 'flex', gap: '15px'}}><div style={{...inputGroupStyle, flex: 1}}><label style={labelStyle}>Email *</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} className="lv-input" style={inputStyle} /></div><div style={{...inputGroupStyle, flex: 1}}><label style={labelStyle}>Số điện thoại *</label><input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="lv-input" style={inputStyle} /></div></div>
              <div style={inputGroupStyle}><label style={labelStyle}>Địa chỉ *</label><input type="text" name="address" value={formData.address} onChange={handleInputChange} className="lv-input" style={inputStyle} /></div>
              <button onClick={handleRegisterStep1} style={btnPrimaryStyle}>Tạo tài khoản</button>
            </div>
          )}

          {((mode === 'register' && step === 2) || (mode === 'forgot' && step === 2) || (mode === 'fastlogin' && step === 2)) && (
            <div className="fade-in-content">
               <p style={{ fontSize: '14px', color: '#555', marginBottom: '25px', lineHeight: '1.6', textAlign: 'center' }}>Mã xác thực gồm 6 chữ số đã được gửi đến bạn.</p>
               <div style={inputGroupStyle}><label style={labelStyle}>Nhập mã OTP *</label><input type="text" name="otp" value={formData.otp} onChange={handleInputChange} className="lv-input" style={{...inputStyle, letterSpacing: '6px', fontSize: '20px', textAlign: 'center'}} maxLength={6} /></div>
               {mode === 'forgot' && ( <div style={inputGroupStyle}><label style={labelStyle}>Mật khẩu mới *</label><input type="password" name="newPassword" value={formData.newPassword} onChange={handleInputChange} className="lv-input" style={inputStyle} /></div> )}
               <button onClick={mode === 'register' ? handleRegisterStep2 : mode === 'forgot' ? handleForgotStep2 : handleFastLoginStep2} style={btnPrimaryStyle}>Xác nhận</button>
            </div>
          )}

          {mode === 'forgot' && step === 1 && (
            <div className="fade-in-content">
              <p style={{ fontSize: '14px', color: '#555', marginBottom: '25px', lineHeight: '1.6', textAlign: 'center' }}>Vui lòng cung cấp thông tin để chúng tôi định danh tài khoản.</p>
              <div style={inputGroupStyle}><label style={labelStyle}>Tên đăng nhập *</label><input type="text" name="username" value={formData.username} onChange={handleInputChange} className="lv-input" style={inputStyle} /></div>
              <div style={inputGroupStyle}><label style={labelStyle}>Họ và tên *</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} className="lv-input" style={inputStyle} /></div>
              <div style={inputGroupStyle}><label style={labelStyle}>Số điện thoại *</label><input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="lv-input" style={inputStyle} /></div>
              <button onClick={handleForgotStep1} style={btnPrimaryStyle}>Gửi yêu cầu khôi phục</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// --- BỌC COMPONENT BẰNG GOOGLE PROVIDER ---
export default function AuthModal(props) {
  return (
    <GoogleOAuthProvider clientId="45622191916-3bmvsmf8nttndh5vrkd8mjlsoir21usq.apps.googleusercontent.com">
      <AuthModalContent {...props} />
    </GoogleOAuthProvider>
  );
}

// --- HỆ THỐNG STYLE ---
const inputGroupStyle = { marginBottom: '25px' };
const labelStyle = { display: 'block', fontSize: '13px', color: '#1a1a1a', marginBottom: '10px' };
const inputStyle = { width: '100%', padding: '16px 15px', border: '1px solid #d0d0d0', borderRadius: '4px', outline: 'none', fontSize: '15px', boxSizing: 'border-box', transition: 'border-color 0.2s' };
const linkStyle = { fontSize: '14px', color: '#1a1a1a', textDecoration: 'underline', cursor: 'pointer', textUnderlineOffset: '4px' };
const btnSocialStyle = { width: '100%', padding: '16px', backgroundColor: '#fff', color: '#1a1a1a', border: '1px solid #d0d0d0', borderRadius: '30px', fontSize: '15px', cursor: 'pointer', marginBottom: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'background 0.2s' };
const btnPrimaryStyle = { width: '100%', padding: '18px', backgroundColor: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '30px', fontSize: '15px', cursor: 'pointer', fontWeight: '500', transition: 'background 0.2s' };
const btnSecondaryStyle = { width: '100%', padding: '18px', backgroundColor: '#fff', color: '#1a1a1a', border: '1px solid #1a1a1a', borderRadius: '30px', fontSize: '15px', cursor: 'pointer', fontWeight: '500', transition: 'background 0.2s' };