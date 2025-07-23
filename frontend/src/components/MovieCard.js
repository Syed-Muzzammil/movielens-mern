import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const submitRating = async () => {
    await axios.post(`http://localhost:5000/api/movies/rate/${movie._id}`, {
      rating: Number(rating),
      review
    });
    setSubmitted(true);
    setRating('');
    setReview('');
  };

  const averageRating =
    movie.ratings.length > 0
      ? (
          movie.ratings.reduce((sum, r) => sum + r, 0) / movie.ratings.length
        ).toFixed(1)
      : 'Not rated';

  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${movie._id}`)}>
      <iframe
        width="100%"
        height="180"
        src={movie.trailerUrl}
        title={movie.title}
        allowFullScreen
        className="movie-trailer"
      />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p><strong>Actors:</strong> {movie.actors.join(', ')}</p>
        <p><strong>Avg Rating:</strong> {averageRating}</p>
      </div>
    </div>
  );
};

export default MovieCard;
