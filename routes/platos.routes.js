const express = require('express');
const router = express.Router();
const platosController = require ('../controllers/platos.controller');
const secure = require('../middlewares/secure.mid');
const uploadCloud = require('../config/storage.config');


router.get('/new', secure.isAuthenticated, secure.checkRole('ADMIN'), platosController.create);
router.get('/:id/edit', secure.isAuthenticated, secure.checkRole('ADMIN'), platosController.edit);

router.post('/platos', secure.isAuthenticated, secure.checkRole('ADMIN'), uploadCloud.single('image'), platosController.doCreate);
router.post('/:id/delete', secure.isAuthenticated, secure.checkRole('ADMIN'), platosController.delete);
router.post('/:id', secure.isAuthenticated, secure.checkRole('ADMIN'), uploadCloud.single('image'), platosController.doEdit)

module.exports = router;