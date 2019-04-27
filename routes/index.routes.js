const express = require('express');
const router = express.Router();
const platosController = require('../controllers/platos.controller')

router.get('/', (req, res, next) => {
  res.render('index')
});

router.get('/home', platosController.list);

module.exports = router;