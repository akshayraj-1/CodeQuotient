const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const sendResponse = require('./src/modules/customResponse');


const port = 3000;
const server = http.createServer(async (req, res) => {
    try {
        const parsedUrl = url.parse(req.url, true);
        let filtered = [];
        switch (parsedUrl.pathname) {
            case '/products':
                filtered = await filterProducts({category: parsedUrl.query.category});
                sendResponse(res, {
                    type: 'json',
                    data: filtered
                });
                break;
            case '/filterproducts':
                filtered = await filterProducts({category: parsedUrl.query.category, price: parsedUrl.query.price});
                sendResponse(res, {
                    type: 'json',
                    data: filtered
                });
                break;
            default:
                const index = fs.readFileSync(path.join(__dirname, './src/index.html'), 'utf-8');
                sendResponse(res, {
                    type: 'html',
                    data: index
                });
        }
    } catch (error) {
        sendResponse(res, {
            type: 'plain',
            error: {
                message: `Something went wrong - ${error}`
            }
        });
    }
})


const filterProducts = async (query) => {
    console.log(query);
    const products = fs.readFileSync(path.join(__dirname, './src/data/products.json'));
    const productsData = JSON.parse(products);
    let filtered = productsData.filter((product) => product.category == (query.category ? query.category : product.category) && product.price >= parseInt(query.price ? query.price : 0));
    return filtered;
}


server.listen(port, (error) => console.log(error ? 'Unable to start the server' : 'Server started...'));