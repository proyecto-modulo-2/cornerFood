//Global Variables
const express = require('express');
const createError = require('http-errors');
const path = require('path');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const session = require('./config/session.config');


require('./config/db.config');

//Inicializaciones
const app = express();


//Settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session);

//Rutas
const index = require('./routes/index.routes');
const authRoute = require('./routes/auth.routes')
app.use('/', index);
app.use('/', authRoute);


//Static Files
app.use(express.static(path.join(__dirname, 'public')));


//Server is listening
module.exports = app