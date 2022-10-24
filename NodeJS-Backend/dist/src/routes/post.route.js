"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("../controllers/post.controller");
const router = express_1.default.Router();
router
    .route("/")
    .get(post_controller_1.getPosts);
router
    .route("/create")
    .post(post_controller_1.createPost);
router
    .route("/read/:id")
    .get(post_controller_1.findPost);
router
    .route("/update/:id")
    .put(post_controller_1.updatePost);
router
    .route("/delete/:id")
    .delete(post_controller_1.deletePost);
router
    .route("/findbyCategory/:category_id")
    .get(post_controller_1.getPostByCategory);
exports.default = router;
