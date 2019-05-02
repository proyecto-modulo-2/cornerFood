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

module.exports.doCreate = (req,res,next) => {
  console.log(req.body)

  const plato = new Plato(req.body)
  plato.save()
  .then(() => res.redirect('/home'))
  .catch((error) => {
    if (error instanceof mongoose.Error.ValidationError) {
      console.log(error)
      res.render('platos/form', {plato, error})
    } else {
      next(error)
    }
  });
}