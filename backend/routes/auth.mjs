import express from "express";
import handleLogin from '../controllers/authController.mjs';

/**
 * Express Router for handling authentication-related routes.
 *
 * @type {express.Router}
 */
const router = express.Router();

/**
 * Route for handling user login.
 *
 * @name /api/auth
 * @function
 * @memberof router
 * @inner
 * @param {Function} handleLogin - Controller function for handling user login.
 */
router.post('/', handleLogin);

export default router;
