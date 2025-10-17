import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
// import Banner from './components/Banner';
import Row from './components/Row';
// import TrailerModal from './components/TrailerModal';
import { requests } from './config/api';
import { fetchMovieTrailer } from './utils/api';

function App() {
  const [trailerKey, setTrailerKey] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleMovieClick = async (movieId, type) => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const trailer = await fetchMovieTrailer(movieId, type);
      if (trailer) {
        setTrailerKey(trailer);
        setIsModalOpen(true);
      } else {
        alert('Trailer not available for this movie/show');
      }
    } catch (error) {
      console.error('Error loading trailer:', error);
      alert('Error loading trailer');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTrailerKey('');
  };

  return (
    <div className="app">
      <Navbar />
      
      <div className="app__content">
        <Row
          title="NETFLIX ORIGINALS"
          fetchUrl={requests.fetchNetflixOriginals}
          isLargeRow
          onMovieClick={handleMovieClick}
        />
        <Row title="Trending Now" fetchUrl={requests.fetchTrending} onMovieClick={handleMovieClick} />

      </div>

      
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
}

export default App;
