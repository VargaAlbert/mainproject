import express from "express";
import handleRefreshToken from "../controllers/refreshTokenController.mjs";

/**
 * Express Router for handling refresh token-related routes.
 *
 * @type {express.Router}
 */
const router = express.Router();

/**
 * Route for handling the refresh token.
 *
 * @name /api/refresh
 * @function
 * @memberof router
 * @inner
 * @param {Function} handleRefreshToken - Controller function for handling the refresh token.
 */
router.get('/', handleRefreshToken);

export default router;
