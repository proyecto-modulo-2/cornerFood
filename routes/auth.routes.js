const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const passport = require('passport');


router.get('/register', authController.register);
router.post('/register', authController.doRegister);
router.get('/login', authController.login);
router.post('/login', authController.doLogin);
router.get('/logout', authController.logout);
router.get('/auth/confirm/:confirmationCode', authController.confirm)

router.get("/authenticate/google", passport.authenticate("google", {
    scope: ['openid', 'email', 'profile']
  }));
router.get("/authenticate/google/cb", authController.loginWithGoogleCallback);
  
module.exports = router;