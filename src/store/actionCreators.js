import * as actionTypes from "./actionTypes";
import { fetchMoviesAsync, fetchDetailsAsync } from "../utils";

export const selectMovie = (movieId) => {
  return {
    type: actionTypes.CURRENT_MOVIE_SELECT,
    payload: movieId,
  };
};

export const listMovie = (searchTerm, page) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.MOVIE_LIST_REQUEST });
      const data = await fetchMoviesAsync(searchTerm, page);
      console.log(data);
      dispatch({ type: actionTypes.MOVIE_LIST_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: actionTypes.MOVIE_LIST_FAIL, payload: error });
    }
  };
};

export const searchMovie = (searchTerm) => {
  return { type: actionTypes.SEARCH_TERM_UPDATE, payload: searchTerm };
};

export const clearSearch = () => {
  return { type: actionTypes.SEARCH_TERM_CLEAR };
};

export const prevPage = () => {
  return { type: actionTypes.PREV_PAGE };
};

export const nextPage = () => {
  return { type: actionTypes.NEXT_PAGE };
};

export const loadDetails = (selectedMovie) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.MOVIE_DETAILS_REQUEST });
      const data = await fetchDetailsAsync(selectedMovie);
      console.log(data);
      dispatch({ type: actionTypes.MOVIE_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: actionTypes.MOVIE_DETAILS_FAIL });
    }
  };
};
