import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3001;

app.get("/", async (req, res) => {
    try {
        const data = fs.readFileSync(path.join(__dirname, './src/data/products.json'), 'utf-8');
        const products = JSON.parse(data);
        if (!req.query.hasOwnProperty('category')) {
            res.status(200).send('<h3 style="font-family: sans-serif;">Usage:<br>/?category=food</h3>');
            return;
        }
        switch (req.query.category.toLowerCase()) {
            case 'food':
                res.json(products.filter((product) => product.category === "food"));
                break;
            case 'others':
                res.status(200).json(products.filter((product) => product.category === "others"));
                break;
            default:
                res.status(200).json(products);
        }

    } catch (error) {
        res.status(500).send(error);
    }
})

app.listen(port, (error) => console.log(error ? 'Unable to start the server' : 'Server started...'));
