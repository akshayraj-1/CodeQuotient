const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const responseHandler = require('./src/modules/responseHandler.js');


const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

    if (req.url === '/signup') {
        const parsedUrl = url.parse(req.url, true);
        if (req.method.toUpperCase() === 'POST') {
            // TODO: Complete this section
            responseHandler.send(res, {
                type: 'json',
                code: 201,
                message: { success: true, message: "User Created Successfully" }
            });
        } else {
            responseHandler.send(res, {
                type: 'html',
                code: 405,
                message: `Invalid request method- ${getClientRequestCount(parsedUrl.query.name || 'unknown')}`
            });
        }
    } else {
        fs.readFile(path.join(__dirname, 'src', 'index.html'), 'utf-8', (error, result) => {
            responseHandler.send(res, {
                type: error ? 'json' : 'html',
                code: error ? 500 : 200,
                message: error ? { success: false, message: `Internal Server Error - ${error}` } : result
            });
        });
    }

});


// Handling Invalid Request Counts For Every Client
const clients = {};
const getClientRequestCount = (clientId) => {
    clientId = clientId.trim().toLocaleLowerCase();
    if (clients[clientId]) {
        const count = clients[clientId] += 1;
        return count;
    }
    clients[clientId] = 1;
    return 1;
}

server.listen(PORT, (error) => console.log(error ? 'Unable to start the server' : 'Server started...'));