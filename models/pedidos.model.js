const User = require('../models/user.model');
const Plato = require('../models/plato.model');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pedidoSchema = new mongoose.Schema ({
  user: {type: Schema.Types.ObjectId, ref:'User'},
  platos: [{type: Schema.Types.ObjectId, ref:'Plato'}],
  status: {
    type: String,
    enum: ['active', 'payed', 'done'],
    default: 'active'
  },
  finalPrice: Number
})

pedidoSchema
  .virtual('price')
  .get(function () {
    return this.platos
      .reduce((price, plato) => price + plato.price, 0)
  });

const Pedido = mongoose.model('Pedido', pedidoSchema);
module.exports = Pedido