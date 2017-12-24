"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var Grid = require("gridfs-stream");
var mongoose = require("mongoose");
var express_1 = require("express");
var FileRouter = (function () {
    function FileRouter() {
        this._router = express_1.Router();
        this._router.use(bodyParser.json());
        this.routes();
    }
    Object.defineProperty(FileRouter.prototype, "router", {
        get: function () {
            return this._router;
        },
        enumerable: true,
        configurable: true
    });
    FileRouter.prototype.getFileWithId = function (req, res) {
        this._gridFS = Grid(mongoose.connection.db, mongoose.mongo);
        this._gridFS.createReadStream({
            _id: req.params.fileId
        }).pipe(res.status(200));
    };
    FileRouter.prototype.routes = function () {
        var _this = this;
        this._router.route('/:fileId').get(function (req, res) { return _this.getFileWithId(req, res); });
    };
    return FileRouter;
}());
exports.default = new FileRouter().router;
//# sourceMappingURL=file-router.js.map