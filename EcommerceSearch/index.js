const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const sendResponse = require('./src/modules/customResponse');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    switch (parsedUrl.pathname) {
        case '/products':
            filterProducts({ category: parsedUrl.query.category }, (error, result) => {
                sendResponse(res, {
                    type: 'json',
                    code: error ? 500 : 200,
                    message: error ? `Something went wrong: ${error}` : result
                });
            });
            break;
        case '/filterproducts':
            filterProducts({ category: parsedUrl.query.category, price: parsedUrl.query.price }, (error, result) => {
                sendResponse(res, {
                    type: 'json',
                    code: error ? 500 : 200,
                    message: error ? `Something went wrong: ${error}` : result
                });
            });
            break;
        default:
            fs.readFile(path.join(__dirname, './src/index.html'), 'utf-8', (error, result) => {
                sendResponse(res, {
                    type: 'html',
                    code: error ? 500 : 200,
                    message: error ? `Something went wrong: ${error}` : result
                });
            });
    }
});


// Filters the products on the basis of given category and price
const filterProducts = (query, listener) => {
    fs.readFile(path.join(__dirname, './src/data/products.json'), (error, result) => {
        if (error) {
            listener(error, null);
            return;
        }
        const products = JSON.parse(result);
        const filtered = products.filter((product) => product.category == (query.category ? query.category : product.category) && product.price >= parseInt(query.price ? query.price : 0));
        listener(null, filtered);
    });
}


server.listen(PORT, (error) => console.log(error ? 'Unable to start the server' : 'Server started...'));