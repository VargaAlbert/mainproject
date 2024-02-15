import express from 'express';
import ProductsController from '../../controllers/productsController.mjs';
import ROLES_LIST from '../../config/rolesList.mjs';
import verifyRoles from '../../middleware/verifyRoles.mjs';

const router = express.Router();

router.route('/')
    .get(ProductsController.getAllProducts)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), ProductsController.createNewProduct)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), ProductsController.updateProduct)
    .delete(verifyRoles(ROLES_LIST.Admin), ProductsController.deleteProduct);

router.route('/:id')
    .get(ProductsController.getProduct);

export default router;
