import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../utils/api';
import { imageUrl } from '../config/api';
import './Row.css';

function Row({ title, fetchUrl, isLargeRow = false, onMovieClick }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await fetchMovies(fetchUrl);
        setMovies(request.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }

    fetchData();
  }, [fetchUrl]);

  const handleMovieClick = (movie) => {
    if (onMovieClick) {
      const type = movie.name ? 'tv' : 'movie';
      onMovieClick(movie.id, type);
    }
  };

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleMovieClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${
              isLargeRow ? imageUrl.medium : imageUrl.small
            }${movie.poster_path}`}
            alt={movie.name || movie.title || movie.original_name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;