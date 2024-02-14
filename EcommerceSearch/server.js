const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');


const port = 3000;
const server = http.createServer(async (req, res) => {
    try {
        const parsedUrl = url.parse(req.url, true);
        console.log(parsedUrl);
        switch (parsedUrl.pathname) {
            case '/products':
                if (parsedUrl.query && parsedUrl.query.hasOwnProperty('category')) {
                    
                }
                break;
            case '/filterproducts':
                break;
            default:
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write('<h3 style="font-family: sans-serif;">Example Usage:<br>/products?category=cloths<br>/filterproducts?category=cloths&price=300</h3>');
                res.end();  
        }
    } catch (error) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.write('Something went wrong');
        res.end();
    }
})


const filterProducts = (query) => {
    
}
  

server.listen(port, (error) => console.log(error ? 'Unable to start the server' : 'Server started...'));