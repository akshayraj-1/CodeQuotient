const contentType = {
    plain: 'text/plain',
    html: 'text/html',
    css: 'text/css',
    json: 'application/json',

};

/**
 * Sends an HTTP response with the specified content type and the response message.
 * @param {http.ServerResponse} res - The HTTP response object.
 * @param {Object} response - The response object.
 * @param {string} response.type - The content type of the response. Defaults to plain.
 * @param {number} response.code - The HTTP status code. Defaults to 200.
 * @param {string|Object|null} response.message - The data to be sent in the response. Defaults to null.
 */
const send = (res, response = { type: 'plain', code: 200, message: null }) => {
    res.writeHead(response.code, { 'Content-Type': contentType[response.type] });
    res.end(response.type === 'json' ? JSON.stringify(response.message || {}) : response.message || '')
}

module.exports = { send };
