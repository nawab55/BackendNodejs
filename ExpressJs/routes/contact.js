const path = require('path');
const express = require('express');

const contactusController = require('../controllers/products');
const router = express.Router();

// /contactus => GET
router.get("/contactus", contactusController.getContactProduct);
// /admin/add-product => POST
router.post("/contactus", contactusController.postContactProduct);

module.exports = router;
