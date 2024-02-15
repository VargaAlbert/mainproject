import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Middleware for verifying JSON Web Tokens (JWT) in the request headers.
 *
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next function.
 * @returns {void}
 */
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // Check if the Authorization header starts with 'Bearer '
    if (!authHeader?.startsWith('Bearer ')) {
        return res.sendStatus(401); // Unauthorized
    }

    const token = authHeader.split(' ')[1];

    // Verify the JWT
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.sendStatus(403); // Forbidden (invalid token)
            }

            // Attach user information and roles to the request object
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;

            next();
        }
    );
}

export default verifyJWT;
