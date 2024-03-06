const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");

const responseHandler = require("./src/modules/responseHandler.js");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    switch (req.url) {
        case "/":
            fs.readFile(path.join(__dirname, "src", "index.html"), "utf-8", (error, result) => {
                responseHandler.send(res, {
                    type: error ? "json" : "html",
                    code: error ? 500 : 200,
                    message: error
                        ? { success: false, message: `Internal Server Error - ${error}` }
                        : result,
                });
            }
            );
            break;

        case "/signup-page":
            fs.readFile(path.join(__dirname, "src", "signup.html"), "utf-8", (error, result) => {
                responseHandler.send(res, {
                    type: error ? "json" : "html",
                    code: error ? 500 : 200,
                    message: error
                        ? { success: false, message: `Internal Server Error - ${error}` }
                        : result,
                });
            }
            );
            break;

        case "/signup":
            const parsedUrl = url.parse(req.url, true);
            if (req.method.toUpperCase() === "POST") {
                let body = "";
                req.on("data", (chunk) => {
                    body += chunk.toString();
                });

                req.on("end", () => {
                    const formData = querystring.parse(body);
                    fs.readFile(path.join(__dirname, "src/data/", "users.json"), "utf-8", (error, result) => {
                        if (error) {
                            responseHandler.send(res, {
                                type: "json",
                                code: 500,
                                message: {
                                    success: false,
                                    message: `Internal Server Error - ${error}`,
                                },
                            });
                            return;
                        }
                        const users = JSON.parse(result) || [];
                        const newUserId = Date.now();
                        users.push({ ...formData, id: newUserId });

                        fs.writeFile(path.join(__dirname, "src/data/", "users.json"), JSON.stringify(users, null, 2), "utf-8", (error) => {
                            responseHandler.send(res, {
                                type: "json",
                                code: error ? 500 : 201,
                                message: {
                                    success: error ? false : true,
                                    message: error
                                        ? error
                                        : `User created with id: ${newUserId}`,
                                },
                            });
                        }
                        );
                    }
                    );
                });
            } else {
                responseHandler.send(res, {
                    type: "html",
                    code: 405,
                    message: `Invalid request method- ${getClientRequestCount(
                        parsedUrl.query.name || "unknown"
                    )}`,
                });
            }
            break;

        case "/user":
            fs.readFile(path.join(__dirname, "/src", "user.html"), (error, result) => {
                responseHandler.send(res, {
                    type: error ? "json" : "html",
                    code: error ? 500 : 200,
                    message: error
                        ? { success: false, message: `Internal Server Error - ${error}` }
                        : result,
                });
            }
            );
    }
});

// Handling Invalid Request Counts For Every Client
const clients = {};
const getClientRequestCount = (clientId) => {
    clientId = clientId.trim().toLocaleLowerCase();
    if (clients[clientId]) {
        const count = (clients[clientId] += 1);
        return count;
    }
    clients[clientId] = 1;
    return 1;
};

server.listen(PORT, (error) =>
    console.log(error ? "Unable to start the server" : "Server started...")
);
