/**
 * Object containing token lifetimes for different token types.
 *
 * @typedef {Object} TokenLife
 * @property {string} REFRESH - The lifetime for refresh tokens (e.g., '1d' for 1 day).
 * @property {string} ACCESS - The lifetime for access tokens (e.g., '15s' for 15 seconds).
 */

/**
 * Token lifetimes for different token types.
 *
 * @type {TokenLife}
 */
const TOKEN_LIFE = {
    /**
     * The lifetime for refresh tokens.
     * @type {string}
     */
    'REFRESH': '1d',
    /**
     * The lifetime for access tokens.
     * @type {string}
     */
    'ACCESS': '15s',
};

export default TOKEN_LIFE;