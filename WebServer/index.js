const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;

const server = http.createServer((req, res) => {
	if (req.url === '/about') {
		sendHtmlFile(res, path.join(__dirname, 'about.html'));
		logRequest(req.url);
	} else if (req.url === '/home') {
		sendHtmlFile(res, path.join(__dirname, 'home.html'));
		logRequest(req.url);
	}
});


const sendHtmlFile = (res, path) => {
	fs.readFile(path, 'utf-8', (error, data) => {
		if (error) {
      res.setHeader('status', 500);
			res.end('Something Went Wrong');
			return;
		}
    res.setHeader('status', 200);
		res.setHeader('content-type', 'text/html');
		res.end(data);
	});
}

const logRequest = (url) => {
	fs.readFile(path.join(__dirname, 'error.txt'), 'utf-8', (error, data) => {
		if (error) {
			console.log('Something Went Wrong', error);
			return;
		}
		const lines = data.split('\n');
    if (lines.length > 5) {
      fs.writeFile(path.join(__dirname, 'error.txt'), '', (error) => {
        if (error) {
          console.log('Something Went Wrong', error);
          return;
        }
      });
    }
		
		const newLog = `Request Url: ${url}, Date: ${new Date().toLocaleDateString()}, Time: ${new Date().toLocaleTimeString()}\n`;
		fs.appendFile(path.join(__dirname, 'error.txt'), newLog, (error) => {
			if (error) {
				console.log('Something Went Wrong', error);
				return;
			}
		});
	});
}


server.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
