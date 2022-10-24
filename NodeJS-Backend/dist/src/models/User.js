"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const basicSchema = new mongoose_1.Schema({
    name: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        // required: true
    },
});
const contactSchema = new mongoose_1.Schema({
    phone: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: ""
    },
    birthday: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    },
});
const educationSchema = new mongoose_1.Schema({
    skill: {
        type: String,
        default: ""
    },
    experience: {
        type: String,
        default: ""
    },
});
const userSchema = new mongoose_1.Schema({
    basic: basicSchema,
    contact: contactSchema,
    education: educationSchema,
    profile: {
        type: String,
        default: ""
    },
    created_user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    updated_user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    deleted_user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    deleted_at: {
        type: Date
    }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("User", userSchema);
