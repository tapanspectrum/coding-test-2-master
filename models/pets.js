const mongoose = require('mongoose');

const petSchema = new mongoose.Schema ({
  name: {type: String,
    required: true},
  age: {type: Number,
    required: true},
  colour: {type: String,
    required: true}
});

module.exports = mongoose.model('pets', petSchema);