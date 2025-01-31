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
exports.default = useAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usermodel_1 = __importDefault(require("../models/usermodel"));
function useAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies.authtoken || (req.headers["authorization"] && req.headers["authorization"].split(" ")[1]);
        if (!token) {
            console.log("error");
            return res.status(400).json({ message: "Please provide token" });
        }
        try {
            const verify = jsonwebtoken_1.default.verify(token, "test1234");
            if (!verify) {
                return res.status(400).json({ message: "either your token is invalid or expired please sign in" });
            }
            const user = yield usermodel_1.default.findOne({ user_id: verify.id });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            req.id = user.user_id;
            return next();
        }
        catch (e) {
            console.log(e.message);
            return res.status(500).json({
                err: "Internal server error",
                details: e.message
            });
        }
    });
}
