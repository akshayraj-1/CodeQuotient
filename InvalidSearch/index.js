const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const responseHandler = require('./src/modules/responseHandler.js');


const PORT = process.env.PORT || 3000;

const invalidCount = {};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    if (parsedUrl.pathname === '/signup') {
        // TODO: Complete this section
        if (req.method.toLocaleLowerCase() === 'post') {
            responseHandler.send(res, {
                type: 'html',
                code: 200,
                message: `Whooo`
            });
        } else {
            invalidCount[parsedUrl.query.name || 'Ananomous'] 
            ? invalidCount[parsedUrl.query.name || 'Ananomous']++ 
            : invalidCount[parsedUrl.query.name || 'Ananomous'] = 1;

            responseHandler.send(res, {
                type: 'html',
                code: 405,
                message: `Invalid request method - ${invalidCount[parsedUrl.query.name || 'Ananomous']}`
            });
            
        }
    } else {

    }
});

server.listen(PORT, (error) => console.log(error ? 'Unable to start the server' : 'Server started...'));