const express = require('express');
const router = express.Router();
const platosController = require ('../controllers/platos.controller');

router.get('/new', platosController.create);
// router.post('/', platosController.doCreate);

module.exports = router;