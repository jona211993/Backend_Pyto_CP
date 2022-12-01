import { Router } from 'express';
const router = Router();
import * as itemCtrl from '../controllers/item.controllers';
import {authJwt} from '../middlewares'
// Definimos las rutas::

router.post('/create',[authJwt.verifyToken,authJwt.isJefeAlmacen], itemCtrl.createItem);


module.exports= router;