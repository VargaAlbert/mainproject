import express from 'express';
import cookieParser from 'cookie-parser';
import path from "path";
import cors from 'cors';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import corsOptions from './config/corsOptions.mjs';
import connectDB from './config/dbConnection.mjs';

import { logger, handleMongoDBConnection } from './middleware/logEvents.mjs';
import errorHandler from './middleware/errorHandler.mjs';
import verifyJWT from './middleware/verifyJWT.mjs';
import credentials from './middleware/credentials.mjs';

import router from './routes/root.mjs';
import register from './routes/register.mjs';
import authentication from './routes/auth.mjs';
import refresh from './routes/refresh.mjs';
import products from './routes/api/products.mjs';
import logout from './routes/logout.mjs';
import users from './routes/api/users.mjs';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5005;

/**
 * Connects to the MongoDB database.
 *
 * @function
 * @name connectDB
 */
connectDB();

// - Custom middleware logger
app.use(logger);

// - And fetch cookies credentials requirement
app.use(credentials);

// - Cross Origin Resource Sharing
app.use(cors(corsOptions));

// - Built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// - Built-in middleware for json
app.use(express.json());

// - Middleware for cookies
app.use(cookieParser());

// - Serve static files
app.use(express.static(path.join(__dirname, '/public')));

// - Routes
app.use('/', router);
app.use('/register', register);
app.use('/auth', authentication);
app.use('/refresh', refresh);
app.use('/logout', logout);
app.use('/products', products);

app.use(verifyJWT);
app.use('/users', users);

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

/**
 * Handles errors in the application.
 *
 * @function
 * @name errorHandler
 */
app.use(errorHandler);

/**
 * Handles MongoDB connection events and logs messages.
 *
 * @function
 * @param {string} event - The MongoDB connection event ('connected', 'error', 'disconnected').
 * @param {string} message - The custom message to be logged.
 * @returns {void}
 */
handleMongoDBConnection('connected', 'MongoDB connected successfully!');
handleMongoDBConnection('error', 'MongoDB connection error');
handleMongoDBConnection('disconnected', 'MongoDB disconnected');

/**
 * Listens for the MongoDB connection and starts the server.
 *
 * @event mongoose.connection.once
 * @type {string}
 */
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
