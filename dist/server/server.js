"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bluebird = require("bluebird");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var compression = require("compression");
var cors = require("cors");
var expressJwt = require("express-jwt");
var express = require("express");
var fs = require("fs");
var helmet = require("helmet");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");
var config_1 = require("./config/config");
var content_router_1 = require("./routers/content-router");
var file_router_1 = require("./routers/file-router");
var user_router_1 = require("./routers/user-router");
var Server = (function () {
    function Server() {
        this._app = express();
        this._config = new config_1.default();
        this._rsaPublicKey = fs.readFileSync(__dirname + "/security/server.crt");
        this._authenticator = expressJwt({
            secret: this._rsaPublicKey,
            algorithms: ['RS256']
        }).unless({
            path: [
                /(^\/(?!(api)).*$)|(^\/api\/user\/((create)|(login))$)/i
            ]
        });
        this.setup();
    }
    Object.defineProperty(Server.prototype, "app", {
        get: function () {
            return this._app;
        },
        enumerable: true,
        configurable: true
    });
    Server.prototype.setup = function () {
        mongoose.Promise = bluebird;
        mongoose.connect(this._config.mongoUrlLab || process.env.PORT, {
            useMongoClient: true,
            promiseLibrary: bluebird
        }).then(function () {
            console.log('Connected successfully to lab database.');
        }).catch(function (err) {
            console.log(err);
        });
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({
            extended: false
        }));
        this._app.use(cookieParser());
        this._app.use(compression());
        this._app.use(helmet());
        this._app.use(logger('dev'));
        this._app.use(cors());
        this._app.use(this._authenticator);
        this._app.use(this.errorHandler);
        this._app.use(express.static(path.join(__dirname, '../app')));
        this.routes();
    };
    Server.prototype.routes = function () {
        this._app.use('/api/file', file_router_1.default);
        this._app.use('/api/content', content_router_1.default);
        this._app.use('/api/user', user_router_1.default);
        this._app.get('*', function (req, res) {
            res.sendFile(path.join(__dirname, '../app/index.html'));
        });
    };
    Server.prototype.errorHandler = function (err, req, res, next) {
        console.log('ERROR SENT');
        if (err.name === 'UnauthorizedError') {
            res.status(401).json({
                message: 'Error: Unauthorized Access.'
            });
        }
        else {
            res.status(500).json({
                message: 'Error: Unknown'
            });
        }
    };
    return Server;
}());
exports.default = new Server().app;
//# sourceMappingURL=server.js.map