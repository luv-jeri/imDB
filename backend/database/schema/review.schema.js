const { Schema } = require('mongoose');

const reviewSchema = new Schema({
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  comment: {
    type: String,
    maxlength: 500,
  },
});

module.exports = reviewSchema;
