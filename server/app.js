
const express = require('express');
const app = express();
// const routes = require('./routes');
// console.log(routes.someText);
app.use((req, res, next) => {
    console.log("In the middleware!");
    next();
});
app.use((req, res, next) => {
    console.log("In another middleware!");
    res.send('<h1>Hello from express</h1>')
    // next();
});


app.listen(4000);
