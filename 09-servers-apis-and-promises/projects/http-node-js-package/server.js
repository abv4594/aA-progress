// server.js

const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 202;
    res.setHeader( "Content-Type", "text/css");
    res.write('Ola ');
    res.write('Mundo');
    res.write (' !');
    res.end();
});

const port = 5000;

server. listen(port, ()=> console.log(`Server is listening on port ${port}`));

