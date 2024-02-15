import express from 'express';

import usersController from '../../controllers/usersController.mjs';
import ROLES_LIST from '../../config/rolesList.mjs';
import verifyRoles from '../../middleware/verifyRoles.mjs';

const router = express.Router();


router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
    .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser);

export default router;