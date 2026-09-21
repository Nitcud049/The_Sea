const express = require('express');
const router = express.Router();
const Review = require('../models/Review'); // Đường dẫn trỏ tới file model ở trên

// API Lấy danh sách đánh giá có phân trang
router.get('/api/reviews', async (req, res) => {
  try {
    // Lấy page và limit từ query string (mặc định trang 1, 10 item/trang)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Chạy song song 2 truy vấn: Lấy dữ liệu và đếm tổng số bản ghi
    const [reviews, totalReviews] = await Promise.all([
      Review.find()
        .populate('product', 'name image price')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Review.countDocuments()
    ]);

    res.json({
      reviews,
      currentPage: page,
      totalPages: Math.ceil(totalReviews / limit),
      totalReviews
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API Xóa đánh giá
router.delete('/api/reviews/:id', async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) return res.status(404).json({ message: 'Không tìm thấy đánh giá' });
    res.json({ message: 'Đã xóa đánh giá thành công' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;