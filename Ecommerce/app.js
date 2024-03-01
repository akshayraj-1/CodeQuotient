import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
    if (!req.query.hasOwnProperty('category')) {
        res.status(200).sendFile(path.join(__dirname, './src/index.html'));
        return;
    }

    fs.readFile(path.join(__dirname, './src/data/products.json'), 'utf-8', (error, result) => {
        if (error) {
            res.status(500).send(error);
            return;
        }
        const products = JSON.parse(result) || [];
        switch (req.query.category.toLowerCase()) {
            case 'food':
                res.status(200).json(products.filter((product) => product.category === "food"));
                break;
            case 'others':
                res.status(200).json(products.filter((product) => product.category === "others"));
                break;
            default:
                res.status(204).send("No Products Found");
        }
    });
});

app.get('/data/*', (req, res) => {
    res.sendFile(path.join(__dirname, './src/', req.url));
});

app.listen(PORT, (error) => console.log(error ? 'Unable to start the server' : 'Server started...'));
