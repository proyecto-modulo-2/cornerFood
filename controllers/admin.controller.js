const mongoose = require('mongoose');
const Pedido = require('../models/pedidos.model');

module.exports.list = (req,res, next) => {
  Pedido.find({status: 'payed'})
  .populate('user')
  .exec(function (err, pedidos) {
    if (err) return handleError(err);
    res.render('admin/list', {pedidos})
  })
}

module.exports.detail = (req, res, next) => {
  Pedido.findOne({_id: req.params.id})
  .populate('platos')
  .exec(function (err, pedido) {
    if (err) return handleError(err);
    let platos = pedido.platos
    res.render('admin/detail', {platos, pedido})
  })
}

module.exports.done = (req, res, next) => {
  Pedido.findOne({_id: req.params.id})
  .then((pedido) => {
    pedido.status = 'done'
    pedido.save()
    .then(() => {
      res.redirect('/admin/pedidos')
    })
  })
  .catch(next)
}