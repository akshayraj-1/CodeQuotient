const express = require('express');
const fs = require('fs');
const path = require('path');
const port = 3000;

const app = express();


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/', 'home.html'));
});

app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/', 'style.css'));
});

app.get('/task.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/', 'task.jpg')); 
});

app.get('*', (req, res) => {
   res.json({ success: false, message: 'Page not found' }); 
});


app.listen(port, (error) => console.log(error ? 'Unable to start the server' : 'Server started...'));