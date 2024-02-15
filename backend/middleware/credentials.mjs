import WHITE_LIST from "../config/allowedOrigins.mjs";

/**
 * Middleware for handling Cross-Origin Resource Sharing (CORS) credentials.
 *
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next function.
 * @returns {void}
 */
const credentials = (req, res, next) => {
    const origin = req.headers.origin;

    // Check if the request origin is in the allowed whitelist
    if (WHITE_LIST.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }

    next();
}

export default credentials;