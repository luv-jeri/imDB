const express = require('express');
const {
  getReviews,
  addReview,
  updateReview,
  deleteReview,
} = require('../controllers/review.controller');
const { authorize } = require('../controllers/authorization.controller');

const router = express.Router();

router.use(authorize);

router
  .route('/:id')
  .get(getReviews)
  .patch(updateReview)
  .delete(deleteReview)
  .post(addReview);

module.exports = router;
