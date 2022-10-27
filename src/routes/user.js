import { Router } from "express";
import * as userCtrl from "../controllers/user.controller";
import { isAdmin, verifyToken } from "../middlewares/authJwt";
import { checkExistingUser } from "../middlewares/verifySignUp";

const router = Router();

router.get('/read',[verifyToken, isAdmin], userCtrl.getUsers);
router.get('/read/:_id',[verifyToken, isAdmin], userCtrl.getUser);
router.post("/create", [verifyToken, isAdmin, checkExistingUser], userCtrl.createUser);
router.put("/update/:_id", [verifyToken, isAdmin], userCtrl.updateUserById);
router.delete("/delete/:_id", [verifyToken, isAdmin], userCtrl.deleteUserById);
export default router;