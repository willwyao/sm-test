import config from "./config.json";
const API_URL = config.API_URL;
const API_KEY = config.API_KEY;

export const fetchMoviesAsync = async (searchTerm, page) => {
  const response = await fetch(
    `${API_URL}?apikey=${API_KEY}&type=movie&s=${searchTerm}&page=${page}`
  );
  return await response.json();
};

export const fetchDetailsAsync = async (id) => {
  const response = await fetch(
    `${API_URL}?apikey=${API_KEY}&type=movie&plot=full&i=${id}`
  );
  return await response.json();
};