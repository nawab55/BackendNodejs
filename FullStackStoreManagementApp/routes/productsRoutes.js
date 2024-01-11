const express = require('express');

const productController = require('../controllers/product');

const router = express.Router();

router.get('/products', productController.getProducts);
router.post('/products', productController.addProduct);
router.put('/products/:productId', productController.updateProduct);
router.get('/products/:productId', productController.getProductById);

module.exports = router;
