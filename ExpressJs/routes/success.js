const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path');

router.get("/success", (req, res, next) => {
   res.send('"Form successfuly filled".');
});

module.exports = router;