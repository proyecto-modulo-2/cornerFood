const express = require('express');
const router = express.Router();
const pedidosController = require ('../controllers/stripe.controller');
const paymentService = require('../services/payment.service')


router.get('/pagar', pedidosController.pay);

router.post('/pagar', paymentService.payWithStripe);

module.exports = router;