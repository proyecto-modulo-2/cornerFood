const createError = require('http-errors');
const mongoose = require('mongoose');
const Plato = require('../models/platos.model');

module.exports.list = (req, res, next) => {
  Plato.find()
  .then(platos => res.render('platos/list', {platos}))
  .catch(error=>next(error))
}