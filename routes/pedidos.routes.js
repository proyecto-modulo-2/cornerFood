const express = require('express');
const router = express.Router();
const pedidosController = require ('../controllers/pedidos.controller');
const paymentService = require('../services/payment.service')
const secure = require('../middlewares/secure.mid');

router.get('/cesta', pedidosController.verPedidos);
router.get('/pagar', pedidosController.pay)

router.post('/:id/cesta/delete', pedidosController.delete);
router.post('/:id/cesta', pedidosController.addPedido);
router.post('/pagar', paymentService.payWithStripe)

module.exports = router;