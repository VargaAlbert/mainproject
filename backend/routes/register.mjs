import express from "express";
import handleNewUser from '../controllers/registerController.mjs';

/**
 * Express Router for handling user registration-related routes.
 *
 * @type {express.Router}
 */
const router = express.Router();

/**
 * Route for handling user registration.
 *
 * @name /api/register
 * @function
 * @memberof router
 * @inner
 * @param {Function} handleNewUser - Controller function for handling user registration.
 */
router.post('/', handleNewUser);

export default router;
