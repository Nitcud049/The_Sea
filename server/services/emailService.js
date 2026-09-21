const nodemailer = require('nodemailer');

// Cấu hình Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vietnam.contact.thesea@gmail.com',
        pass: 'ytnkjvhqugmsaqat'
    }
});

// Hàm gửi OTP
const sendOtpEmail = (targetEmail, otpCode, typeName) => {
    const mailOptions = {
        from: '"THE SEA SHOP" <vietnam.contact.thesea@gmail.com>',
        to: targetEmail,
        subject: `[THE SEA] Mã OTP xác thực ${typeName} của bạn`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; max-width: 500px; margin: 0 auto;">
                <h2 style="color: #1a1a1a; text-align: center; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">THE SEA SHOP</h2>
                <p>Chào bạn,</p>
                <p>Bạn nhận được email này vì đang thực hiện thao tác <strong>${typeName}</strong> trên hệ thống của chúng tôi.</p>
                <div style="background: #f4f4f4; padding: 15px; text-align: center; font-size: 26px; font-weight: bold; letter-spacing: 6px; color: #ff4757; margin: 20px 0; border-radius: 4px;">
                    ${otpCode}
                </div>
                <p style="color: #ff4757; font-size: 13px; font-weight: bold;">* Mã OTP này chỉ có hiệu lực trong vòng 3 phút.</p>
            </div>
        `
    };
    return transporter.sendMail(mailOptions);
};

module.exports = { transporter, sendOtpEmail };