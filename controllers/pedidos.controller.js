const mongoose = require('mongoose');
const Pedido = require('../models/pedidos.model');
const User = require('../models/user.model');
const Plato = require('../models/plato.model');
const session = require('../config/session.config')

module.exports.verPedidos = (req, res, next) => {
  let user = req.user.id
  Pedido.find({user: user, status: 'active'})

  .populate('platos')
  .exec(function (err, pedidos) {
    if (err) return handleError(err);
    let platos = pedidos[0].platos
    res.render('pedidos/cesta', {platos})
    // res.send(platos)
  })

  // .exec(function (err, pedidos) {
  //   if (err) return handleError(err);
  //   console.log('Los Pedidos: ', pedidos[0].platos.price);
  // });

  // .then((pedidos)=> {
  //   console.log(pedidos[0].platos)
  //   res.render('pedidos/cesta', {pedidos})
  // })
  // .catch(next)
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

