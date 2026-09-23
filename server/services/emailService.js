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

// =========================================================================
// HÀM MỚI: Gửi email thông báo Đặt lịch hẹn ở cửa hàng
// =========================================================================
const sendAppointmentEmail = async (appointmentData) => {
    const { 
        location,          // Địa điểm / Cửa hàng
        appointmentDate,   // Ngày & Giờ đã chọn (VD: Thứ 5, 24 Tháng 9 2026, 14:00)
        firstName,         // Tên
        lastName,          // Họ
        email,             // Email khách hàng
        country,           // Quốc gia
        phoneType,         // Loại điện thoại
        phoneCode,         // Mã quốc gia (+84)
        phoneNumber        // Số điện thoại
    } = appointmentData;

    const mailOptions = {
        from: '"THE SEA SHOP" <vietnam.contact.thesea@gmail.com>',
        to: 'vietnam.contact.thesea@gmail.com', // Gửi về mail hệ thống
        replyTo: email, // Cho phép Admin bấm Reply để trao đổi trực tiếp với khách
        subject: `[YÊU CẦU ĐẶT LỊCH HẸN MỚI] - ${lastName} ${firstName} (${appointmentDate})`,
        html: `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #e0e0e0; background-color: #ffffff; padding: 30px;">
                <!-- Header -->
                <div style="text-align: center; border-bottom: 2px solid #231F20; padding-bottom: 20px; margin-bottom: 25px;">
                    <h1 style="font-size: 24px; font-weight: 600; color: #231F20; letter-spacing: 2px; margin: 0;">THE SEA SHOP</h1>
                    <p style="font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px; margin-top: 5px;">Thông báo yêu cầu đặt lịch hẹn mới</p>
                </div>

                <!-- Phần 1: Chi tiết cuộc hẹn -->
                <div style="margin-bottom: 25px;">
                    <h3 style="font-size: 14px; text-transform: uppercase; color: #231F20; background-color: #f8f8f8; padding: 10px 15px; margin-top: 0; border-left: 3px solid #231F20; letter-spacing: 0.5px;">
                        1. Chi tiết cuộc hẹn
                    </h3>
                    <table style="width: 100%; font-size: 14px; color: #333; border-collapse: collapse; margin-left: 10px;">
                        <tr>
                            <td style="padding: 8px 0; width: 140px; color: #777;"><strong>Địa điểm:</strong></td>
                            <td style="padding: 8px 0; font-weight: 500;">${location || 'Chưa chọn địa điểm'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #777;"><strong>Thời gian hẹn:</strong></td>
                            <td style="padding: 8px 0; font-weight: bold; color: #d9534f;">${appointmentDate || 'Chưa chọn thời gian'}</td>
                        </tr>
                    </table>
                </div>

                <!-- Phần 2: Thông tin khách hàng -->
                <div style="margin-bottom: 25px;">
                    <h3 style="font-size: 14px; text-transform: uppercase; color: #231F20; background-color: #f8f8f8; padding: 10px 15px; margin-top: 0; border-left: 3px solid #231F20; letter-spacing: 0.5px;">
                        2. Thông tin khách hàng
                    </h3>
                    <table style="width: 100%; font-size: 14px; color: #333; border-collapse: collapse; margin-left: 10px;">
                        <tr>
                            <td style="padding: 8px 0; width: 140px; color: #777;"><strong>Họ và tên:</strong></td>
                            <td style="padding: 8px 0; font-weight: 500;">${lastName} ${firstName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #777;"><strong>Email:</strong></td>
                            <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #231F20; text-decoration: underline;">${email}</a></td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #777;"><strong>Số điện thoại:</strong></td>
                            <td style="padding: 8px 0;">${phoneCode || '+84'} ${phoneNumber} <span style="color: #888; font-size: 12px;">(${phoneType || 'Điện thoại di động'})</span></td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #777;"><strong>Quốc gia/Khu vực:</strong></td>
                            <td style="padding: 8px 0;">${country || 'Viet Nam'}</td>
                        </tr>
                    </table>
                </div>

                <!-- Footer -->
                <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; font-size: 12px; color: #888; text-align: center; line-height: 1.5;">
                    <p style="margin: 0;">Email này được hệ thống gửi tự động khi có khách hàng hoàn tất form "Đặt lịch hẹn ở cửa hàng".</p>
                    <p style="margin: 5px 0 0 0;">Bạn có thể nhấn nút <strong>Trả lời (Reply)</strong> để phản hồi trực tiếp tới email của khách hàng.</p>
                </div>
            </div>
        `
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { 
    transporter, 
    sendOtpEmail, 
    sendContactEmail, 
    sendAppointmentEmail 
};