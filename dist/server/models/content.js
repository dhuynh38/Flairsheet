"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var contentSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        lowercase: true
    },
    titleOriginal: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contentType: {
        type: String,
        required: true,
    },
    major: {
        type: String,
        required: true,
        lowercase: true,
    },
    minor: {
        type: String,
        required: true,
        lowercase: true
    },
    comments: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Comment'
        }],
    suggestions: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Suggestion'
        }],
    requests: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Request'
        }],
    views: {
        type: Number,
        default: 0,
        min: 0
    },
    upvotes: {
        type: Number,
        default: 0,
        min: 0
    },
    downvotes: {
        type: Number,
        default: 0,
        min: 0
    },
    file: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
});
contentSchema.index({ title: 1, author: 1 }, { unique: true });
exports.default = mongoose_1.model('Content', contentSchema);
//# sourceMappingURL=content.js.map