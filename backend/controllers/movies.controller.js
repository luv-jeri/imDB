const catcher = require('../utils/catcher');
const Movie = require('../database/models/movie.model');

module.exports.getMovies = catcher(async (req, res, next) => {
  const { page = 1, limit = 5 } = req.query;

  const movies = await Movie.find()
    .limit(limit)
    .skip((page - 1) * limit);

  res.status(200).json({
    status: 'success',
    message: 'Movies fetched successfully',
    length: movies,
  });
});

module.exports.addMovie = catcher(async (req, res, next) => {
  const {
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    title,
    backdrop_path,
    genres,
    adult,
  } = req.body;

  const movie = await Movie.create({
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    title,
    backdrop_path,
    genres,
    adult,
  });

  res.status(201).json({
    status: 'success',
    message: 'Movie added successfully',
    content: movie,
  });
});

module.exports.getMovie = catcher(async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findById(id);

  res.status(200).json({
    status: 'success',
    message: 'Movie fetched successfully',
    content: movie,
  });
});

module.exports.updateMovie = catcher(async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    message: 'Movie updated successfully',
    content: movie,
  });
});

module.exports.deleteMovie = catcher(async (req, res, next) => {
  const { id } = req.params;

  await Movie.findByIdAndDelete(id);

  res.status(204).json({
    status: 'success',
    message: 'Movie deleted successfully',
  });
  
});
