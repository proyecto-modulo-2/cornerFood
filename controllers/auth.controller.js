const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const bcryptSalt = 10;
const passport = require('passport')

module.exports.register = (req, res, next) => {
  res.render('auth/register')
}

module.exports.doRegister = (req, res, next) => {
  const {username, email, password} = req.body;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  if(username === "" || email === "" || password === "") {
    res.render('auth/register', {
      errorMessage: "Indicate a username, an email & a password to register"
    });
    return
  } 
    User.findOne({"email": email})
    .then(user => {
      if(user!==null) {
      res.render('auth/register', {
        errorMessage: "The email is already registered!"
      });
      return
      };
      User.create({
        username,
        email,
        password: hashPass
      })
      .then((user) => {
        console.log(user)
        res.redirect('/login')
      })
      .catch((error) => {
        console.log(error)
      })
    })
    .catch(error =>next(error))
}

module.exports.login = (req, res, next) => {
  res.render('auth/login')
}

module.exports.doLogin = (req, res, next) => {
  // passport.authenticate("Local-Auth", {
  //   successRedirect: "/home",
  //   failureRedirect: "/login",
  //   failureFlash: true,
  //   passReqToCallback: true,
  // });

  // passport.authenticate('Local-Auth', (error, user, validation) => {
  //   if (error) {
  //     next(error);
  //   } else if (!user) {
  //     res.render('auth/register', {
  //       user: req.body,
  //       errors: validation
  //     })
  //   } else {
  //     return req.login(user, (error) => {
  //       if (error) {
  //         next(error)
  //       } else {
  //         res.redirect('/home')
  //       }
  //     })
  //   }
  // })(req, res, next);

  const {email, password} = req.body;

  if(email==="" || password==="") {
    res.render('auth/login', {
      errorMessage: "Please enter an email and a password"
    })
    return;
  }
  User.findOne({"email": email})
  .then((user) => {
    if(!user) {
      res.render('auth/login', {
        errorMessage: "Invalid email or password"
      })
      return;
    }
    if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      res.redirect('/home')
    } else {
      res.render('auth/login', {
        errorMessage: "Invalid email or password"
      })
    }
  })
  .catch(error=>next(error));
}

module.exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect('/login')
  })
}