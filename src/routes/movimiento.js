import { Router } from 'express';
const router = Router();
import * as movCtrl from '../controllers/movimiento.controllers';
import {authJwt} from '../middlewares'
// Definimos las rutas::

router.post('/create',[authJwt.verifyToken,authJwt.isJefeAlmacen], movCtrl.createMovimiento);
router.get('/searchByCode/:codigo',[authJwt.verifyToken,authJwt.isJefeAlmacen], movCtrl.getMovimientoByCode);
router.put('/anular_mov/:_id',[authJwt.verifyToken,authJwt.isJefeAlmacen], movCtrl.updateAnular);
router.get('/aprobados',[authJwt.verifyToken,authJwt.isJefeAlmacen], movCtrl.getMovimientosAprobados);

module.exports= router;