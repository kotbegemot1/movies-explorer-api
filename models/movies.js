const mongoose = require('mongoose');
const validator = require('validator');
const { BAD_URL_MESSAGE } = require('../helpers/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: [(url) => validator.isURL(url), BAD_URL_MESSAGE],
  },
  trailerLink: {
    type: String,
    required: true,
    validate: [(url) => validator.isURL(url), BAD_URL_MESSAGE],
  },
  thumbnail: {
    type: String,
    required: true,
    validate: [(url) => validator.isURL(url), BAD_URL_MESSAGE],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
