const http = require('http');
const path = require('path');
const fs = require('fs');


const port = 3000;
const server = http.createServer(async (req, res) => {
    res.write(req.url);
    res.end();
})

server.listen(port, (error) => console.log(error ? 'Unable to start the server' : 'Server started...'));