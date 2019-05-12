const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const secure = require('../middlewares/secure.mid');


router.get('/pedidos/:id', secure.isAuthenticated, secure.checkRole('ADMIN'), adminController.detail);
router.get('/pedidos', secure.isAuthenticated, secure.checkRole('ADMIN'), adminController.list);

router.post('/pedidos/:id', secure.isAuthenticated, secure.checkRole('ADMIN'), adminController.done);

module.exports = router;