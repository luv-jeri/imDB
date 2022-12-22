const Review = require('../database/models/review.model');
const catcher = require('../utils/catcher');

module.exports.addReview = catcher(async (req, res, next) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  const review = await Review.create({
    rating,
    comment,
    movie: id,
    user: req.user.id,
  });

  res.status(201).json({
    status: 'success',
    message: 'Review added successfully',
    content: review,
  });
});

module.exports.getReviews = catcher(async (req, res, next) => {});
module.exports.getReview = catcher(async (req, res, next) => {});
module.exports.updateReview = catcher(async (req, res, next) => {});
module.exports.deleteReview = catcher(async (req, res, next) => {});
