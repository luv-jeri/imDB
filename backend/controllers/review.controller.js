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

module.exports.getReviews = catcher(async (req, res, next) => {
  const { id } = req.params;
  const { page = 1, limit = 5 } = req.query;

  const reviews = await Review.find({ movie: id })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  res.status(200).json({
    status: 'success',
    message: 'Reviews fetched successfully',
    content: reviews,
  });
});

module.exports.updateReview = catcher(async (req, res, next) => {
  const { id } = req.params;
  const { comment, rating } = req.body;

  const review = await Review.findById(id);

  if (!review) return next(new _Error('Review not found', 404));

  if (review.user.toString() !== req.user.id)
    return next(new _Error('You are not authorized to update this review', 401));

  review.comment = comment;
  review.rating = rating;

  await review.save();

  res.status(200).json({
    status: 'success',
    message: 'Review updated successfully',
    content: review,
  });
});

module.exports.deleteReview = catcher(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findById(id);

  if (!review) return next(new _Error('Review not found', 404));

  if (review.user.toString() !== req.user.id)
    return next(new _Error('You are not authorized to delete this review', 401));

  await review.remove();

  res.status(204).json({
    status: 'success',
    message: 'Review deleted successfully',
  });
});
