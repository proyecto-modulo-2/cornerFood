const express = require('express');
const router = express.Router();
const platosController = require('../controllers/platos.controller');
const secure = require('../middlewares/secure.mid');

router.get('/', (req, res, next) => {
  res.render('index')
});

router.get('/home', platosController.list);
router.get('/platos/:platoId', platosController.detail)

// secure.isAuthenticated,

module.exports = router;