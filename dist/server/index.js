"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var debug = require("debug");
var server_1 = require("./server");
debug('flairsheet:server');
var port = normalizePort(process.env.PORT || 3000);
server_1.default.set('port', port);
console.log("Server listening on port " + port);
console.log('Connected to address: http://localhost:3000/');
var server = http.createServer(server_1.default);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
function normalizePort(val) {
    var normalizedPort = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(normalizedPort)) {
        return val;
    }
    else if (normalizedPort >= 0) {
        return normalizedPort;
    }
    else {
        return false;
    }
}
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    var addr = server.address();
    var bind = (typeof addr === 'string') ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
}
//# sourceMappingURL=index.js.map