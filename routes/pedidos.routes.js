const express = require('express');
const router = express.Router();
const pedidosController = require ('../controllers/pedidos.controller');
const secure = require('../middlewares/secure.mid');

router.get('/cesta', pedidosController.verPedidos);

module.exports = router;