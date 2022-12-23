const express = require('express');
const {
  getMovies,
  addMovie,
  getMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movies.controller');
const { authorize, restrictTo } = require('../controllers/authorization.controller');

const router = express.Router();

router.route('/').get(getMovies).post(authorize, restrictTo('admin'), addMovie);
router
  .route('/:id')
  .get(getMovie)
  .patch(restrictTo('admin'), updateMovie)
  .delete(restrictTo('admin'), deleteMovie);

module.exports = router;
