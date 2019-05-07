const mongoose = require('mongoose');
const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

const platosSchema = new mongoose.Schema ({
  title: {
    type: String,
    required: [true, 'title required!'],
    minlength: 3
  },
  description: {
    type: String,
    required: [true, 'description required!']
  },
  image: {
    type: [String],
    required: [true, 'image required!']
  },
  price: {
    type: Number,
    required: [true, 'Put a price man!']
  },
  toppings: {
    type: [String],
    default: []
  }
})

const Plato = mongoose.model('Plato', platosSchema);
module.exports = Plato;