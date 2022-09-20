import { Router } from 'express';

const router = Router();

import * as authCtrl from '../controllers/auth.controllers';

// Definimos las rutas::
router.post('/signUp', authCtrl.signUp);
router.post('/signIn', authCtrl.signIn);

export default router;
