const nodemailer = require('nodemailer');
const User = require('../models/User');
const Otp = require('../models/Otp');
const Product = require('../models/Product');

// ==========================================
// CẤU HÌNH NODE MAILER (GỬI EMAIL TỰ ĐỘNG)
// ==========================================
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vietnam.contact.thesea@gmail.com',
        pass: 'ytnkjvhqugmsaqat'
    }
});

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

const googleLogin = async (req, res) => {
  try {
    const { access_token } = req.body;
    if (!access_token) return res.status(400).json({ success: false, message: "Thiếu Token Google!" });

    const googleResponse = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const googleUser = await googleResponse.json();

    if (!googleUser.email) {
      return res.status(400).json({ success: false, message: "Xác thực Google thất bại!" });
    }

    let user = await User.findOne({ 
      $or: [{ email: googleUser.email }, { username: googleUser.email }] 
    });

    if (!user) {
      user = new User({
        username: googleUser.email,         
        email: googleUser.email,            
        name: googleUser.name || "Người dùng Google",
        password: "GOOGLE_LOGIN_" + Date.now(), 
        phone: "GOOGLE_" + Date.now(),
        address: "Chưa cập nhật"
      });
      await user.save();
    }

    res.json({ success: true, user: user, message: "Đăng nhập Google thành công!" });

  } catch (error) {
    console.error("🔥 Lỗi Google Login:", error);
    res.status(500).json({ success: false, message: "Lỗi kết nối dịch vụ Google!" });
  }
};

const sendOtpGoogle = async (req, res) => {
    try {
        const { email, phone } = req.body;
        if (!email || !phone) return res.status(400).json({ success: false, message: "Vui lòng nhập Email và Số điện thoại!" });

        const cleanEmail = String(email).trim();
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        await Otp.deleteMany({ email: cleanEmail });
        await new Otp({ email: cleanEmail, otp: otpCode }).save();

        await sendOtpEmail(cleanEmail, otpCode, "Đăng nhập nhanh");
        res.status(200).json({ success: true, message: "Mã OTP đã được gửi đến Gmail của bạn!" });
    } catch (err) { 
        console.error("🔥 Lỗi /send-otp-google:", err);
        res.status(500).json({ success: false, message: err.message }); 
    }
};

const verifyGoogle = async (req, res) => {
    try {
        const { email, phone, otp } = req.body;
        if (!email || !otp) return res.status(400).json({ success: false, message: "Vui lòng nhập đầy đủ thông tin!" });

        const cleanEmail = String(email).trim();
        const cleanPhone = phone ? String(phone).trim() : '';
        const cleanOtp = String(otp).trim();

        const validOtp = await Otp.findOne({ email: cleanEmail, otp: cleanOtp });
        if (!validOtp) return res.status(400).json({ success: false, message: "Mã OTP không chính xác hoặc đã hết hạn!" });

        let user = await User.findOne({ email: cleanEmail });
        
        if (!user) {
            const baseUsername = cleanEmail.split('@')[0];
            const randomSuffix = Math.floor(1000 + Math.random() * 9000);
            
            user = new User({ 
                username: `${baseUsername}${randomSuffix}`, 
                password: 'GOOGLE_LOGIN_NO_PASSWORD', 
                name: baseUsername, 
                phone: cleanPhone, 
                address: 'Chưa cập nhật', 
                email: cleanEmail 
            });
            await user.save();
        }

        await Otp.deleteMany({ email: cleanEmail });
        res.status(200).json({ success: true, message: "Đăng nhập thành công!", user });
    } catch (err) { 
        console.error("🔥 Lỗi /verify-google:", err);
        res.status(500).json({ success: false, message: err.message }); 
    }
};

const sendOtpRegister = async (req, res) => {
    try {
        const { username, email, phone } = req.body;
        if (!username || !email || !phone) return res.status(400).json({ success: false, message: "Vui lòng điền đủ Tên đăng nhập, Email và Số điện thoại!" });
        
        const cleanUsername = String(username).trim();
        const cleanEmail = String(email).trim();
        const cleanPhone = String(phone).trim();

        if (await User.findOne({ username: cleanUsername })) return res.status(400).json({ success: false, message: "Tên đăng nhập này đã tồn tại!" });
        if (await User.findOne({ email: cleanEmail })) return res.status(400).json({ success: false, message: "Email này đã được sử dụng!" });
        if (await User.findOne({ phone: cleanPhone })) return res.status(400).json({ success: false, message: "Số điện thoại này đã được sử dụng!" });
        
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        await Otp.deleteMany({ email: cleanEmail }); 
        await new Otp({ email: cleanEmail, otp: otpCode }).save();
        
        await sendOtpEmail(cleanEmail, otpCode, "Đăng ký tài khoản");
        res.status(200).json({ success: true, message: "Mã OTP đã được gửi đến Email của bạn!" });
    } catch (err) { 
        console.error("🔥 Lỗi /send-otp-register:", err);
        res.status(500).json({ success: false, message: err.message }); 
    }
};

const register = async (req, res) => {
    try {
        const { username, password, name, phone, address, email, otp } = req.body;

        if (!username || !password || !email || !otp) {
            return res.status(400).json({ success: false, message: "Vui lòng điền đầy đủ Tên đăng nhập, Mật khẩu, Email và Mã OTP!" });
        }

        const cleanEmail = String(email).trim();
        const cleanOtp = String(otp).trim();

        const validOtp = await Otp.findOne({ email: cleanEmail, otp: cleanOtp });
        if (!validOtp) {
            return res.status(400).json({ success: false, message: "Mã OTP không chính xác hoặc đã hết hạn!" });
        }

        const newUser = new User({ 
            username: String(username).trim(), 
            password, 
            name: name ? String(name).trim() : String(username).trim(), 
            phone: phone ? String(phone).trim() : '', 
            address: address ? String(address).trim() : '', 
            email: cleanEmail 
        });

        await newUser.save(); 
        await Otp.deleteMany({ email: cleanEmail });

        return res.status(201).json({ success: true, message: "Đăng ký tài khoản thành công!", user: newUser });

    } catch (err) { 
        console.error("🔥 Lỗi /register:", err); 
        return res.status(500).json({ success: false, message: err.message }); 
    }
};

const sendOtpForgot = async (req, res) => {
    try {
        const { username, name, phone } = req.body;
        const user = await User.findOne({ username: String(username).trim(), name: String(name).trim(), phone: String(phone).trim() });
        if (!user) return res.status(400).json({ success: false, message: "Thông tin khách hàng không khớp với bất kỳ tài khoản nào!" });
        
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        await Otp.deleteMany({ email: user.email }); 
        await new Otp({ email: user.email, otp: otpCode }).save();
        
        await sendOtpEmail(user.email, otpCode, "Khôi phục mật khẩu");
        res.status(200).json({ success: true, message: "Hệ thống đã gửi mã OTP xác thực!" });
    } catch (err) { 
        console.error("🔥 Lỗi /send-otp-forgot:", err);
        res.status(500).json({ success: false, message: err.message }); 
    }
};

const resetPassword = async (req, res) => {
    try {
        const { username, otp, newPassword } = req.body;
        const user = await User.findOne({ username: String(username).trim() });
        if (!user) return res.status(400).json({ success: false, message: "Tài khoản không tồn tại!" });
        
        const validOtp = await Otp.findOne({ email: user.email, otp: String(otp).trim() });
        if (!validOtp) return res.status(400).json({ success: false, message: "Mã OTP không chính xác hoặc đã hết hạn!" });
        
        user.password = newPassword; 
        await user.save(); 
        await Otp.deleteMany({ email: user.email });
        
        res.status(200).json({ success: true, message: "Cập nhật mật khẩu mới thành công!" });
    } catch (err) { 
        console.error("🔥 Lỗi /reset-password:", err);
        res.status(500).json({ success: false, message: err.message }); 
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username, password: req.body.password });
        if (user) res.status(200).json({ success: true, user });
        else res.status(400).json({ success: false, message: "Sai tài khoản hoặc mật khẩu!" });
    } catch (err) { 
        console.error("🔥 Lỗi /login:", err);
        res.status(500).json({ success: false, message: err.message }); 
    }
};

const getAllUsers = async (req, res) => { 
    try { res.status(200).json(await User.find()); } 
    catch (err) { res.status(500).json({ message: err.message }); } 
};

const updateUser = async (req, res) => { 
    try { await User.findByIdAndUpdate(req.params.id, req.body); res.json({ success: true, message: "Cập nhật người dùng thành công!" }); } 
    catch (err) { res.status(500).json({ message: err.message }); } 
};

const deleteUser = async (req, res) => { 
    try { await User.findByIdAndDelete(req.params.id); res.status(200).json({ success: true }); } 
    catch (err) { res.status(500).json({ message: err.message }); } 
};

const toggleWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findById(req.params.id);
        
        if (!user) return res.status(404).json({ success: false, message: "Không tìm thấy người dùng!" });
        if (!user.wishlist) user.wishlist = [];

        const index = user.wishlist.indexOf(productId);
        
        if (index === -1) {
            user.wishlist.push(productId); 
            await Product.findByIdAndUpdate(productId, { $inc: { likesCount: 1 } });
        } else {
            user.wishlist.splice(index, 1); 
            await Product.findByIdAndUpdate(productId, { $inc: { likesCount: -1 } });
        }
        
        await user.save();
        res.status(200).json({ success: true, wishlist: user.wishlist });
    } catch (err) { 
        console.error("🔥 Lỗi /api/users/:id/wishlist:", err);
        res.status(500).json({ success: false, message: err.message }); 
    }
};

module.exports = {
    googleLogin,
    sendOtpGoogle,
    verifyGoogle,
    sendOtpRegister,
    register,
    sendOtpForgot,
    resetPassword,
    login,
    getAllUsers,
    updateUser,
    deleteUser,
    toggleWishlist
};