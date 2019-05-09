// const mongoose = require('mongoose');
// const Pedido = require('../models/pedidos.model');
// const paymentService = require('../services/payment.service');

// module.exports.pagar = (req, res, next) => {
//   const user = req.user.id
//   Pedido.findOne({user: user, status: 'active'})
//   .then((pedido) => {
//     pedido.finalPrice = pedido.price
//     console.log(pedido.finalPrice)
//   })
//   .catch(next)
// }