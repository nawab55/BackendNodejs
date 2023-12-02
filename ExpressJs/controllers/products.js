const rootDir = require('../util/path');
const path = require('path');

exports.getAddProduct = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
};

exports.postAddProduct = (req, res, next) => {
    console.log(req.body);
    res.redirect("/");
};

exports.getProduct = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
};

exports.getContactProduct = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'contactus.html'))
};

exports.postContactProduct = (req, res, next) => {
    console.log(req.body);
    res.redirect("/success");
};

exports.getSuccessProduct = (req, res, next) => {
    res.send('"Form successfuly filled".');
};