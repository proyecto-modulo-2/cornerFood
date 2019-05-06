const User = require('../models/user.model');
const Platos = require('../models/platos.model');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pedidoSchema = new mongoose.Schema ({
  user: {type: Schema.Types.ObjectId, ref:'User'},
  platos: [{type: Schema.Types.ObjectId, ref:'Platos'}],
  status: {
    type: String,
    enum: ['active', 'payed']
  }
})

const Pedidos = mongoose.model('Pedidos', pedidoSchema);
module.exports = Pedidos