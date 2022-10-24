"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
router
    .route("/")
    .get(user_controller_1.getUsers);
router
    .route("/create")
    .post(user_controller_1.createUser);
router
    .route("/read/:id")
    .get(user_controller_1.findUser);
router
    .route("/update/:id")
    .put(user_controller_1.updateUser);
router
    .route("/delete/:id")
    .delete(user_controller_1.deleteUser);
router
    .route("/password-change/:id")
    .post(user_controller_1.passwordChange);
exports.default = router;
