const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  trailerUrl: String,
  actors: [String],
  description: String,
  genre: String,
  ratings: [Number],
  reviews: [String]
});

module.exports = mongoose.model('Movie', movieSchema);
