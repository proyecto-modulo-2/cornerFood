const mongoose = require('mongoose');
const Pedido = require('../models/pedidos.model');

module.exports.pay = (req, res, next) => {
  let user = req.user.id
  Pedido.findOne({user: user, status: 'active'})
  .populate('platos')
  .exec(function (err, pedidos) {
    if (err) return handleError(err);
    pedidos.finalPrice = pedidos.price
    pedidos.save()
    .then((pedido) => {
      let total = pedido.finalPrice
      res.render('pedidos/pagar', {total})
    })
    .catch(next)
  })
}