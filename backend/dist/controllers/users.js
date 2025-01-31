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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.signout = exports.deleteUser = exports.updateUser = exports.currentuser = exports.signin = exports.signup = void 0;
const usermodel_1 = __importDefault(require("../models/usermodel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const bcrypt = __importStar(require("bcrypt"));
function Errors(err) {
    const errs = {
        username: "",
        email: "",
        phone: "",
        role: "",
        password: ""
    };
    if (err.message.includes("users validation failed")) {
        Object.values(err.errors).forEach((err) => {
            errs[err.properties.path] = err.message;
        });
    }
    if (err.code === 11000) {
        if (err.keyPattern.email) {
            errs.email = "Email already in user";
        }
        if (err.keyPattern.phone) {
            errs.phone = "Phone number already exists";
        }
    }
    return errs;
}
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, phone, role, password } = req.body;
    if (!username || !email || !phone || !role || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const user_id = (0, uuid_1.v4)();
    try {
        const createUser = yield usermodel_1.default.create({
            user_id,
            username,
            email,
            phone,
            role,
            password
        });
        const token = jsonwebtoken_1.default.sign({ id: createUser.user_id }, "test1234", { expiresIn: "7d" });
        res.cookie("authtoken", token, { maxAge: 7 * 24 * 60 * 60 * 1000, path: "/", secure: true, httpOnly: true });
        return res.status(201).json({
            message: "Account created",
            user: createUser,
            token
        });
    }
    catch (err) {
        console.log(Errors(err));
        console.log(err);
        return res.status(400).json(Errors(err));
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const user = yield usermodel_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "No account found with this email. Please double-check or sign up." });
        }
        const matchPassword = yield bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(400).json({ message: "wrong password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.user_id }, "test1234", { expiresIn: "7d" });
        res.cookie("authtoken", token, { maxAge: 7 * 24 * 60 * 60 * 1000, path: "/", secure: true, httpOnly: true });
        return res.status(200).json({
            message: "User retrieved successfully",
            user,
            token
        });
    }
    catch (e) {
        console.log(e.message);
        return res.status(500).json({
            err: "internal server error",
            details: e.message
        });
    }
});
exports.signin = signin;
const currentuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.id;
        const user = yield usermodel_1.default.findOne({ user_id: id });
        return res.status(200).json(user);
    }
    catch (e) {
        console.log(e.message);
        return res.status(500).json({
            err: "internal server error",
            details: e.message
        });
    }
});
exports.currentuser = currentuser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, phone, role, password } = req.body;
    const id = req.id;
    try {
        const updatedUser = yield usermodel_1.default.findOneAndUpdate({ user_id: id }, { username, email, phone, role, password: yield bcrypt.hash(password, yield bcrypt.genSalt(10)) }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });
    }
    catch (err) {
        console.log(Errors(err));
        return res.status(400).json(Errors(err));
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.id;
    try {
        const deletedUser = yield usermodel_1.default.findOneAndDelete({ user_id: id });
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.clearCookie("authtoken");
        return res.status(200).json({
            message: "User deleted successfully"
        });
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({
            err: "Internal server error",
            details: err.message
        });
    }
});
exports.deleteUser = deleteUser;
const signout = (req, res) => {
    res.clearCookie("authtoken");
    return res.status(200).json({
        message: "Signed out successfully"
    });
};
exports.signout = signout;
