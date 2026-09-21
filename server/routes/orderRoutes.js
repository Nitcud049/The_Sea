const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/', orderController.getAllOrders);
router.get('/my-orders', orderController.getMyOrders);
router.post('/', orderController.createOrder);
router.put('/:id', orderController.updateOrderStatus);

module.exports = router;