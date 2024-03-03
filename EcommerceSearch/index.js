const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const responseHandler = require('./src/modules/responseHandler.js');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    switch (parsedUrl.pathname) {
        case '/products':
            // Path -> /products?category={your_category}
            filterProducts({ category: parsedUrl.query.category }, (error, result) => {
                responseHandler.send(res, {
                    type: 'json',
                    code: error ? 500 : 200,
                    message: error ? `Something went wrong: ${error}` : result
                });
            });
            break;
        case '/filterproducts':
            // Path -> /filterproducts?category={your_category}&price={min_price}
            filterProducts({ category: parsedUrl.query.category, price: parsedUrl.query.price }, (error, result) => {
                responseHandler.send(res, {
                    type: 'json',
                    code: error ? 500 : 200,
                    message: error ? `Something went wrong: ${error}` : result
                });
            });
            break;
        default:
            // Path -> /*
            fs.readFile(path.join(__dirname, '/src/', 'index.html'), 'utf-8', (error, result) => {
                responseHandler.send(res, {
                    type: 'html',
                    code: error ? 500 : 200,
                    message: error ? `Something went wrong: ${error}` : result
                });
            });
    }
});


// Filters the products on the basis of given category and price
const filterProducts = (query, callback) => {
    fs.readFile(path.join(__dirname, '/src/data/', 'products.json'), (error, result) => {
        if (error) {
            callback(error, null);
            return;
        }
        const products = JSON.parse(result);
        const filteredProducts = products.filter((product) => product.category == (query.category ? query.category : product.category) && product.price >= parseInt(query.price ? query.price : 0));
        callback(null, filteredProducts);
    });
}


server.listen(PORT, (error) => console.log(error ? 'Unable to start the server' : 'Server started...'));