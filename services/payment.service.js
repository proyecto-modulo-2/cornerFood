const STRIPEKEY = process.env.STRIPE_KEY;
const STRIPESECRET = process.env.STRIPE_SECRET;

const stripe = require('stripe')(STRIPESECRET);

module.exports.payWithStripe = (req, res) => {
  stripe.customers.create({
    email: req.user.email,
    source: req.body.stripeToken
  })
  .then(customer => 
    stripe.charges.create({
      price,
      description: "Sample Charge",
      currency: "eur",
      customer: customer.id
    }))
    .then(() => {
      res.render('pedidos/pagar')
    })
}
