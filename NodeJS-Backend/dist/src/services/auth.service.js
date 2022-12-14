"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.passwordChangeService = exports.passwordResetService = exports.forgetPasswordService = exports.logoutService = exports.loginService = void 0;
const bcrypt_1 = __importStar(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const password_reset_1 = __importDefault(require("../models/password.reset"));
const sendEmail_1 = require("../utils/sendEmail");
const loginService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ basic: { email: req.body.email } });
    console.log({ basic: { password: req.body.password } });
    yield User_1.default.findOne({ 'basic.email': req.body.email }).then((user) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(user);
        if (!user) {
            return res.status(401).send({
                success: false,
                message: 'Could not find user'
            });
        }
        console.log(user.basic.password);
        if (!(0, bcrypt_1.compareSync)(req.body.password, user.basic.password)) {
            return res.status(401).send({
                success: false,
                message: 'Incorrect Password'
            });
        }
        const payload = {
            email: yield (user.email, 12),
            id: yield (user.id, 12)
        };
        const token = jsonwebtoken_1.default.sign(payload, 'secrect', { expiresIn: '1d' });
        return res.status(200).send({
            success: true,
            message: 'Login Successfully!',
            users: user,
            token: token
        });
    }));
});
exports.loginService = loginService;
const logoutService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session = null;
    return res.status(200).json({
        success: true,
        message: "Logout Successfully!"
    });
});
exports.logoutService = logoutService;
const forgetPasswordService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield User_1.default.findOne({ 'basic.email': req.body.email });
        if (!user)
            return res.status(400).send("Email does not exist");
        let token = yield password_reset_1.default.findOne({ 'basic.email': req.body.email });
        if (!token) {
            token = yield new password_reset_1.default({
                email: req.body.email,
                token: crypto_1.default.randomBytes(16).toString("hex"),
            }).save();
        }
        const link = `${process.env.BASE_URL}/forgot-password-update/${user._id}/${token.token}`;
        yield (0, sendEmail_1.sendEmail)((_a = user.basic) === null || _a === void 0 ? void 0 : _a.email, "Password reset", link);
        res.status(200).json({
            message: "Password reset link sent to your email account."
        });
    }
    catch (error) {
        res.send("An error occured");
    }
});
exports.forgetPasswordService = forgetPasswordService;
const passwordResetService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.body.userId);
        if (!user)
            return res.status(401).send("User Id does not exist");
        const passwordReset = yield password_reset_1.default.findOne({
            token: req.body.token
        });
        if (!passwordReset)
            return res.status(401).send("Invalid link or expired");
        console.log(req.body.password);
        user.basic.password = yield bcrypt_1.default.hash(req.body.password, 12);
        yield user.save();
        console.log(user);
        yield passwordReset.delete();
        res.json({
            message: "Password reset sucessfully."
        });
    }
    catch (error) {
        res.send("An error occured");
    }
});
exports.passwordResetService = passwordResetService;
const passwordChangeService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.default.findById(req.params.userId)
            .then((user) => __awaiter(void 0, void 0, void 0, function* () {
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: 'Could not find user'
                });
            }
            const token = req.params.token;
            if (!token)
                return res.status(401).send("Unauthorized");
            if (!(0, bcrypt_1.compareSync)(req.body.oldPassword, user.basic.password)) {
                return res.send({
                    success: false,
                    message: 'Incorrect password'
                });
            }
            if ((0, bcrypt_1.compareSync)(req.body.newPassword, user.basic.password)) {
                return res.send({
                    success: false,
                    message: 'Current Password and New Password are same.'
                });
            }
            user.basic.password = yield bcrypt_1.default.hash(req.body.newPassword, 12);
            yield user.save();
            res.json({ message: "Password Change Successfully!" });
        }));
    }
    catch (error) {
        res.send("An error occured");
    }
});
exports.passwordChangeService = passwordChangeService;
