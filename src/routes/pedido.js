import { Router } from 'express';

const router = Router();

import * as pedidosCtrl from '../controllers/pedido.controllers';

import {authJwt} from '../middlewares'

// Definimos las rutas::
router.get('/', pedidosCtrl.getPedidos);
router.get('/:_id', pedidosCtrl.getPedidoById);
router.post('/',[authJwt.verifyToken,authJwt.isJefeAlmacen], pedidosCtrl.createPedido);
router.put('/:_id',[authJwt.verifyToken,authJwt.isJefeAlmacen], pedidosCtrl.updatePedidoById);
router.delete('/:_id',[authJwt.verifyToken,authJwt.isAdmin], pedidosCtrl.deletePedidoById);

module.exports= router;