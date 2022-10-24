"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostByCategoryService = exports.deletePostService = exports.updatePostService = exports.findPostService = exports.createPostService = exports.getPostService = void 0;
const express_validator_1 = require("express-validator");
const Post_1 = __importDefault(require("../models/Post"));
const getPostService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.default.find();
        if (posts) {
            res.json({
                message: "Post Fetched",
                data: posts,
                status: 1
            });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.getPostService = getPostService;
const createPostService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req.body);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        const postTdo = req.body;
        const post = new Post_1.default(postTdo);
        const result = yield post.save();
        res
            .status(201)
            .json({ message: "Created  Post Successfully!", data: result, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.createPostService = createPostService;
const findPostService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.id);
        if (!post) {
            const error = Error("Not Found!");
            error.statusCode = 404;
            throw error;
        }
        res.json({ data: post, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.findPostService = findPostService;
const updatePostService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req.body);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        const post = yield Post_1.default.findByIdAndUpdate(req.params.id);
        if (!post) {
            const error = new Error("Not Found!");
            error.statusCode = 404;
            throw error;
        }
        const postList = req.body;
        post.postList = postList;
        const result = yield post.save();
        res.json({ message: "Updated Successfully!", data: result, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.updatePostService = updatePostService;
const deletePostService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findByIdAndRemove(req.params.id);
        if (!post) {
            const error = Error("Not Found");
            error.statusCode = 401;
        }
        res.json({
            message: "Post deleted successfully!",
            data: post,
            status: 1,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deletePostService = deletePostService;
const getPostByCategoryService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.default.find({ category: req.params.category_id });
        if (posts) {
            res.json({
                message: "Get Posts by Category",
                data: posts,
                status: 1
            });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.getPostByCategoryService = getPostByCategoryService;
