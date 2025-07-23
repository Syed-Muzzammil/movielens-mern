const Movie = require('../models/Movie');

exports.getAllMovies = async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
};

exports.addMovie = async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save();
  res.json(movie);
};

exports.rateMovie = async (req, res) => {
  const { rating, review } = req.body;
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    movie.ratings.push(rating);
    movie.reviews.push(review);
    await movie.save();
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


exports.searchMovies = async (req, res) => {
  const query = req.query.q;
  const movies = await Movie.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { actors: { $regex: query, $options: 'i' } }
    ]
  });
  res.json(movies);
};
