const express = require('express');

const router = express.Router();


router.get("/add-product", (req, res, next) => {
    // console.log('In middleware');
    // res.setHeader("Cache-Control", "no-store");
    res.send(
      '<form action ="/admin/add-product" method="POST"><input type="text" placeholder="product-name" name="title"><input type="text" placeholder="Size of product" name="title"><button type=submit">Add product</button></form>'
    );
});
router.post("/add-product", (req, res, next) => {
    console.log(req.body);
    res.redirect("/");
});

module.exports = router;


