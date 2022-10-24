"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controllers/category.controller");
const router = express_1.default.Router();
router
    .route("/")
    .get(category_controller_1.getCategories);
router
    .route("/create")
    .post(category_controller_1.createCategory);
router
    .route("/read/:id")
    .get(category_controller_1.findCategory);
router
    .route("/update/:id")
    .put(category_controller_1.updateCategory);
router
    .route("/delete/:id")
    .delete(category_controller_1.deleteCategory);
exports.default = router;
