const mongoose = require('mongoose');
const { urlR } = require('../utils/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  owner: {
    type: mongoose.ObjectId,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value) => urlR.test(value),
    },
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      default: 0,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
