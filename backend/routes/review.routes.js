const express = require('express');
const {
  getReviews,
  addReview,
  getReview,
  updateReview,
  deleteReview,
} = require('../controllers/review.controller');
const { authorize } = require('../controllers/authorization.controller');

const router = express.Router();

router.use(authorize);

router.route('/').get(getReviews);

router
  .route('/:id')
  .get(getReview)
  .patch(updateReview)
  .delete(deleteReview)
  .post(addReview);

module.exports = router;
