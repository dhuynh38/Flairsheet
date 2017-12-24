"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var fs = require("fs");
var Grid = require("gridfs-stream");
var mongoose = require("mongoose");
var Multer = require("multer");
var express_1 = require("express");
var content_1 = require("../models/content");
var user_1 = require("../models/user");
var ContentRouter = (function () {
    function ContentRouter() {
        this._uploader = Multer({
            dest: './dist/uploads/'
        });
        this._router = express_1.Router();
        this._router.use(bodyParser.json());
        this.routes();
    }
    Object.defineProperty(ContentRouter.prototype, "router", {
        get: function () {
            return this._router;
        },
        enumerable: true,
        configurable: true
    });
    ContentRouter.prototype.getAllContentIds = function (req, res) {
        content_1.default.find({}).select('_id').then(function (data) {
            res.status(200).json({
                data: data
            });
        }).catch(function (err) {
            console.log(err);
            res.status(500).json({
                message: 'Error: Cannot Get All Content Ids.'
            });
        });
    };
    ContentRouter.prototype.getContentWithId = function (req, res) {
        content_1.default.findById(req.params.contentId)
            .populate('author', 'firstname lastname').then(function (data) {
            res.status(200).json({
                data: data
            });
        }).catch(function (err) {
            console.log(err);
            res.status(500).json({
                message: 'Error: Cannot Get Content With Id.'
            });
        });
    };
    ContentRouter.prototype.uploadContent = function (req, res) {
        this._gridFS = Grid(mongoose.connection.db, mongoose.mongo);
        var writestream = this._gridFS.createWriteStream();
        fs.createReadStream(req.file.path).pipe(writestream);
        writestream.on('close', function (file) {
            fs.unlink(req.file.path, function (err) {
                if (err) {
                    console.log(err);
                }
            });
            var newContent = new content_1.default({
                title: req.body.title,
                titleOriginal: req.body.title,
                description: req.body.description,
                author: req.user.sub,
                contentType: req.body.contentType,
                major: req.body.major,
                minor: req.body.minor,
                file: file._id
            });
            content_1.default.create(newContent).then(function (data) {
                user_1.default.findById(req.user.sub).then(function (user) {
                    user.get('myContents').push(data.get('_id'));
                    user.save().then(function (updatedUser) {
                        res.status(201).json({
                            message: 'Success'
                        });
                    }).catch(function (err3) {
                        console.log(err3);
                        res.status(500).json({
                            message: 'Error: Cannot Save Contents To User.'
                        });
                    });
                }).catch(function (err2) {
                    console.log(err2);
                    res.status(500).json({
                        message: 'Error: Cannot Find User To Save Content.'
                    });
                });
            }).catch(function (err) {
                console.log(err);
                res.status(500).json({
                    message: 'Error: Creating Content Failed.'
                });
            });
        });
    };
    ContentRouter.prototype.routes = function () {
        var _this = this;
        this._router.route('/').get(function (req, res) { return _this.getAllContentIds(req, res); });
        this._router.route('/:contentId').get(function (req, res) { return _this.getContentWithId(req, res); });
        this._router.route('/upload').post(this._uploader.single('file'), function (req, res) { return _this.uploadContent(req, res); });
    };
    return ContentRouter;
}());
exports.default = new ContentRouter().router;
//# sourceMappingURL=content-router.js.map