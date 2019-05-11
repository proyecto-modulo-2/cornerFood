const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

module.exports = session({
  secret: process.env.SESSION_SECRET || "Top Secret!",
  resave: true,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.SESSION_SECURE || false,
    httpOnly: true,
    maxAge: 50000000
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 60 * 60 * 24 * 7
  })
})