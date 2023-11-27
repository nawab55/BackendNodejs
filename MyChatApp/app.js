const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const PORT = 4000;

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => {
    fs.readFile('username.txt', 'utf8', (err, data) => {
        if(err){
            console.log(err);
            data = 'No chat exists'
        }
        res.send(
            `${data}<form action="/" method = "POST" onSubmit="document.getElementById('username').value = localStorage.getItem('username')">
                <input type="text" name="message" id="message">
                <input type="hidden" name="username" id="username">
                <br/>
                <button type="submit">Send</button>
            </form>`
        );
    })
});

app.post("/", (req, res) => {
    console.log(req.body.username);
    console.log(req.body.message);
    // const message = `${req.body.username}: ${req.body.message}\n`;
    fs.writeFile("username.txt", `${req.body.username}: ${req.body.message},\n`, {flag: 'a'}, (err) =>
        err ? console.log(err) : res.redirect("/")
    );
});

app.get('/login', (req, res) => {
    res.send(
        `<form action="/login" onsubmit="localStorage.setItem('username',document.getElementById('username').value)" method="POST">
            <input id="username" type="text" name="username" placeholder="username">
            <button type="submit" value="">Login</button>
        </form>`
    )
});
app.post(`/login`,(req, res, next) => {
    res.redirect(`/`)
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
