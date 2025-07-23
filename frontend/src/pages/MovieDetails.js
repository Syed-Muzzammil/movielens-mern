import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
const res = await api.get(`/movies/${id}`);
    setMovie(res.data);
  };

  const handleSubmit = async () => {
    if (!rating || !review) return alert("Both fields are required.");
await api.post(`/movies/rate/${id}`, { rating: parseFloat(rating), review });

    setRating('');
    setReview('');
    setSubmitted(true);
    fetchMovie(); // refresh the data
  };

  if (!movie) return <div>Loading...</div>;

  const averageRating =
    movie.ratings.length > 0
      ? (
          movie.ratings.reduce((sum, r) => sum + r, 0) / movie.ratings.length
        ).toFixed(1)
      : 'Not rated';

  return (
    <div className="details-container">
      <h1>{movie.title}</h1>
      <iframe
        width="560"
        height="315"
        src={movie.trailerUrl}
        title={movie.title}
        allowFullScreen
      />
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>Description:</strong> {movie.description}</p>
      <p><strong>Actors:</strong> {movie.actors.join(', ')}</p>
      <p><strong>Average Rating:</strong> {averageRating}</p>

      <div className="rating-form">
        <input
          type="number"
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <input
          type="text"
          placeholder="Write a review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit Review</button>
        {submitted && <p className="success-msg">✔️ Submitted successfully</p>}
      </div>

      <h3>User Reviews:</h3>
      <ul>
        {movie.reviews.length > 0 ? (
          movie.reviews.map((r, i) => <li key={i}>{r}</li>)
        ) : (
          <p>No reviews yet</p>
        )}
      </ul>
    </div>
  );
};

export default MovieDetails;
