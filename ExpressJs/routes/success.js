const express = require('express');
const path = require('path');
const router = express.Router();
const successController = require('../controllers/products');

router.get("/success", successController.getSuccessProduct);

module.exports = router;