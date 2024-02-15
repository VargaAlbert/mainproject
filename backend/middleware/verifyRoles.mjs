/**
 * Middleware for verifying user roles against allowed roles.
 *
 * @function
 * @param {...string} allowedRoles - Allowed roles that the user must have at least one of.
 * @returns {Function} Express middleware function.
 */
const verifyRoles = (...allowedRoles) => {
    /**
     * Express middleware function for verifying user roles.
     *
     * @function
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Express next function.
     * @returns {void}
     */
    return (req, res, next) => {
        if (!req?.roles) {
            return res.sendStatus(401); // Unauthorized (no roles available)
        }

        const rolesArray = [...allowedRoles];
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);

        if (!result) {
            return res.sendStatus(401); // Unauthorized (roles do not match)
        }

        next();
    };
}

export default verifyRoles;
