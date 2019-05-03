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
  clientID: process.env.GOOGLE_CLIENTID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL || "/authenticate/google/cb"
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
  .catch((error) => {
    next(error)
  })

}));

passport.use('Local-Auth', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, next) => {
  User.findOne({ email: email})
    
    .then(user => {
      console.log('entra aqui')
      if (!user) {
        next(null, null, 'Invalid email or password')
      } else {
        return user.checkPassword(password)
          .then(match => {
            if (!match) {
              console.log("PROBLEMA DE CONTRASEÑA")

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