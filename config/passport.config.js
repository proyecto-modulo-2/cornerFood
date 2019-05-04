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

passport.use('google', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENTID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL || "/authenticate/google/cb"
}, (accessToken, refreshToken, profile, next) => {
  const email = profile.emails ? profile.emails[0].value : undefined;
  User.findOne({ $or: [
      { googleID: profile.id },
      { email: email },
    ]})
    .then(user => {
      if (user) {
        next(null, user);
      } else {
        user = new User({
          googleID: profile.id,
          password: Math.random().toString(36),
          username: profile.displayName,
          email: email,
          status: 'Active'
        });

        return user.save()
          .then(user => next(null, user))
      }
    })
    .catch(next)

}));

/**
 * 
 username: {
    type: String,
    required: [true, 'name is required!'],
    minlength: [3, 'Name needs at last 3 chars'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [EMAIL_PATTERN, 'Invalid email pattern']
  },
 */

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
            console.log(match)
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