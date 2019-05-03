const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const ensureLogin = require("connect-ensure-login");
const passport = require('passport');


router.get('/register', authController.register);
router.post('/register', authController.doRegister);
router.get('/login', authController.login);
router.post('/login', authController.doLogin);
router.get('/logout', authController.logout);
router.get('/auth/confirm/:confirmationCode', authController.confirm)

router.get("/authenticate/google", passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login",
            "https://www.googleapis.com/auth/plus.profile.emails.read"]
  }));
router.get("/authenticate/google/cb", passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/home"
  }));
  
module.exports = router;