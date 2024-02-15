import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

/**
 * Connects to the MongoDB database using Mongoose.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves once the connection is established.
 * @throws {Error} Throws an error if the connection fails.
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {});
    } catch (err) {
        console.error(err);
        throw new Error('Database connection failed');
    }
}

export default connectDB;
