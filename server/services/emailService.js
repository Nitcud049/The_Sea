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

// Hàm gửi Email liên hệ từ trang ContactMail
const sendContactEmail = async (formData) => {
    const { title, firstName, lastName, email, country, phoneType, countryCode, phoneNumber, language, topic, message } = formData;

    const mailOptions = {
        from: '"THE SEA SHOP" <vietnam.contact.thesea@gmail.com>',
        to: 'vietnam.contact.thesea@gmail.com', // Admin sẽ nhận email này
        replyTo: email, // Cho phép Admin bấm Reply để trả lời trực tiếp khách hàng
        subject: `[Yêu cầu hỗ trợ mới] Chủ đề: ${topic} - Từ: ${lastName} ${firstName}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px;">
                <h2 style="color: #1a1a1a; border-bottom: 2px solid #000; padding-bottom: 10px;">YÊU CẦU TRỢ GIÚP MỚI TỪ KHÁCH HÀNG</h2>
                <p><strong>Khách hàng:</strong> ${title} ${lastName} ${firstName}</p>
                <p><strong>Email liên hệ:</strong> ${email}</p>
                <p><strong>Số điện thoại:</strong> ${countryCode} ${phoneNumber} (${phoneType})</p>
                <p><strong>Quốc gia:</strong> ${country}</p>
                <p><strong>Ngôn ngữ hỗ trợ:</strong> ${language}</p>
                
                <h3 style="background-color: #f5f5f5; padding: 10px; margin-top: 20px;">Chủ đề: ${topic}</h3>
                <p style="white-space: pre-wrap; color: #444; line-height: 1.6; padding: 10px; border: 1px dashed #ccc;">${message}</p>
                
                <p style="margin-top: 30px; font-size: 12px; color: #888;">
                    *Email này được gửi tự động từ form liên hệ trên website THE SEA SHOP. Bạn có thể bấm "Trả lời" (Reply) để gửi email trực tiếp lại cho khách hàng.
                </p>
            </div>
        `
    };
    return transporter.sendMail(mailOptions);
};

module.exports = { transporter, sendOtpEmail, sendContactEmail };