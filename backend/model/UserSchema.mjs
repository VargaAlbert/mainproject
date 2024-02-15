import mongoose, { Schema } from "mongoose";
import ROLES_LIST from "../config/rolesList.mjs";

const userSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    roles: {
        User: {
            type: Number,
            default: ROLES_LIST.User
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        require: true
    },
    refreshToken: [String]
});

export default mongoose.model('User', userSchema);