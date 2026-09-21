const User = require('../models/User');
const Otp = require('../models/Otp');
const { sendOtpEmail } = require('../services/emailService');

const sendOtpGoogle = async (req, res) => {
    try {
        const { email, phone } = req.body;
        if (!email || !phone) return res.status(400).json({ success: false, message: "Vui lòng nhập Email và Số điện thoại!" });
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        await Otp.deleteMany({ email: String(email).trim() });
        await new Otp({ email: String(email).trim(), otp: otpCode }).save();
        await sendOtpEmail(String(email).trim(), otpCode, "Đăng nhập nhanh");
        res.status(200).json({ success: true, message: "Mã OTP đã được gửi đến Gmail của bạn!" });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

const verifyGoogle = async (req, res) => {
    try {
        const { email, phone, otp } = req.body;
        if (!email || !otp) return res.status(400).json({ success: false, message: "Vui lòng nhập đầy đủ thông tin!" });
        const cleanEmail = String(email).trim(), cleanPhone = phone ? String(phone).trim() : '', cleanOtp = String(otp).trim();
        const validOtp = await Otp.findOne({ email: cleanEmail, otp: cleanOtp });
        if (!validOtp) return res.status(400).json({ success: false, message: "Mã OTP không chính xác hoặc đã hết hạn!" });

        let user = await User.findOne({ email: cleanEmail });
        if (!user) {
            if (await User.findOne({ phone: cleanPhone })) return res.status(400).json({ success: false, message: "Số điện thoại này đã liên kết với tài khoản khác!" });
            const baseUsername = cleanEmail.split('@')[0];
            user = new User({ 
                username: `${baseUsername}${Math.floor(1000 + Math.random() * 9000)}`, 
                password: 'GOOGLE_LOGIN_NO_PASSWORD', name: baseUsername, phone: cleanPhone, address: 'Chưa cập nhật', email: cleanEmail 
            });
            await user.save();
        } else if (user.phone && cleanPhone && user.phone !== cleanPhone) {
            return res.status(400).json({ success: false, message: "Số điện thoại không khớp!" });
        }
        await Otp.deleteMany({ email: cleanEmail });
        res.status(200).json({ success: true, message: "Đăng nhập thành công!", user });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

const sendOtpRegister = async (req, res) => {
    try {
        const { username, email, phone } = req.body;
        if (!username || !email || !phone) return res.status(400).json({ success: false, message: "Vui lòng điền đủ Username, Email và Số điện thoại!" });
        const cleanUsername = String(username).trim(), cleanEmail = String(email).trim(), cleanPhone = String(phone).trim();
        if (await User.findOne({ username: cleanUsername })) return res.status(400).json({ success: false, message: "Tên đăng nhập này đã tồn tại!" });
        if (await User.findOne({ email: cleanEmail })) return res.status(400).json({ success: false, message: "Email này đã được sử dụng!" });
        if (await User.findOne({ phone: cleanPhone })) return res.status(400).json({ success: false, message: "Số điện thoại này đã được sử dụng!" });
        
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        await Otp.deleteMany({ email: cleanEmail }); 
        await new Otp({ email: cleanEmail, otp: otpCode }).save();
        await sendOtpEmail(cleanEmail, otpCode, "Đăng ký tài khoản");
        res.status(200).json({ success: true, message: "Mã OTP đã gửi đến Email!" });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

const register = async (req, res) => {
    try {
        const { username, password, name, phone, address, email, otp } = req.body;
        if (!username || !password || !email || !otp) return res.status(400).json({ success: false, message: "Vui lòng điền đầy đủ thông tin!" });
        const cleanEmail = String(email).trim(), cleanOtp = String(otp).trim(), cleanUsername = String(username).trim();
        const validOtp = await Otp.findOne({ email: cleanEmail, otp: cleanOtp });
        if (!validOtp) return res.status(400).json({ success: false, message: "Mã OTP không chính xác hoặc đã hết hạn!" });

        const newUser = new User({ 
            username: cleanUsername, password, name: name ? String(name).trim() : cleanUsername, 
            phone: phone ? String(phone).trim() : '', address: address ? String(address).trim() : '', email: cleanEmail 
        });
        await newUser.save(); 
        await Otp.deleteMany({ email: cleanEmail });
        res.status(201).json({ success: true, message: "Đăng ký tài khoản thành công!", user: newUser });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

const sendOtpForgot = async (req, res) => {
    try {
        const { username, name, phone } = req.body;
        const user = await User.findOne({ username: String(username).trim(), name: String(name).trim(), phone: String(phone).trim() });
        if (!user) return res.status(400).json({ success: false, message: "Thông tin khách hàng không khớp!" });
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        await Otp.deleteMany({ email: user.email }); 
        await new Otp({ email: user.email, otp: otpCode }).save();
        await sendOtpEmail(user.email, otpCode, "Khôi phục mật khẩu");
        res.status(200).json({ success: true, message: `Hệ thống đã gửi mã OTP xác thực!` });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

const resetPassword = async (req, res) => {
    try {
        const { username, otp, newPassword } = req.body;
        const user = await User.findOne({ username: String(username).trim() });
        if (!user) return res.status(400).json({ success: false, message: "Tài khoản không tồn tại!" });
        const validOtp = await Otp.findOne({ email: user.email, otp: String(otp).trim() });
        if (!validOtp) return res.status(400).json({ success: false, message: "Mã OTP không chính xác!" });
        user.password = newPassword; 
        await user.save(); 
        await Otp.deleteMany({ email: user.email });
        res.status(200).json({ success: true, message: "Cập nhật mật khẩu mới thành công!" });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username, password: req.body.password });
        if (user) res.status(200).json({ success: true, user });
        else res.status(400).json({ success: false, message: "Sai tài khoản hoặc mật khẩu" });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

module.exports = { sendOtpGoogle, verifyGoogle, sendOtpRegister, register, sendOtpForgot, resetPassword, login };