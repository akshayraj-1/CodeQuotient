const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const sendResponse = require('./src/modules/customResponse.js');


const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/signup') {
        // TODO: Complete this section
        if (req.method.toLocaleLowerCase() === 'post') {
            sendResponse(res, {
                type: 'html',
                code: 200,
                message: `Whooo`
            });
        } else {
            sendResponse(res, {
                type: 'html',
                code: 400,
                message: `Invalid Request`
            });
        }
    } else {

    }
});

server.listen(PORT, (error) => console.log(error ? 'Unable to start the server' : 'Server started...'));