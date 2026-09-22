const { sendContactEmail } = require('../services/emailService');

const submitContactForm = async (req, res) => {
  try {
    // 1. Nhận dữ liệu từ request body
    const formData = req.body;

    // 2. Kiểm tra dữ liệu đầu vào cơ bản
    if (!formData.email || !formData.message || !formData.firstName) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin bắt buộc.' });
    }

    // 3. Gọi service gửi email
    await sendContactEmail(formData);

    // 4. Trả về phản hồi thành công
    res.status(200).json({ message: 'Tin nhắn của bạn đã được gửi thành công.' });
  } catch (error) {
    console.error('Lỗi khi xử lý form liên hệ:', error);
    res.status(500).json({ message: 'Lỗi máy chủ, không thể gửi email lúc này.' });
  }
};

module.exports = { submitContactForm };