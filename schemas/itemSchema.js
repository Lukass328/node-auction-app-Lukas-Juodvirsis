const mongoose = require('mongoose');

const { Schema } = mongoose;

const ItemSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  bid: {
    type: Number,
    required: true,
  },
  bidder: {
    type: String,
    required: true,
  },
  bidHistory: {
    type: Array,
  },
});

module.exports = mongoose.model('type12Items', ItemSchema);
