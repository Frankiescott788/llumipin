import {Request, Response} from "express";
import {User} from "../types";
import UserModel from "../models/usermodel";
import jwt from "jsonwebtoken";
import {v4} from "uuid";
import * as bcrypt from "bcrypt";
import {genSalt} from "bcrypt";


function Errors(err: any) {

    const errs : any = {
        username: "",
        email: "",
        phone: "",
        role: "",
        password: ""
    }
    if (err.message.includes("users validation failed")) {
        Object.values(err.errors).forEach((err: any) => {
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


    return errs
}

export const signup = async (req: Request, res: Response): Promise<Response> => {
    const {username, email, phone, role, password}: User = req.body;
    if (!username || !email || !phone || !role || !password) {
        return res.status(400).json({message: "All fields are required"});
    }

    const user_id = v4();

    try {
        const createUser = await UserModel.create(<User>{
            user_id,
            username,
            email,
            phone,
            role,
            password
        });

        const token = jwt.sign({id: createUser.user_id}, "test1234", {expiresIn: "7d"});
        res.cookie("authtoken", token, { maxAge: 7 * 24 * 60 * 60 * 1000, path : "/", secure : true, httpOnly : true })
        return res.status(201).json({
            message: "Account created",
            user: createUser,
            token
        })

    } catch (err: any) {
        console.log(Errors(err));
        console.log(err)
        return res.status(400).json(Errors(err));
    }
}

export const signin = async (req : Request, res : Response): Promise<Response> => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message : "All fields are required" })
    }
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message : "No account found with this email. Please double-check or sign up." });
        }

        const matchPassword = await bcrypt.compare(password, user.password as string);
        if (!matchPassword) {
            return res.status(400).json({ message : "wrong password" });
        }

        const token = jwt.sign({ id : user.user_id}, "test1234", { expiresIn : "7d" });
        res.cookie("authtoken", token, { maxAge: 7 * 24 * 60 * 60 * 1000, path : "/", secure : true, httpOnly : true })
        return res.status(200).json({
            message : "User retrieved successfully",
            user,
            token
        });

    } catch (e : any) {
        console.log(e.message);
        return res.status(500).json({
            err : "internal server error",
            details : e.message
        })
    }
}

export const currentuser = async (req : Request, res : Response): Promise<Response> => {
    try {
        const id = req.id;
        const user = await UserModel.findOne({user_id : id});
        return res.status(200).json(user);
    } catch (e : any) {
        console.log(e.message)
        return res.status(500).json({
            err : "internal server error",
            details : e.message
        })
    }
}
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const { username, email, phone, role, password }: User = req.body;
    const id = req.id;
    try {
        const updatedUser = await UserModel.findOneAndUpdate({ user_id : id }, { username, email, phone, role, password : await bcrypt.hash(password,  await bcrypt.genSalt(10)) }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (err: any) {
        console.log(Errors(err));
        return res.status(400).json(Errors(err));
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const id = req.id;

    try {
        const deletedUser = await UserModel.findOneAndDelete({ user_id : id });
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.clearCookie("authtoken");
        return res.status(200).json({
            message: "User deleted successfully"
        });
    } catch (err: any) {
        console.log(err.message);
        return res.status(500).json({
            err: "Internal server error",
            details: err.message
        });
    }
}
export const signout = (req: Request, res: Response): Response => {
    res.clearCookie("authtoken");
    return res.status(200).json({
        message: "Signed out successfully"
    });
}