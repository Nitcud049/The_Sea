const express = require('express');
const router = express.Router();
const { submitContactForm } = require('../controllers/contactController');

// Xử lý gửi form liên hệ
router.post('/api/contact', submitContactForm);

module.exports = router;