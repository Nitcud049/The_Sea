const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.post('/:id/review', productController.addProductReview);
router.delete('/:productId/review/:reviewId', productController.deleteProductReview);

module.exports = router;