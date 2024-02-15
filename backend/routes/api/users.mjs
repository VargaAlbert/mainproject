import express from 'express';
import usersController from '../../controllers/usersController.mjs';
import ROLES_LIST from '../../config/rolesList.mjs';
import verifyRoles from '../../middleware/verifyRoles.mjs';

/**
 * Express Router for handling user-related routes.
 *
 * @type {express.Router}
 */
const router = express.Router();

/**
 * Route for handling the collection of users.
 *
 * @name /api/users
 * @function
 * @memberof router
 * @inner
 */
router.route('/')
    /**
     * Get all users.
     *
     * @name GET /api/users
     * @function
     * @memberof router
     * @inner
     * @param {Function} verifyRoles - Middleware for verifying user roles.
     * @param {Function} usersController.getAllUsers - Controller function for retrieving all users.
     */
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
    /**
     * Delete a user.
     *
     * @name DELETE /api/users
     * @function
     * @memberof router
     * @inner
     * @param {Function} verifyRoles - Middleware for verifying user roles.
     * @param {Function} usersController.deleteUser - Controller function for deleting a user.
     */
    .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

/**
 * Route for handling a specific user by ID.
 *
 * @name /api/users/:id
 * @function
 * @memberof router
 * @inner
 * @param {Function} verifyRoles - Middleware for verifying user roles.
 * @param {Function} usersController.getUser - Controller function for retrieving a user by ID.
 */
router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser);

export default router;