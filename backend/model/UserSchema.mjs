import mongoose, { Schema, Document } from "mongoose";
import ROLES_LIST from "../config/rolesList.mjs";

/**
 * @typedef {Object} User
 * @property {string} username - The username of the user.
 * @property {Object} roles - The roles assigned to the user.
 * @property {number} roles.User - The role value for a regular user.
 * @property {number} roles.Editor - The role value for an editor.
 * @property {number} roles.Admin - The role value for an admin.
 * @property {string} password - The hashed password of the user.
 * @property {string[]} refreshToken - Array of refresh tokens associated with the user.
 */

/**
 * Mongoose schema for the User model.
 *
 * @type {Schema<User & Document>}
 */
const userSchema = new Schema({
    username: {
        type: String,
        required: true
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
        required: true
    },
    refreshToken: [String]
});

/**
 * Mongoose model for the User schema.
 *
 * @type {import("mongoose").Model<User & Document>}
 */
const UserModel = mongoose.model('User', userSchema);

export default UserModel;
