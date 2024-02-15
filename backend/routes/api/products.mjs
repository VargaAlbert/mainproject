import express from 'express';
import ProductsController from '../../controllers/productsController.mjs';
import ROLES_LIST from '../../config/rolesList.mjs';
import verifyRoles from '../../middleware/verifyRoles.mjs';

/**
 * Express Router for handling product-related routes.
 *
 * @type {express.Router}
 */
const router = express.Router();

/**
 * Route for handling the collection of products.
 *
 * @name /api/products
 * @function
 * @memberof router
 * @inner
 */
router.route('/')
    .get(ProductsController.getAllProducts)
    /**
     * Create a new product.
     *
     * @name POST /api/products
     * @function
     * @memberof router
     * @inner
     * @param {Function} verifyRoles - Middleware for verifying user roles.
     * @param {Function} ProductsController.createNewProduct - Controller function for creating a new product.
     */
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), ProductsController.createNewProduct)
    /**
     * Update an existing product.
     *
     * @name PUT /api/products
     * @function
     * @memberof router
     * @inner
     * @param {Function} verifyRoles - Middleware for verifying user roles.
     * @param {Function} ProductsController.updateProduct - Controller function for updating a product.
     */
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), ProductsController.updateProduct)
    /**
     * Delete a product.
     *
     * @name DELETE /api/products
     * @function
     * @memberof router
     * @inner
     * @param {Function} verifyRoles - Middleware for verifying user roles.
     * @param {Function} ProductsController.deleteProduct - Controller function for deleting a product.
     */
    .delete(verifyRoles(ROLES_LIST.Admin), ProductsController.deleteProduct);

/**
 * Route for handling a specific product by ID.
 *
 * @name /api/products/:id
 * @function
 * @memberof router
 * @inner
 * @param {Function} ProductsController.getProduct - Controller function for retrieving a product by ID.
 */
router.route('/:id')
    .get(ProductsController.getProduct);

export default router;

