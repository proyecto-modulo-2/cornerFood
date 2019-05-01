const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const bcryptSalt = 10;
const passport = require('passport');
const notificationsService = require('../services/notifications.service')


module.exports.register = (req, res, next) => {
  res.render('auth/register')
}

module.exports.doRegister = (req, res, next) => {
  const {username, email, password} = req.body;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let token = '';
  for (let i = 0; i < 25; i++) {
      token += characters[Math.floor(Math.random() * characters.length )];
  }

  if (username === "" || email === "" || password === "") {
    res.render('auth/register', {
      errorMessage: "Indicate a username, an email & a password to register"
    });
  } else {
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          res.render('auth/register', {
            errorMessage: "The email is already registered!"
          });
        } else {
          user = new User({
            username,
            email,
            password: hashPass,
            confirmationCode: token
          })
          return user.save()
            .then(user => {
              return notificationsService.activateAccount(user)
                .then(() => res.redirect('/login'));
            })
        }
    })
    .catch(error =>next(error)) 
  }
}

module.exports.login = (req, res, next) => {
  res.render('auth/login')
}

module.exports.doLogin = (req, res, next) => {
  passport.authenticate('Local-Auth', (error, user, validation) => {
    if (error) {
      next(error);
    } else if (!user) {
      res.render('auth/login', {
        user: req.body,
        errorMessage: validation
      })
    } else {
      return req.login(user, (error) => {
        if (error) {
          next(error)
        } else {
          res.redirect('/home')
        }
      })
    }
  })(req, res, next);
}

module.exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect('/login')
  })
}

module.exports.confirm = (req, res, next) => {
  let confirm = req.params.confirmationCode
  User.updateOne({confirmationCode: confirm}, { $set: {status: "Active"}})
    .then(() => res.redirect('/login'))
    .catch(error=>next(error))
}