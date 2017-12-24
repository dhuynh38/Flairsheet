"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    usernameOriginal: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    myContents: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Content'
        }],
    myComments: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Comment'
        }],
    mySuggestions: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Suggestion'
        }],
    myRequests: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Request'
        }],
});
exports.default = mongoose_1.model('User', userSchema);
//# sourceMappingURL=user.js.map