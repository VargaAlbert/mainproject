import express from "express";
import logoutController from '../controllers/logoutController.mjs'

const router = express.Router();

router.get('/', logoutController);

export default router;