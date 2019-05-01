const createError = require('http-errors');
const mongoose = require('mongoose');
const Plato = require('../models/platos.model');

module.exports.list = (req, res, next) => {
  Plato.find()
  .then(platos => 
    res.render('platos/list', {platos}))
  .catch(error=>next(error))
}

module.exports.detail = (req, res, next) => {
  let platoId = req.params.platoId
  Plato.findById(platoId)
  .then(plato=> res.render('platos/detail', {plato}))
  .catch(error=>next(error))
}

module.exports.create = (req, res, next) => {
  res.render('platos/form')
}