const express = require('express');
const router = express.Router();
const pedidosController = require ('../controllers/pedidos.controller');
const secure = require('../middlewares/secure.mid');

router.get('/cesta', pedidosController.verPedidos);
router.get('/pagar', pedidosController.pay)

// router.post('/pagar', pedidosController.doPay)
router.post('/:id/cesta/delete', pedidosController.delete);
router.post('/:id/cesta', pedidosController.addPedido);

module.exports = router;