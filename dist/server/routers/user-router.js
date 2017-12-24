"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt");
var bluebird = require("bluebird");
var bodyParser = require("body-parser");
var fs = require("fs");
var jwt = require("jsonwebtoken");
var ms = require("ms");
var express_1 = require("express");
var config_1 = require("../config/config");
var user_1 = require("../models/user");
var UserRouter = (function () {
    function UserRouter() {
        bluebird.promisifyAll(bcrypt);
        this._router = express_1.Router();
        this._router.use(bodyParser.json());
        this._rsaPrivateKey = fs.readFileSync(__dirname + "/../security/server.key");
        this._config = new config_1.default();
        this.routes();
    }
    Object.defineProperty(UserRouter.prototype, "router", {
        get: function () {
            return this._router;
        },
        enumerable: true,
        configurable: true
    });
    UserRouter.prototype.createTokenKey = function (id) {
        return jwt.sign({}, this._rsaPrivateKey, {
            algorithm: 'RS256',
            expiresIn: ms(this._config.tokenExpirationTime),
            subject: id
        });
    };
    UserRouter.prototype.getUsers = function (req, res) {
        user_1.default.find({}).then(function (data) {
            res.status(200).json({
                data: data
            });
        }).catch(function (err) {
            console.log(err);
            res.status(500).json({
                message: 'Error: Cannot Get Users.'
            });
        });
    };
    UserRouter.prototype.createUser = function (req, res) {
        var _this = this;
        bcrypt.hash(req.body.password, 10).then(function (hash) {
            var newUser = new user_1.default({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                usernameOriginal: req.body.usernameOriginal,
                email: req.body.email,
                password: hash,
                birthday: req.body.birthday,
                sex: req.body.sex,
            });
            user_1.default.create(newUser).then(function (data) {
                res.status(201).json({
                    token: {
                        key: _this.createTokenKey(data.get('_id').toHexString()),
                        expiresIn: _this._config.tokenExpirationTime
                    }
                });
            }).catch(function (err) {
                console.log(err);
                res.status(500).json({
                    message: 'Error: Creating User Failed'
                });
            });
        }).catch(function (err) {
            res.status(500).json({
                message: 'Error: Hashing Password Failed'
            });
        });
    };
    UserRouter.prototype.loginUser = function (req, res) {
        var _this = this;
        user_1.default.findOne({ email: req.body.email.toLowerCase() }).then(function (data) {
            bcrypt.compare(req.body.password, data.get('password')).then(function (correctPassword) {
                if (correctPassword) {
                    res.status(200).json({
                        token: {
                            key: _this.createTokenKey(data.get('_id').toHexString()),
                            expiresIn: _this._config.tokenExpirationTime
                        }
                    });
                }
                else {
                    res.status(401).json({
                        message: 'Error:  Invalid Email Or Password.'
                    });
                }
            }).catch(function (err) {
                res.status(500).json({
                    message: 'Error: Password Verification Process Failed.'
                });
            });
        }).catch(function (err) {
            console.log(err);
            res.status(401).json({
                message: 'Error: Invalid Email Or Password.'
            });
        });
    };
    UserRouter.prototype.routes = function () {
        var _this = this;
        this._router.route('/').get(function (req, res) { return _this.getUsers(req, res); });
        this._router.route('/create').post(function (req, res) { return _this.createUser(req, res); });
        this._router.route('/login').post(function (req, res) { return _this.loginUser(req, res); });
    };
    return UserRouter;
}());
exports.default = new UserRouter().router;
//# sourceMappingURL=user-router.js.map