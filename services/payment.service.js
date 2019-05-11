const STRIPESECRET = process.env.STRIPE_SECRET;
const Pedido = require('../models/pedidos.model')

const stripe = require('stripe')(STRIPESECRET);

module.exports.payWithStripe = (req, res, next) => {
  // console.log(req.body)
  // const price 
  const price = req.body.total
  console.log(price)
  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer => 
    stripe.charges.create({
      amount: '30000', //PRECIO DINÁMICO
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
<<<<<<< HEAD
}
=======
    .catch(next)
}
>>>>>>> c4271056f991a239c0532cfc4259f73328af333f
