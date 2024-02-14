const contentType = {
    plain: 'text/plain',
    html: 'text/html',
    css: 'text/css',
    json: 'application/json',

};

const sendResponse = (res, response = { type: 'plain', error: null, data: null }) => {
    res.writeHead(response.error ? response.error.code || 500 : 200, { 'Content-Type': contentType[response.type] });
    res.write(response.error ? response.error.message : response.type === 'json' ? JSON.stringify(response.data || {}) : response.data || '');
    res.end();
}

module.exports = sendResponse;
