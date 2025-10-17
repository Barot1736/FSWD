import { BASE_URL, API_KEY } from '../config/api';

// Create a base fetch function
const apiClient = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Fetch movies by endpoint
export const fetchMovies = async (endpoint) => {
  return await apiClient(endpoint);
};

// Fetch movie trailer
export const fetchMovieTrailer = async (movieId, type = 'movie') => {
  try {
    const response = await apiClient(`/${type}/${movieId}/videos?api_key=${API_KEY}`);
    const trailer = response.results?.find(
      video => video.type === "Trailer" && video.site === "YouTube"
    );
    return trailer?.key || null;
  } catch (error) {
    console.error('Error fetching trailer:', error);
    return null;
  }
};

// Fetch movie details
export const fetchMovieDetails = async (movieId, type = 'movie') => {
  return await apiClient(`/${type}/${movieId}?api_key=${API_KEY}`);
};

// Search movies/shows
export const searchMovies = async (query) => {
  return await apiClient(`/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
};