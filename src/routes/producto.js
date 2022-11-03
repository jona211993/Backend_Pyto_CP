import { Router } from 'express';
const router = Router();
import * as productosCtrl from '../controllers/producto.controllers';
import {authJwt} from '../middlewares'
// Definimos las rutas::
router.get('/', productosCtrl.getProductos);
router.get('/:_id', productosCtrl.getProductoById);
router.post('/',[authJwt.verifyToken,authJwt.isJefeAlmacen], productosCtrl.createProducto);
router.put('/:_id',[authJwt.verifyToken,authJwt.isJefeAlmacen], productosCtrl.updateProductById);
router.delete('/:_id',[authJwt.verifyToken,authJwt.isAdmin], productosCtrl.deleteProductById);
module.exports= router;