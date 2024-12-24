import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
    content: string;
    createdAt: Date;
}

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: true,
    },

    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        match: [
            /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
            "please use a valid email address",
        ],
    },

    password: {
        type: String,
        required: [true, "Password is required"],
    },

    verifyCode: {
        required: [true, "verify code is required"],
    },

    verifyCodeExpiry: {
        type: Date,
        required: [true, "verify code expiry is required"],
    },

    isVerified: {
        type: Boolean,
        default: false,
    },
});

const UserModel =
    mongoose.models.User<User> || mongoose.model<User>("User", UserSchema);

export default UserModel;
