"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes/routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
mongoose_1.default.connect("mongodb://localhost:27017/lumipin");
const db = mongoose_1.default.connection;
db.on("error", () => console.log("Failed to connect to mongodb"));
db.once("open", () => {
    app.listen(8080, '0.0.0.0', () => console.log("Server connected and running"));
    app.use(routes_1.default);
});
