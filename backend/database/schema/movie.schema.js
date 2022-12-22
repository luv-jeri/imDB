const { Schema } = require('mongoose');

const movieSchema = new Schema({
  original_title: {
    type: String,
  },
  overview: {
    type: String,
  },
  popularity: {
    type: Number,

    default: 0,
  },
  poster_path: {
    type: String,
  },
  release_date: {
    type: String,
  },
  title: {
    type: String,
  },
  vote_average: {
    type: Number,

    default: 0,
  },
  vote_count: {
    type: Number,

    default: 0,
  },
  backdrop_path: {
    type: String,
  },
  adult: {
    type: Boolean,
  },
});

module.exports = movieSchema;
