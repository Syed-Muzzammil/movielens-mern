const express = require('express');
const {
  getAllMovies,
  addMovie,
  rateMovie,
  searchMovies
} = require('../controllers/movieController');

const router = express.Router();

// 📥 Get all movies
router.get('/', getAllMovies);

// ➕ Add a new movie
router.post('/', addMovie);

// ⭐ Rate and review a movie
router.post('/rate/:id', rateMovie);

// 🔍 Search by title or actor
router.get('/search', searchMovies);

// 📄 Get single movie by ID for details page
router.get('/:id', async (req, res) => {
  try {
    const Movie = require('../models/Movie');
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
