const User = require('../models/user.model')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.serializeUser((user, next) => {
  next(null, user._id);
});

passport.deserializeUser((id, next) => {
  User.findById(id, (err, user) =>{
    if (err) { return next(err);}
    next(null, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: "662378768091-d475vru9v4lb18n7d6e1boeae7m2lla2.apps.googleusercontent.com",
  clientSecret: "ZbncLJDBl6Bp8Fkv70ao6POb",
  callbackURL: "http://localhost:3000/authenticate/google/cb"
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleID: profile.id })
  .then(user => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }

    const newUser = new User({
      googleID: profile.id
    });

    newUser.save()
    .then(user => {
      done(null, newUser);
    })
  })
  .catch(error => {
    next(error)
  })

}));

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