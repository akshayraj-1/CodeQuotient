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
        switch (req.query.category.toLowerCase()) {
            case 'food':
                res.json(products.filter((product) => product.category === "food"));
                break;
            case 'others':
                res.json(products.filter((product) => product.category === "others"));
                break;
            default:
                res.json(products);
        }

    } catch (error) {
        res.send(error).status(500);
    }
})

app.listen(port, (error) => console.log(error ? 'Unable to start the server' : 'Server started...'));
