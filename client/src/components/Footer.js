import React from 'react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: "#f9f9f9", padding: "60px 40px", textAlign: "center", borderTop: "1px solid #eaeaea" }}>
            <h2 className="the-sea-logo" style={{ fontSize: "24px", marginBottom: "30px" }}>THE SEA</h2>
            <div style={{ fontSize: "13px", color: "#666", marginBottom: "30px", letterSpacing: "0.5px" }}>
                <p>Dịch vụ khách hàng: nitcud05@gmail.com | +84 877 589 808</p>
                <p>Vận chuyển & Đổi trả | Theo dõi đơn hàng | Vị trí cửa hàng</p>
            </div>
            <div>
                <i className="fa fa-instagram w3-large w3-margin-right" style={{ cursor: "pointer" }}></i>
                <a href="https://www.facebook.com/nguyen.uc.tin.618968" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-facebook w3-large w3-margin-right" style={{ cursor: "pointer" }}></i>
                </a>
                <a href="https://www.instagram.com/nd_tin0409" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-youtube-play w3-large" style={{ cursor: "pointer" }}></i>
                </a>
            </div>
            <p style={{ marginTop: "40px", fontSize: "11px", color: "#999" }}>© 2026 THE SEA. TẤT CẢ QUYỀN ĐƯỢC BẢO LƯU.</p>
        </footer>
    );
};

export default Footer;