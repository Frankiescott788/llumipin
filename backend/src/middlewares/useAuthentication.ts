import { Request, Response, NextFunction } from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import usermodel from "../models/usermodel";

export default async function useAuth (req : Request, res : Response, next : NextFunction): Promise<Response | void>{

    const token = req.cookies.authtoken || (
        req.headers["authorization"] && (req.headers["authorization"] as string).split(" ")[1]
    );

    if (!token) {
        console.log("error")
        return res.status(400).json({ message : "Please provide token" });
    }

    try {
        const verify = jwt.verify(token, "test1234") as JwtPayload
        if (!verify) {
            return res.status(400).json({ message : "either your token is invalid or expired please sign in" });
        }
        const user = await usermodel.findOne({user_id : verify.id});

        if (!user) {
            return res.status(404).json({ message : "User not found" });
        }

        req.id = user.user_id
        return next();
    } catch (e : any) {
        console.log(e.message);
        return res.status(500).json({
            err : "Internal server error",
            details : e.message
        })
    }
}