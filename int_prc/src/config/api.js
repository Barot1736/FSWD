// TMDB API Configuration
const API_KEY = "17103c326f9cfec5b85a4c03ba6f6cb3"; // Replace with your actual TMDB API key
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

// API Endpoints
export const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
};

// Image URLs
export const imageUrl = {
  small: `${IMAGE_BASE_URL}w300`,
  medium: `${IMAGE_BASE_URL}w500`,
  large: `${IMAGE_BASE_URL}w780`,
  original: `${IMAGE_BASE_URL}original`,
};

export { BASE_URL, API_KEY };