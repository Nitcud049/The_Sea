const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Router dành riêng cho số liệu thống kê Dashboard
router.get('/stats', dashboardController.getDashboardStats);
router.get('/top-liked-products', dashboardController.getTopLikedProducts);

module.exports = router;