const mongoose = require('mongoose');
const Pedido = require('../models/pedidos.model');
const User = require('../models/user.model');
const Plato = require('../models/plato.model');
const session = require('../config/session.config')
const paymentService = require('../services/payment.service')


module.exports.verPedidos = (req, res, next) => {
  let user = req.user.id
  Pedido.findOne({user: user, status: 'active'})
  .populate('platos')
  .exec(function (err, pedidos) {
    if (err) return handleError(err);
        
    let platos = pedidos.platos
    res.render('pedidos/cesta', {platos, totalPrice: pedidos.price })
  })
}

module.exports.addPedido = (req, res, next) => {
  let user = req.user.id
  let plato = req.params.id
  Pedido.find({user: user, status: 'active'})
  .then((pedido)=> {
    if (pedido[0] !== undefined) {
    pedido[0].platos.push(plato)
    pedido[0].save(function (err) {
      if (err) return handleError(err);
      res.redirect(`/platos/${plato}`)
    })
    } else {
      const pedido = new Pedido ({ user, platos: plato })
      pedido.save()
      .then(() => {
        res.redirect(`/platos/${plato}`)
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          res.render('/home', {error})
        } else {
          next(error)
        }
      })
    }})
  .catch((error)=> {
    next(error)
  })  
}

module.exports.delete = (req, res, next) => {
  const id = req.params.id;
  const user = req.user.id;
  Pedido.findOne({ user: user, status: 'active' })
  .then((pedido) => {
    const platos = pedido.platos
    var index = platos.indexOf(id);
    if (index > -1) {
    platos.splice(index, 1);
    }
    pedido.save()
      .then(() => {
        res.redirect('/cesta')
      })
  })
  .catch(next)
}

module.exports.historico = (req, res, next) => {
  const user = req.user.id
  Pedido.find({user: user, status: 'done'})
  .populate('platos')
  .exec(function (err, pedidos) {
    if (err) return handleError(err);
    let platos = pedidos[0].platos
    console.log(platos)
    res.render('pedidos/historico', {platos, pedidos})
  })
}
