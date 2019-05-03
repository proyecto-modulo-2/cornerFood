const express = require('express');
const router = express.Router();
const platosController = require ('../controllers/platos.controller');
const secure = require('../middlewares/secure.mid');
const uploadCloud = require('../config/storage.config');


router.get('/new', secure.checkRole('ADMIN'), platosController.create);
router.get('/:id/edit', platosController.edit);

router.post('/platos', uploadCloud.single('image'), platosController.doCreate);
router.post('/:id/delete', platosController.delete);
router.post('/:id', uploadCloud.single('image'), platosController.doEdit)

module.exports = router;