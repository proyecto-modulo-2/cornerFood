const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller')

router.get('/pedidos/:id', adminController.detail);
router.get('/pedidos', adminController.list);

router.post('/pedidos/:id', adminController.done);

module.exports = router;