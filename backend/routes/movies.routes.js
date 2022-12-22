const express = require('express');
const {
  getMovies,
  addMovie,
  getMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movies.controller');
const { authorize } = require('../controllers/authorization.controller');

const router = express.Router();

router.route('/').get(getMovies).post(authorize, addMovie);
router.route('/:id').get(getMovie).patch(updateMovie).delete(deleteMovie);

module.exports = router;
