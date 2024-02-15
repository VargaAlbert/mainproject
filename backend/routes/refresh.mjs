import express from "express";
import handleRefreshToken from "../controllers/refreshTokenController.mjs";

const router = express.Router();

router.get('/', handleRefreshToken);

export default router;