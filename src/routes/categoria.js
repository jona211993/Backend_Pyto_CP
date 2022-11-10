import { Router } from 'express';

const router = Router();

import * as categoriasCtrl from '../controllers/categoria.controllers';

import {authJwt} from '../middlewares'

// Definimos las rutas::
router.get('/read', categoriasCtrl.getCategorias);
router.get('/inhabilitados', categoriasCtrl.getCategoriasInhabilitadas);
router.get('/read/:codigo', categoriasCtrl.getCategoriaByCode);
router.get('/read/byname/:_name', categoriasCtrl.getCategoriaByName);
router.post('/create',[authJwt.verifyToken,authJwt.isJefeAlmacen], categoriasCtrl.createCategoria);
router.put('/update/:_id',[authJwt.verifyToken,authJwt.isJefeAlmacen], categoriasCtrl.updateCategoriaById);


module.exports= router;