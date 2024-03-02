const contentType = {
    plain: 'text/plain',
    html: 'text/html',
    css: 'text/css',
    json: 'application/json'
};

const sendResponse = (res, response = {type: 'plain', code: 200, message: null}) => {
    res.writeHead(response.code, { 'Content-Type': contentType[response.type] });
    res.end(response.type === 'json' ? JSON.stringify(response.message || {}) : response.message || '');
}

module.exports = sendResponse;