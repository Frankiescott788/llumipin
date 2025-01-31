import express from "express";
import mongoose from "mongoose";
import router from "./routes/routes";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express()
app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());


mongoose.connect("mongodb://localhost:27017/lumipin")

const db = mongoose.connection;
db.on("error", () => console.log("Failed to connect to mongodb"));
db.once("open", () => {
    app.listen(8080, '0.0.0.0',() => console.log("Server connected and running"));
    app.use(router)
});
