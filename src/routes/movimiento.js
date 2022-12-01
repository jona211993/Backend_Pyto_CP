import { Router } from 'express';
const router = Router();
import * as movCtrl from '../controllers/movimiento.controllers';
import {authJwt} from '../middlewares'
// Definimos las rutas::

router.post('/create',[authJwt.verifyToken,authJwt.isJefeAlmacen], movCtrl.createMovimiento);


module.exports= router;