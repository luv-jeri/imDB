const { model } = require('mongoose');
const movieSchema = require('../schema/movie.schema');

const MovieModel = model('Movie', movieSchema);

module.exports = MovieModel;
