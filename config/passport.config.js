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

passport.use("Local-Auth", new LocalStrategy((email, password, next) => {
  User.findOne({"email": email}, (err, user) => {
    if(err) {
      return next(err);
    }
    if(!user) {
      return next(null, false, {errorMessage: "Incorrect mail or password"});
    }
    if(!bcrypt.compareSync(password, user.password)) {
      return next(null, false, {errorMessage: "Incorrect mail or password"});
    }
    return next(null, user);
  });
}));