const express = require('express');
const createError = require('http-errors');
const path = require('path');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');

require('./config/db.config');

//Inicializaciones
const app = express();


//Settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Middlewares

//Global Variables


//Rutas
const index = require('./routes/index.routes');
app.use('/', index);


//Static Files


//Server is listening
module.exports = app