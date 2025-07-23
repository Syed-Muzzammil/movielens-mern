import React, { useEffect, useState } from 'react';
import api from '../api';
import MovieCard from '../components/MovieCard';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');

  const fetchMovies = async () => {
const res = await api.get('/movies');
    setMovies(res.data);
  };

  const handleSearch = async () => {
const res = await api.get(`/movies/search?q=${query}`);
    setMovies(res.data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="home">
      <h1 className="title">🎬 MovieLens</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title or actor"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
