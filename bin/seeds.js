require('../config/db.config')

const mongoose = require('mongoose');
const Plato = require('../models/platos.model');
const platos = require('../data/platos.json');

Plato.create(platos)
.then ((platos) => console.info(platos))
.catch(error => console.error(error))
