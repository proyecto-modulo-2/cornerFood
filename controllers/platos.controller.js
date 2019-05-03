const createError = require('http-errors');
const mongoose = require('mongoose');
const Plato = require('../models/platos.model');
const uploadCloud = require('../config/storage.config');


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
  res.render('platos/form2')
}

module.exports.doCreate = (req, res, next) => {
  console.info(req.file);
  const { title, description, price } = req.body;
  const image = req.file.url;
  const nuevoPlato = new Plato({title, description, image, price})
  nuevoPlato.save()
  .then(() => {
    res.redirect('/home');
  })
  .catch((error) => {
    if (error instanceof mongoose.Error.ValidationError) {
      console.log(error)
      res.render('platos/form2', {error})
    } else {
      next(error)
    }
  })
};

module.exports.edit = (req, res, next) => {
  let id = req.params.id
  console.log(id)
  Plato.findById(id)
  .then((plato) => {
    // console.log(plato.description)
    res.render('platos/edit', {plato})
  })
  .catch((error)=> {
    next(error)
  })
}

module.exports.doEdit = (req, res, next) => {
  let id = req.body
  console.info(id)
  Plato.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
  .then(()=> {
    console.info()
    res.redirect('/home')
  })
  .catch((error)=> {
    if (error instanceof mongoose.Error.ValidationError) {
      console.log(error)
      res.render('platos/edit', {plato, error})
    } else {
      next(error)
    }
  });
}