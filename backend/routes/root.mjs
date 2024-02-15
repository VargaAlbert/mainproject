import express from 'express';
import path from 'path';

/**
 * Express Router for handling root and index routes.
 *
 * @type {express.Router}
 */
const router = express.Router();

/**
 * Route for serving the index page.
 *
 * @name /index
 * @function
 * @memberof router
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(new URL(import.meta.url).pathname, '..', 'views', 'index.html'));
});

export default router;
