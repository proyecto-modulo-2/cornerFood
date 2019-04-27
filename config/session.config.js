const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

module.exports = session({
  secret: "Top Secret!",
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 5000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 60 * 60 * 24 * 7
  })
})