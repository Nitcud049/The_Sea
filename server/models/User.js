const mongoose = require('mongoose');

// Loại bỏ dữ liệu nhạy cảm khi chuyển tài khoản sang JSON.
// Vẫn giữ password trong document để controller hiện tại
// tiếp tục xử lý đăng nhập trong giai đoạn chuyển đổi.
const removeSensitiveFields = (_document, result) => {
    delete result.password;
    delete result.__v;

    return result;
};

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        phone: {
            type: String,
            default: ''
        },

        address: {
            type: String,
            default: ''
        },

        title: {
            type: String,
            default: 'Khác'
        },

        firstName: {
            type: String,
            default: ''
        },

        lastName: {
            type: String,
            default: ''
        },

        dob: {
            type: String,
            default: ''
        },

        country: {
            type: String,
            default: 'Việt Nam'
        },

        wishlist: {
            type: [String],
            default: []
        },

        // Quyền của tài khoản.
        // Tài khoản đăng ký mới mặc định là khách hàng.
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',

            // Ngăn việc đổi quyền qua các thao tác cập nhật
            // Mongoose thông thường, đặc biệt khi controller cũ
            // còn truyền trực tiếp req.body vào câu lệnh cập nhật.
            immutable: true
        }
    },
    {
        timestamps: true,

        // Áp dụng khi controller trả:
        // res.json(user) hoặc res.json({ user }).
        toJSON: {
            transform: removeSensitiveFields
        }
    }
);

module.exports = mongoose.model('User', userSchema);