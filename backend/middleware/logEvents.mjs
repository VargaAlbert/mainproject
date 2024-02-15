import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import { promises as fsPromises, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Logs events with a timestamp, unique identifier, and a custom message to a file.
 *
 * @function
 * @async
 * @param {string} message - The custom message to be logged.
 * @param {string} logName - The name of the log file.
 * @returns {Promise<void>} A promise that resolves once the logging is complete.
 */
const logEvents = async (message, logName) => {
    const logsDir = path.join(__dirname, '..', 'logs');
    const logFile = path.join(logsDir, logName);
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!existsSync(logsDir)) {
            mkdirSync(logsDir, { recursive: true });
        }
        await fsPromises.appendFile(logFile, logItem);
    } catch (err) {
        console.error(err);
    }
};

/**
 * Middleware for logging incoming requests.
 *
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next function.
 * @returns {void}
 */
const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}

/**
 * Logs MongoDB connection events to a file.
 *
 * @function
 * @param {string} message - The custom message to be logged.
 * @returns {void}
 */
const logMongoDBConnect = (message) => {
    const logsDir = path.join(__dirname, '..', 'logs');
    const logFile = path.join(logsDir, 'dbconnectLog.txt');
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!existsSync(logsDir)) {
            mkdirSync(logsDir, { recursive: true });
        }
        fsPromises.appendFile(logFile, logItem);
    } catch (err) {
        console.error(err);
    }
};

/**
 * Handles MongoDB connection events and logs messages.
 *
 * @param {string} event - The MongoDB connection event ('connected', 'error', 'disconnected').
 * @param {string} message - The custom message to be logged.
 * @returns {void}
 */
const handleMongoDBConnection = (event, message) => {
    mongoose.connection.on(event, () => {
        logMongoDBConnect(message);
        if (event === 'error' || event === 'disconnected') {
            console.error(`MongoDB connection ${event}: ${message}`);
        } else {
            console.log(`MongoDB connection ${event}: ${message}`);
        }
    });
};

export { logEvents, logger, handleMongoDBConnection };
