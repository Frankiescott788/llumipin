import { Schema, model } from "mongoose";
import {User} from "../types";
import {isEmail} from "validator";
import * as bcrypt from "bcrypt";
import {genSalt} from "bcrypt";

const userSchema = new Schema<User>({
    user_id : {
        type : String,
        required : [true, "User id should be unique"],
        unique : true
    },
    username : {
        type : String,
        required : [true, "Username is required"]
    },
    email : {
        type : String,
        required : [true, "email is required"],
        unique : true,
        validate : [isEmail, "Please provide a valid email"]
    },
    phone : {
        type : Number,
        required : [true, "Phone is required"],
        unique : true
    },
    role : {
        type : String,
        required : [true, "role is required"]
    },
    password : {
        type : String,
        required : [true, "Email is required"],
        minLength : [6, "Password must have minimum of 6 characters"]
    }
}, { timestamps : true });

userSchema.pre('save', async function (next: any) {
    try {
        this.password = await bcrypt.hash(this.password, await genSalt(10));
        next();
    } catch (err: any) {
        next(err);
    }
});

const UserModel = model("users", userSchema);

export default UserModel;