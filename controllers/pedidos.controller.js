const mongoose = require('mongoose');
const Pedido = require('../models/pedidos.model');
const User = require('../models/user.model');
const Plato = require('../models/plato.model');
const session = require('../config/session.config')
const paymentService = require('../services/payment.service')

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

// module.exports.doPay = (req, res, next) => {
//   const user = req.user.id
//   Pedido.findOne({user: user, status: 'active'})
//   .populate('platos')
//   .exec(function (err, pedidos) {
//     if (err) return handleError(err);
//     pedidos.finalPrice = pedidos.price
//     pedidos.save()
//     .then((pedidos) => {
//       const price = pedidos.finalPrice
//       return paymentService.payWithStripe(price)
//     })
//     .catch(next)
//   })
// }

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

// module.exports.delete = (req, res, next) => {
//   const id = req.params.id;

//   Pedido.findOne({ user: req.user.id, status: 'active' })
//     .then(pedido => {
//       const platosSinPlato = pedido.platos.filter(pId => pId.toString() !== id)
//       const platos = pedido.platos.filter(pId => pId.toString() === id)

//       platos.pop()

//       pedido.platos = [...platosSinPlato, ...platos]

//       pedido.save()
//         .then(() => {
//           res.redirect('/cesta')
//         })
//     })
//   .catch(next)
// }

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