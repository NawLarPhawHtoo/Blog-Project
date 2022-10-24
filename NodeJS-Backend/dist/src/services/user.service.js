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
exports.passwordChangeService = exports.deleteUserService = exports.updateUserService = exports.createUserService = exports.findUserService = exports.getUserService = void 0;
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUserService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        if (!users) {
            return res.status(404).send({
                error: "User not found",
            });
        }
        else {
            res.json({
                message: "Users Fetched",
                data: users,
                status: 1,
            });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.getUserService = getUserService;
const findUserService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        if (!user) {
            const error = Error("Not Found");
            error.statusCode = 401;
        }
        res.json({
            data: user,
            status: 1,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.findUserService = findUserService;
const createUserService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(JSON.stringify(req.body.basic));
        // console.log(req.body.profile);
        // console.log(JSON.stringify(req.body.contact));
        // console.log(JSON.stringify(req.body.education));
        const errors = (0, express_validator_1.validationResult)(req.body);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 401;
            throw error;
        }
        let profile = req.body.profile;
        if (req.file) {
            profile = req.file.path.replace("\\", "/");
        }
        let basic = {
            name: req.body.name,
            email: req.body.email,
            // password: req.body.password
            password: yield bcrypt_1.default.hash(req.body.password, 12)
        };
        let contact = {
            birthday: req.body.birthday,
            gender: req.body.gender,
            address: req.body.address,
            type: req.body.type,
            phone: req.body.phone
        };
        let education = {
            skill: req.body.skill,
            experience: req.body.experience
        };
        const userTo = {
            basic,
            profile: profile,
            contact,
            education,
            created_user_id: req.body.created_user_id,
        };
        const user = new User_1.default(userTo);
        const result = yield user.save();
        res.status(201).json({
            message: "Created User successfully!",
            data: result,
            status: 1,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createUserService = createUserService;
const updateUserService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByIdAndUpdate(req.params.id);
        if (!user) {
            const error = Error("Not Found");
            error.statusCode = 401;
        }
        let profile = req.body.profile;
        if (req.file) {
            {
                profile = req.file.path.replace("\\", "/");
            }
            if (profile) {
                user.profile = profile;
            }
        }
        let basic = {
            name: req.body.name,
            email: req.body.email,
            password: yield bcrypt_1.default.hash(req.body.password, 12)
        };
        let contact = {
            birthday: req.body.birthday,
            gender: req.body.gender,
            address: req.body.address,
            type: req.body.type,
            phone: req.body.phone
        };
        let education = {
            skill: req.body.skill,
            experience: req.body.experience
        };
        user.basic = basic;
        console.log(user.basic);
        user.contact = contact;
        console.log(user.contact);
        user.education = education;
        console.log(user.education);
        user.profile = profile;
        user.created_user_id = req.body.created_user_id;
        user.updated_user_id = req.body.updated_user_id;
        const result = yield user.save();
        res.json({
            message: "Updated user successfully!",
            data: result,
            status: 1,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateUserService = updateUserService;
const deleteUserService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByIdAndRemove(req.params.id);
        if (!user) {
            const error = Error("Not Found");
            error.statusCode = 401;
        }
        res.json({
            message: "User deleted successfully!",
            data: user,
            status: 1,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteUserService = deleteUserService;
const passwordChangeService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params.id);
        const user = yield User_1.default.findById(req.params.id);
        console.log(user);
        const { oldPassword, newPassword, confirmPassword } = req.body;
        console.log(oldPassword);
        console.log(newPassword);
        console.log(confirmPassword);
        //Check required fields
        if (!oldPassword || !newPassword || !confirmPassword) {
            res.json({ message: "Please fill in all fields." });
        }
        //Check passwords match
        if (newPassword !== confirmPassword) {
            res.json({ message: "New password do not match." });
        }
        else {
            //Validation Passed
            const isMatch = yield bcrypt_1.default.compare(oldPassword, user.basic.password);
            console.log(user.basic.password);
            console.log(isMatch);
            if (isMatch) {
                //Update password for user with new password
                bcrypt_1.default.genSalt(12, (err, salt) => bcrypt_1.default.hash(newPassword, salt, (err, hash) => {
                    if (err) {
                        throw err;
                    }
                    user.password = hash;
                    user.save();
                }));
                res.json({ message: "Password Successfully Updated!", data: user, status: 1 });
            }
            else {
                res.json({ message: "Current Password is not match." });
            }
        }
    }
    catch (err) {
        res.json({ message: "Password does not match" });
    }
});
exports.passwordChangeService = passwordChangeService;
