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
    type: String,
    match: [URL_REGEX, 'Invalid URL pattern'],
    required: [true, 'image required!']
  },
  price: {
    type: String,
    required: [true, 'Put a price man!']
  },
  toppings: {
    type: [String],
    default: []
  }
})

const Platos = mongoose.model('Platos', platosSchema);
module.exports = Platos;