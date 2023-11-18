const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({extended: false}));


app.use('/add-product', (req, res, next) => {
    // console.log('In middleware');
    res.send('<form action ="/product" method="POST"><input type="text" placeholder="product-name" name="title"><input type="text" placeholder="Size of product" name="title"><button type=submit">Add product</button></form>');
});
app.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

app.use('/', (req, res, next) => {
    // console.log('In another middleware');
    res.send('<h1>Hello from Express!</h1>');
});

app.listen(3000);