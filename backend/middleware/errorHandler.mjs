import { logEvents } from './logEvents.mjs';

/**
 * Middleware for handling errors and logging them to a file.
 *
 * @function
 * @param {Error} err - The error object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next function.
 * @returns {void}
 */
const errorHandler = (err, req, res, next) => {
    // Log the error to a file using the logEvents function
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt');

    // Log the error stack trace to the console
    console.error(err.stack);

    // Send a 500 Internal Server Error response with the error message
    res.status(500).send(err.message);
}

export default errorHandler;
