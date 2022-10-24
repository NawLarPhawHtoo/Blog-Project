"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    category_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        autopopulate: true
    },
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    description: {
        type: String,
    },
    content: {
        type: String,
    },
    reference: {
        type: String,
    },
    postImage: {
        type: String,
        default: ''
    },
    created: { type: Date },
    updated: { type: Date, default: Date.now },
}, {
    timestamps: true
});
postSchema.plugin(require('mongoose-autopopulate'));
exports.default = (0, mongoose_1.model)("Post", postSchema);
