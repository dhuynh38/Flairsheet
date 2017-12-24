"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var suggestionSchema = new mongoose_1.Schema({
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
    suggestion: {
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
exports.default = mongoose_1.model('Suggestion', suggestionSchema);
//# sourceMappingURL=suggestion.js.map