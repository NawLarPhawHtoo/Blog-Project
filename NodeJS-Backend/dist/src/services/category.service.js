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
exports.deleteCategoryService = exports.updateCategoryService = exports.findCategoryService = exports.createCategoryService = exports.getCategoryService = void 0;
const express_validator_1 = require("express-validator");
const Category_1 = __importDefault(require("../models/Category"));
const getCategoryService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category_1.default.find();
        if (categories) {
            res.json({
                message: "Category Fetched",
                data: categories,
                status: 1
            });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.getCategoryService = getCategoryService;
const createCategoryService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req.body);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        const categoryTdo = req.body;
        const category = new Category_1.default(categoryTdo);
        const result = yield category.save();
        res
            .status(201)
            .json({ message: "Created Category Successfully!", data: result, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.createCategoryService = createCategoryService;
const findCategoryService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.default.findById(req.params.id);
        if (!category) {
            const error = Error("Not Found!");
            error.statusCode = 404;
            throw error;
        }
        res.json({ data: category, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.findCategoryService = findCategoryService;
const updateCategoryService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req.body);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        const category = yield Category_1.default.findByIdAndUpdate(req.params.id);
        if (!category) {
            const error = new Error("Not Found!");
            error.statusCode = 404;
            throw error;
        }
        const categoryList = req.body;
        category.categoryList = categoryList;
        const result = yield category.save();
        res.json({ message: "Updated Successfully!", data: result, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.updateCategoryService = updateCategoryService;
const deleteCategoryService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.default.findByIdAndRemove(req.params.id);
        if (!category) {
            const error = Error("Not Found");
            error.statusCode = 401;
        }
        res.json({
            message: "Category deleted successfully!",
            data: category,
            status: 1,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteCategoryService = deleteCategoryService;
