const express = require('express');
const path = require('path');
const router = express.Router();
const shopController = require('../controllers/products');

router.get("/", shopController.getProduct);

module.exports = router;