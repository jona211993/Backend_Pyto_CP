import { Router } from 'express';

const router = Router();

import * as categoriasCtrl from '../controllers/categoria.controllers';

import {authJwt} from '../middlewares'

// Definimos las rutas::
router.get('/read', categoriasCtrl.getCategorias);
router.get('/read/:_id', categoriasCtrl.getCategoriaById);
router.post('/create',[authJwt.verifyToken,authJwt.isJefeAlmacen], categoriasCtrl.createCategoria);
router.put('/update/:_id',[authJwt.verifyToken,authJwt.isJefeAlmacen], categoriasCtrl.updateCategoriaById);
router.delete('/delete/:_id',[authJwt.verifyToken,authJwt.isJefeAlmacen], categoriasCtrl.deleteCategoriaById);

module.exports= router;