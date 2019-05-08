require("dotenv").config();

//Global Variables
const express = require('express');
// const session = require('express-session');
const passport = require('passport')
const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const path = require('path');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const session = require('./config/session.config');

// const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

require('./config/db.config');
require('./config/passport.config');

//Inicializaciones
const app = express();


//Settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');



//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
// app.use(GoogleStrategy);

//Rutas
const index = require('./routes/index.routes');
const authRoute = require('./routes/auth.routes');
const platosRoute = require('./routes/platos.routes');
const pedidosRoute = require('./routes/pedidos.routes')
app.use('/', index);
app.use('/', authRoute);
app.use('/', platosRoute);
app.use('/', pedidosRoute);


//Static Files
app.use(express.static(path.join(__dirname, 'public')));


//Server is listening
module.exports = app