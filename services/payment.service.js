const STRIPESECRET = process.env.STRIPE_SECRET;
const Pedido = require('../models/pedidos.model')

const stripe = require('stripe')(STRIPESECRET);

module.exports.payWithStripe = (req, res, next) => {
  // console.log(req.body)
  // const price 
  const price = req.body.total
  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer => 
    stripe.charges.create({
      amount: Number(price)*100, //PRECIO DINÁMICO
      description: "Comida Rica Rica",
      currency: "eur",
      customer: customer.id
    }))
    .then(() => {
      Pedido.findOne({user: req.user.id, status: 'active'})
      .then((pedido) => {
        pedido.status = 'payed'
        pedido.save()
        .then(() => {
          res.render('pedidos/thankyou')
        })
      })
    })
    .catch(next)
}
