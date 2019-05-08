const express = require('express');
const router = express.Router();
const pedidosController = require ('../controllers/pedidos.controller');
const secure = require('../middlewares/secure.mid');

router.get('/cesta', pedidosController.verPedidos);

router.post('/:id/cesta/delete', pedidosController.delete);
router.post('/:id/cesta', pedidosController.addPedido);

module.exports = router;