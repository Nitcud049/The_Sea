require('dotenv').config({
    path: require('path').join(__dirname, '../.env')
});

const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');

const User = require('../models/User');
const Otp = require('../models/Otp');
const Product = require('../models/Product');

const text = value =>
    typeof value === 'string' ? value.trim() : '';

const emailOf = value => text(value).toLowerCase();

const fail = (message, status = 400) =>
    Object.assign(new Error(message), { status });

const secret = process.env.JWT_SECRET || '';

if (Buffer.byteLength(secret) < 32) {
    throw new Error(
        'JWT_SECRET phải là chuỗi ngẫu nhiên ít nhất 32 byte trong server/.env'
    );
}

const googleClient = new OAuth2Client();

const mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ==========================================
// XỬ LÝ LỖI CHUNG
// ==========================================

const wrap = fn => async (req, res) => {
    try {
        await fn(req, res);
    } catch (err) {
        const status = err.code === 11000
            ? 409
            : (err.status || 500);

        if (status >= 500) {
            console.error('Lỗi userController:', err.name);
        }

        res.status(status).json({
            success: false,
            message: err.code === 11000
                ? 'Tên đăng nhập hoặc email đã được sử dụng.'
                : status >= 500
                    ? 'Máy chủ chưa xử lý được yêu cầu. Vui lòng thử lại.'
                    : err.message
        });
    }
};

// Không trả mật khẩu về trình duyệt.
const safeUser = user => {
    const data = user.toObject
        ? user.toObject()
        : { ...user };

    delete data.password;
    delete data.__v;

    data.role = data.role === 'admin' ? 'admin' : 'user';

    return data;
};

// ==========================================
// MẬT KHẨU
// ==========================================

const digest = value =>
    crypto.createHash('sha256')
        .update(value)
        .digest('hex');

const mac = value =>
    crypto.createHmac('sha256', secret)
        .update(value)
        .digest('hex');

const passwordVersion = user => mac(String(user.password));

// Băm SHA-256 trước bcrypt để tránh giới hạn độ dài đầu vào bcrypt.
const hashPassword = async password =>
    'bcrypt-sha256$' + await bcrypt.hash(digest(password), 12);

function checkNewPassword(password) {
    if (
        typeof password !== 'string' ||
        password.length < 8 ||
        password.length > 256
    ) {
        throw fail('Mật khẩu phải có từ 8 đến 256 ký tự.');
    }
}

async function passwordMatches(input, stored) {
    if (
        typeof input !== 'string' ||
        typeof stored !== 'string'
    ) {
        return false;
    }

    // Tài khoản tạo bằng Google/OTP không được đăng nhập
    // bằng giá trị mật khẩu nội bộ.
    if (/^GOOGLE_LOGIN_/.test(stored)) {
        return false;
    }

    if (stored.startsWith('bcrypt-sha256$')) {
        return bcrypt.compare(
            digest(input),
            stored.slice('bcrypt-sha256$'.length)
        );
    }

    // Tương thích tài khoản đã dùng bcrypt trước đó.
    if (/^\$2[aby]\$/.test(stored)) {
        return bcrypt.compare(input, stored);
    }

    // Tương thích mật khẩu cũ đang lưu dạng văn bản.
    // Sau khi đăng nhập đúng, login() sẽ chuyển sang dạng băm.
    return crypto.timingSafeEqual(
        Buffer.from(digest(input)),
        Buffer.from(digest(stored))
    );
}

// ==========================================
// TOKEN VÀ QUYỀN TRUY CẬP
// ==========================================

function loginResponse(res, user, message, status = 200) {
    const token = jwt.sign(
        { pv: passwordVersion(user) },
        secret,
        {
            algorithm: 'HS256',
            subject: String(user._id),
            issuer: 'the-sea-api',
            audience: 'the-sea-web',
            expiresIn: '2h'
        }
    );

    res.status(status).json({
        success: true,
        message,
        user: safeUser(user),
        token
    });
}

// Luôn kiểm chứng token và đọc quyền hiện tại từ DB.
async function authenticate(req) {
    const header = req.headers.authorization || '';

    if (!header.startsWith('Bearer ')) {
        throw fail('Vui lòng đăng nhập lại.', 401);
    }

    let payload;

    try {
        payload = jwt.verify(header.slice(7), secret, {
            algorithms: ['HS256'],
            issuer: 'the-sea-api',
            audience: 'the-sea-web'
        });
    } catch {
        throw fail(
            'Phiên đăng nhập không hợp lệ hoặc đã hết hạn.',
            401
        );
    }

    if (!mongoose.isValidObjectId(payload.sub)) {
        throw fail('Phiên đăng nhập không hợp lệ.', 401);
    }

    const user = await User.findById(payload.sub)
        .select('+password');

    // Đổi mật khẩu sẽ làm token cũ không còn hợp lệ.
    if (!user || payload.pv !== passwordVersion(user)) {
        throw fail('Vui lòng đăng nhập lại.', 401);
    }

    req.user = user;
    return user;
}

async function authorize(req, adminOnly = false) {
    const user = await authenticate(req);

    if (adminOnly && user.role !== 'admin') {
        throw fail('Yêu cầu quyền Admin.', 403);
    }

    if (
        !adminOnly &&
        user.role !== 'admin' &&
        String(user._id) !== req.params.id
    ) {
        throw fail(
            'Bạn chỉ được thao tác trên tài khoản của mình.',
            403
        );
    }

    return user;
}

// Có thể sử dụng middleware này trong orderRoutes.
const requireAuth = (req, res, next) => {
    authenticate(req)
        .then(() => next())
        .catch(err => {
            res.status(err.status || 500).json({
                success: false,
                message: err.status
                    ? err.message
                    : 'Lỗi xác thực.'
            });
        });
};

// Luôn đặt sau requireAuth.
const requireAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Yêu cầu quyền Admin.'
        });
    }

    next();
};

// ==========================================
// GIỚI HẠN SỐ LẦN THỬ
// ==========================================

// Giới hạn trong một tiến trình Node.
// Nếu chạy nhiều tiến trình/server, cần kho giới hạn dùng chung.
const limits = new Map();

function throttle(key, maximum, duration) {
    const now = Date.now();

    for (const [k, entry] of limits) {
        if (entry.until <= now) {
            limits.delete(k);
        }
    }

    const entry = limits.get(key) || {
        count: 0,
        until: now + duration
    };

    if (entry.count >= maximum) {
        throw fail(
            'Thao tác quá nhiều lần. Vui lòng thử lại sau.',
            429
        );
    }

    entry.count += 1;
    limits.set(key, entry);
}

function validEmail(value) {
    if (
        !value ||
        value.length > 254 ||
        !/^\S+@\S+\.\S+$/.test(value)
    ) {
        throw fail('Email không hợp lệ.');
    }
}

function validId(id) {
    if (!mongoose.isValidObjectId(id)) {
        throw fail('ID không hợp lệ.');
    }
}

// ==========================================
// GỬI VÀ KIỂM TRA OTP
// ==========================================

// Lưu mã băm kèm mục đích trong trường otp hiện có.
// Không cần thêm trường vào schema Otp ở bước này.
async function issueOtp(req, email, purpose, label) {
    validEmail(email);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw fail('Chưa cấu hình dịch vụ email.', 503);
    }

    throttle('send-ip:' + req.ip, 10, 15 * 60 * 1000);
    throttle('send-email:' + email, 1, 60 * 1000);

    const code = String(crypto.randomInt(100000, 1000000));

    const saved = await Otp.create({
        email,
        otp: mac(`${purpose}:${email}:${code}`)
    });

    try {
        await mailer.sendMail({
            from: `"THE SEA SHOP" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `[THE SEA] Mã OTP ${label}`,
            text:
                `Mã OTP ${label} của bạn là ${code}. ` +
                'Mã có hiệu lực 3 phút và chỉ dùng một lần.'
        });
    } catch {
        await Otp.deleteOne({ _id: saved._id });

        throw fail(
            'Không gửi được email OTP. Vui lòng thử lại.',
            502
        );
    }

    // Sau khi gửi thành công, loại các mã cũ của email này.
    await Otp.deleteMany({
        email,
        _id: { $ne: saved._id },
        createdAt: { $lte: saved.createdAt }
    });
}

async function consumeOtp(req, email, purpose, code) {
    throttle('verify-ip:' + req.ip, 30, 15 * 60 * 1000);
    throttle('verify-email:' + email, 10, 15 * 60 * 1000);

    if (!/^\d{6}$/.test(text(code))) {
        throw fail('Mã OTP phải gồm 6 chữ số.');
    }

    // Kiểm tra hạn ngay trong truy vấn, không chỉ dựa vào TTL.
    // Xóa nguyên tử để một mã không được sử dụng hai lần.
    const record = await Otp.findOneAndDelete({
        email,
        otp: mac(`${purpose}:${email}:${text(code)}`),
        createdAt: {
            $gt: new Date(Date.now() - 180000)
        }
    });

    if (!record) {
        throw fail('Mã OTP không đúng, đã dùng hoặc đã hết hạn.');
    }
}

// ==========================================
// 1. ĐĂNG NHẬP GOOGLE
// ==========================================

const googleLogin = wrap(async (req, res) => {
    throttle('google:' + req.ip, 30, 15 * 60 * 1000);

    const clientId = process.env.GOOGLE_CLIENT_ID;

    if (!clientId) {
        throw fail('Chưa cấu hình GOOGLE_CLIENT_ID.', 503);
    }

    const accessToken = text(req.body.access_token);

    if (!accessToken) {
        throw fail('Thiếu token Google.');
    }

    let profile;

    try {
        const info = await googleClient.getTokenInfo(accessToken);

        if (
            info.aud !== clientId ||
            info.expiry_date <= Date.now()
        ) {
            throw new Error();
        }

        const response = await fetch(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                signal: AbortSignal.timeout(10000)
            }
        );

        if (!response.ok) {
            throw new Error();
        }

        profile = await response.json();

        if (
            profile.email_verified !== true ||
            !profile.sub ||
            !profile.email
        ) {
            throw new Error();
        }
    } catch {
        throw fail('Không xác thực được tài khoản Google.', 401);
    }

    const email = emailOf(profile.email);
    validEmail(email);

    // Email ngoài Gmail/Workspace dùng OTP để xác thực quyền
    // sở hữu email, thay vì tự động liên kết tài khoản.
    if (!email.endsWith('@gmail.com') && !profile.hd) {
        throw fail(
            'Vui lòng dùng chức năng đăng nhập Email + OTP cho email này.',
            401
        );
    }

    let user = await User.findOne({ email })
        .select('+password');

    if (!user) {
        user = await User.create({
            username: email,
            email,
            name: text(profile.name) || 'Người dùng Google',
            password:
                'GOOGLE_LOGIN_' +
                crypto.randomBytes(32).toString('hex'),
            phone: '',
            address: 'Chưa cập nhật',
            role: 'user'
        });
    }

    loginResponse(res, user, 'Đăng nhập Google thành công!');
});

// ==========================================
// 2. GỬI OTP ĐĂNG NHẬP EMAIL
// ==========================================

const sendOtpGoogle = wrap(async (req, res) => {
    const email = emailOf(req.body.email);

    if (!text(req.body.phone)) {
        throw fail('Vui lòng nhập số điện thoại.');
    }

    await issueOtp(req, email, 'login', 'đăng nhập');

    res.json({
        success: true,
        message: 'Mã OTP đã gửi đến email của bạn.'
    });
});

// ==========================================
// 3. XÁC THỰC OTP ĐĂNG NHẬP
// ==========================================

const verifyGoogle = wrap(async (req, res) => {
    const email = emailOf(req.body.email);
    const phone = text(req.body.phone);

    validEmail(email);

    if (!phone) {
        throw fail('Vui lòng nhập số điện thoại.');
    }

    await consumeOtp(req, email, 'login', req.body.otp);

    let user = await User.findOne({ email })
        .select('+password');

    if (!user) {
        if (await User.exists({ phone })) {
            throw fail('Số điện thoại đã được sử dụng.');
        }

        user = await User.create({
            username:
                `${email.split('@')[0]}_` +
                crypto.randomBytes(6).toString('hex'),
            email,
            phone,
            name: email.split('@')[0],
            address: 'Chưa cập nhật',
            role: 'user',
            password:
                'GOOGLE_LOGIN_' +
                crypto.randomBytes(32).toString('hex')
        });
    }

    loginResponse(res, user, 'Đăng nhập thành công!');
});

// ==========================================
// 4. GỬI OTP ĐĂNG KÝ
// ==========================================

const sendOtpRegister = wrap(async (req, res) => {
    const username = text(req.body.username);
    const email = emailOf(req.body.email);
    const phone = text(req.body.phone);

    if (!username || !phone) {
        throw fail('Vui lòng nhập tên đăng nhập và số điện thoại.');
    }

    validEmail(email);

    const exists = await User.exists({
        $or: [{ username }, { email }, { phone }]
    });

    if (exists) {
        throw fail(
            'Tên đăng nhập, email hoặc số điện thoại đã được sử dụng.',
            409
        );
    }

    await issueOtp(req, email, 'register', 'đăng ký');

    res.json({
        success: true,
        message: 'Mã OTP đăng ký đã gửi đến email.'
    });
});

// ==========================================
// 5. ĐĂNG KÝ
// ==========================================

const register = wrap(async (req, res) => {
    const username = text(req.body.username);
    const email = emailOf(req.body.email);
    const phone = text(req.body.phone);

    if (!username || !phone) {
        throw fail('Vui lòng nhập tên đăng nhập và số điện thoại.');
    }

    validEmail(email);
    checkNewPassword(req.body.password);

    const exists = await User.exists({
        $or: [{ username }, { email }, { phone }]
    });

    if (exists) {
        throw fail('Thông tin tài khoản đã được sử dụng.', 409);
    }

    await consumeOtp(req, email, 'register', req.body.otp);

    const user = await User.create({
        username,
        email,
        phone,
        password: await hashPassword(req.body.password),
        name: text(req.body.name) || username,
        address: text(req.body.address),

        // Không nhận role từ req.body.
        role: 'user'
    });

    loginResponse(res, user, 'Đăng ký tài khoản thành công!', 201);
});

// ==========================================
// 6. GỬI OTP QUÊN MẬT KHẨU
// ==========================================

const sendOtpForgot = wrap(async (req, res) => {
    const username = text(req.body.username);
    const name = text(req.body.name);
    const phone = text(req.body.phone);

    if (!username || !name || !phone) {
        throw fail(
            'Vui lòng nhập đủ tên đăng nhập, họ tên và số điện thoại.'
        );
    }

    throttle('forgot:' + req.ip, 10, 15 * 60 * 1000);

    const user = await User.findOne({
        username,
        name,
        phone
    });

    if (user) {
        await issueOtp(
            req,
            user.email,
            'reset',
            'khôi phục mật khẩu'
        );
    }

    res.json({
        success: true,
        message:
            'Nếu thông tin khớp, mã OTP sẽ được gửi đến email tài khoản.'
    });
});

// ==========================================
// 7. ĐẶT LẠI MẬT KHẨU
// ==========================================

const resetPassword = wrap(async (req, res) => {
    const username = text(req.body.username);

    if (!username) {
        throw fail('Vui lòng nhập tên đăng nhập.');
    }

    checkNewPassword(req.body.newPassword);

    const user = await User.findOne({ username })
        .select('+password');

    if (!user) {
        throw fail('Thông tin khôi phục không hợp lệ.');
    }

    await consumeOtp(req, user.email, 'reset', req.body.otp);

    user.password = await hashPassword(req.body.newPassword);

    await user.save();

    res.json({
        success: true,
        message: 'Đã đổi mật khẩu. Vui lòng đăng nhập lại.'
    });
});

// ==========================================
// 8. ĐĂNG NHẬP BẰNG MẬT KHẨU
// ==========================================

const login = wrap(async (req, res) => {
    const username = text(req.body.username);
    const password = req.body.password;

    if (
        !username ||
        typeof password !== 'string' ||
        !password ||
        password.length > 1024
    ) {
        throw fail('Vui lòng nhập tài khoản và mật khẩu hợp lệ.');
    }

    throttle('login-ip:' + req.ip, 30, 15 * 60 * 1000);
    throttle('login-user:' + username, 10, 15 * 60 * 1000);

    let user = await User.findOne({ username })
        .select('+password');

    if (
        !user ||
        !(await passwordMatches(password, user.password))
    ) {
        throw fail('Sai tài khoản hoặc mật khẩu.', 401);
    }

    // Chuyển mật khẩu cũ sang dạng băm sau lần đăng nhập đúng.
    if (!user.password.startsWith('bcrypt-sha256$')) {
        const oldPassword = user.password;

        user = await User.findOneAndUpdate(
            {
                _id: user._id,
                password: oldPassword
            },
            {
                $set: {
                    password: await hashPassword(password)
                }
            },
            {
                new: true,
                runValidators: true
            }
        ).select('+password');

        if (!user) {
            throw fail(
                'Tài khoản vừa thay đổi. Vui lòng đăng nhập lại.',
                409
            );
        }
    }

    loginResponse(res, user, 'Đăng nhập thành công!');
});

// ==========================================
// 9. LẤY DANH SÁCH NGƯỜI DÙNG — ADMIN
// ==========================================

const getAllUsers = wrap(async (req, res) => {
    await authorize(req, true);

    const users = await User.find().select('-password');

    res.json(users.map(safeUser));
});

// ==========================================
// 10. CẬP NHẬT HỒ SƠ
// ==========================================

const updateUser = wrap(async (req, res) => {
    await authorize(req);
    validId(req.params.id);

    const allowed = [
        'name',
        'phone',
        'address',
        'title',
        'firstName',
        'lastName',
        'dob',
        'country'
    ];

    if (
        Object.keys(req.body).some(
            key => !allowed.includes(key)
        )
    ) {
        throw fail(
            'Chỉ được sửa thông tin hồ sơ. ' +
            'Đổi email, mật khẩu và quyền cần luồng riêng.'
        );
    }

    const changes = {};

    for (const key of allowed) {
        if (req.body[key] !== undefined) {
            if (typeof req.body[key] !== 'string') {
                throw fail('Thông tin hồ sơ không hợp lệ.');
            }

            changes[key] = req.body[key].trim();
        }
    }

    if (
        !Object.keys(changes).length ||
        changes.name === ''
    ) {
        throw fail('Thông tin cập nhật không hợp lệ.');
    }

    if (
        changes.phone &&
        await User.exists({
            phone: changes.phone,
            _id: { $ne: req.params.id }
        })
    ) {
        throw fail('Số điện thoại đã được sử dụng.', 409);
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: changes },
        {
            new: true,
            runValidators: true
        }
    );

    if (!user) {
        throw fail('Không tìm thấy người dùng.', 404);
    }

    res.json({
        success: true,
        message: 'Đã cập nhật thông tin.',
        user: safeUser(user)
    });
});

// ==========================================
// 11. XÓA KHÁCH HÀNG — ADMIN
// ==========================================

const deleteUser = wrap(async (req, res) => {
    const actor = await authorize(req, true);

    validId(req.params.id);

    if (String(actor._id) === req.params.id) {
        throw fail(
            'Không thể tự xóa tài khoản Admin đang sử dụng.'
        );
    }

    const deleted = await User.findOneAndDelete({
        _id: req.params.id,
        role: { $ne: 'admin' }
    });

    if (!deleted) {
        throw fail(
            'Không tìm thấy khách hàng hoặc tài khoản này là Admin.',
            409
        );
    }

    res.json({
        success: true,
        message: 'Đã xóa khách hàng.'
    });
});

// ==========================================
// 12. THÊM / BỎ SẢN PHẨM YÊU THÍCH
// ==========================================

const toggleWishlist = wrap(async (req, res) => {
    await authorize(req);

    validId(req.params.id);

    const productId = text(req.body.productId);

    validId(productId);

    if (!(await Product.exists({ _id: productId }))) {
        throw fail('Không tìm thấy sản phẩm.', 404);
    }

    const user = await User.findById(req.params.id);

    if (!user) {
        throw fail('Không tìm thấy người dùng.', 404);
    }

    const removing = user.wishlist.some(
        id => String(id) === productId
    );

    const filter = {
        _id: user._id,
        wishlist: removing
            ? productId
            : { $ne: productId }
    };

    const change = removing
        ? { $pull: { wishlist: productId } }
        : { $addToSet: { wishlist: productId } };

    const updated = await User.findOneAndUpdate(
        filter,
        change,
        { new: true }
    );

    if (!updated) {
        throw fail(
            'Danh sách vừa thay đổi. Vui lòng tải lại.',
            409
        );
    }

    // Đếm từ wishlist đã lưu; không dùng lượt thích
    // do trình duyệt gửi lên.
    const likesCount = await User.countDocuments({
        wishlist: productId
    });

    await Product.updateOne(
        { _id: productId },
        { $set: { likesCount } }
    );

    res.json({
        success: true,
        wishlist: updated.wishlist
    });
});

// ==========================================
// EXPORT ĐỦ HÀM ĐỂ userRoutes KHÔNG BỊ LỖI
// ==========================================

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
    toggleWishlist,
    requireAuth,
    requireAdmin
};