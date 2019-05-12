const express = require('express');
const router = express.Router();
const pedidosController = require ('../controllers/pedidos.controller');
const secure = require('../middlewares/secure.mid');

router.get('/cesta', secure.isAuthenticated, secure.checkRole('USER'), pedidosController.verPedidos);
router.get('/historico', secure.isAuthenticated, secure.checkRole('USER'), pedidosController.historico)

router.post('/:id/cesta/delete', secure.isAuthenticated, secure.checkRole('USER'), pedidosController.delete);
router.post('/:id/cesta', secure.isAuthenticated, secure.checkRole('USER'), pedidosController.addPedido);

module.exports = router;