const mongoose = require('mongoose');
const Pedido = require('../models/pedidos.model');
const User = require('../models/user.model');
const Plato = require('../models/platos.model')

module.exports.verPedidos = (req, res, next) => {
  res.render('pedidos/cesta')
}

module.exports.addPedido = (req, res, next) => {
  console.log(res.locals.user._id)
}