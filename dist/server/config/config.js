"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = (function () {
    function Config() {
        this._mongoUrlProd = 'mongodb://flair.admin:flairadmin7@127.0.0.1:27017/flairsheet';
        this._mongoUrlDev = 'mongodb://127.0.0.1:27017/flairsheet';
        this._mongoUrlLab = 'mongodb://flairadmin:123456789@ds161146.mlab.com:61146/flairsheet';
        this._tokenExpirationTime = '30 days';
    }
    Object.defineProperty(Config.prototype, "mongoUrlProd", {
        get: function () {
            return this._mongoUrlProd;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "mongoUrlDev", {
        get: function () {
            return this._mongoUrlDev;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "mongoUrlLab", {
        get: function () {
            return this._mongoUrlLab;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config.prototype, "tokenExpirationTime", {
        get: function () {
            return this._tokenExpirationTime;
        },
        enumerable: true,
        configurable: true
    });
    return Config;
}());
exports.default = Config;
//# sourceMappingURL=config.js.map