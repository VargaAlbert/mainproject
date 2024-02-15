/**
 * CORS (Cross-Origin Resource Sharing) options for middleware configuration.
 *
 * @typedef {Object} CorsOptions
 * @property {function} origin - A function that checks whether a given origin is allowed.
 * @property {number} optionsSuccessStatus - The HTTP status code to be sent for a successful preflight request.
 */

import WHITE_LIST from "./allowedOrigins.mjs";

/**
 * CORS options for middleware configuration.
 *
 * @type {CorsOptions}
 */
const corsOptions = {
    /**
     * A function that checks whether a given origin is allowed.
     *
     * @param {string} origin - The origin to be checked.
     * @param {function} callback - The callback function to be called with the result.
     */
    origin: (origin, callback) => {
        if (WHITE_LIST.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    /**
     * The HTTP status code to be sent for a successful preflight request.
     * @type {number}
     */
    optionsSuccessStatus: 200,
};

export default corsOptions;