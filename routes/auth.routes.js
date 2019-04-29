const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const ensureLogin = require("connect-ensure-login");


router.get('/register', authController.register);
router.post('/register', authController.doRegister);
router.get('/login', authController.login);
router.post('/login', authController.doLogin);
router.get('/logout', authController.logout);
router.get('/auth/confirm/:confirmationCode', authController.confirm)

module.exports = router;