const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');

    if (req.url === '/home') {
        res.write('<html><body><h1>Welcome home</h1></body></html>');
    } else if (req.url === '/about') {
        res.write('<html><body><h1>Welcome to About Us page</h1></body></html>');
    } else if (req.url === '/node') {
        res.write('<html><body><h1>Welcome to my Node Js project</h1></body></html>');
    } else{
        res.write('<html>');
        res.write('<head><title>My first page</title></hrad>');
        res.write('<body><h1>Welcome to my node js server</h1></body>')
        res.write('</html');
    }
    res.end()
});

server.listen(3000);


