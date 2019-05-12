const express = require('express');
const router = express.Router();
const pedidosController = require ('../controllers/stripe.controller');
const paymentService = require('../services/payment.service');
const secure = require('../middlewares/secure.mid');


router.get('/pagar', secure.isAuthenticated, pedidosController.pay);

router.post('/pagar', secure.isAuthenticated, paymentService.payWithStripe);

module.exports = router;