const reviewSchema = require('../schema/review.schema');

const { model } = require('mongoose');

const ReviewModel = model('Review', reviewSchema);

module.exports = ReviewModel;
