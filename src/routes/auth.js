import { Router } from 'express';

const router = Router();

import * as authCtrl from '../controllers/auth.controllers';
import {checkExistingRole,checkExistingUser } from "../middlewares/verifySignUp";
// Definimos las rutas::
router.post('/signUp',[checkExistingUser, checkExistingRole], authCtrl.signUp);
router.post('/signIn', authCtrl.signIn);

export default router;
