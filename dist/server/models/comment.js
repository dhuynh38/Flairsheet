"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var commentSchema = new mongoose_1.Schema({
    content: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Content',
        required: true
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comment: {
        type: String,
        required: true
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
});
exports.default = mongoose_1.model('Comment', commentSchema);
//# sourceMappingURL=comment.js.map