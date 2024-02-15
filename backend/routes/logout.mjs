import express from "express";
import logoutController from '../controllers/logoutController.mjs';

/**
 * Express Router for handling logout-related routes.
 *
 * @type {express.Router}
 */
const router = express.Router();

/**
 * Route for handling user logout.
 *
 * @name /api/logout
 * @function
 * @memberof router
 * @inner
 * @param {Function} logoutController - Controller function for handling user logout.
 */
router.get('/', logoutController);

export default router;
