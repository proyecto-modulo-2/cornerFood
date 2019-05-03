const User = require('../models/user.model')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, next) => {
  next(null, user._id);
});

passport.deserializeUser((id, next) => {
  User.findById(id, (err, user) =>{
    if (err) { return next(err);}
    next(null, user);
  });
});

passport.use('Local-Auth', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, next) => {
  User.findOne({ email: email})
    .then(user => {
      if (!user) {
        next(null, null, 'Invalid email or password')
      } else {
        return user.checkPassword(password)
          .then(match => {
            if (!match) {
              next(null, null, 'Invalid email or password')
            } else if (user.status !== 'Active') {
              next(null, null, 'Please activate your account')
            } else {
              next(null, user);
            }
          })
      }
    }).catch(next)
}))