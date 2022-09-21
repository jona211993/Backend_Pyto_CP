import { Router } from "express";
import * as userCtrl from "../controllers/user.controller";
import { isAdmin, verifyToken } from "../middlewares/authJwt";
import { checkExistingUser } from "../middlewares/verifySignUp";

const router = Router();

router.post("/", [verifyToken, isAdmin, checkExistingUser], userCtrl.createUser);

export default router;