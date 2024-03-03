import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
    if (!req.query.category) {
        return res.status(200).sendFile(path.join(__dirname, '/src/', 'index.html'));
    }

    fs.readFile(path.join(__dirname, '/src/data/', 'products.json'), 'utf-8', (error, result) => {
        if (error) {
            return res.status(500).send(`Internal Server Error - ${error}`);
        }
        const products = JSON.parse(result) || [];
        const filteredProducts = products.filter(product => product.category === req.query.category.toLocaleLowerCase());
        return res.status(200).json(
            filteredProducts.length === 0
            ? { success: false, message: `No products found for the category - ${req.query.category}` }
            : filteredProducts
        );
    });
});

app.get('/data/:file', (req, res) => {
    return res.sendFile(path.join(__dirname, '/src/data/', req.params.file));
});

app.listen(PORT, (error) => console.log(error ? 'Unable to start the server' : 'Server started...'));
