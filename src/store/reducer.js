import * as actionTypes from "./actionTypes";

const initialState = {
  movies: [],
  movieLoading: true,
  total: 0,
  details: {},
  detailsLoading: false,
  selectedMovie: "",
  searchTerm: "star",
  page: 1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CURRENT_MOVIE_SELECT:
      return {
        ...state,
        selectedMovie: action.payload,
      };
    case actionTypes.PREV_PAGE:
      return {
        ...state,
        page: state.page > 1 ? state.page - 1 : 1,
      };
    case actionTypes.NEXT_PAGE:
      const maxPage = Math.ceil(state.total / 10);
      return {
        ...state,
        page: state.page < maxPage ? state.page + 1 : maxPage,
      };
    case actionTypes.MOVIE_LIST_REQUEST:
      return {
        ...state,
        movieLoading: true,
        movies: [],
      };
    case actionTypes.MOVIE_LIST_SUCCESS:
      const { Search, totalResults, Response } = action.payload;
      let newMovies = [];
      let newTotal = 0;

      if (Response === "True") {
        newMovies = Search.map((item) => {
          return {
            id: item.imdbID,
            title: item.Title,
            year: item.Year,
            thumb: item.Poster,
          };
        });
        newTotal = parseInt(totalResults);
      }
      return {
        ...state,
        movies: newMovies,
        Total: newTotal,
        movieLoading: false,
      };
    case actionTypes.MOVIE_LIST_FAIL:
      return {
        ...state,
        movies: [],
        Total: 0,
        movieLoading: false,
      };
    case actionTypes.SEARCH_TERM_UPDATE:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case actionTypes.SEARCH_TERM_CLEAR:
      return {
        ...state,
        searchTerm: "",
      };
    case actionTypes.MOVIE_DETAILS_REQUEST:
      return {
        ...state,
        details: {},
        detailsLoading: true,
      };
    case actionTypes.MOVIE_DETAILS_SUCCESS:
      return {
        ...state,
        details: action.payload,
        detailsLoading: false,
      };
    case actionTypes.MOVIE_DETAILS_FAIL:
      return {
        ...state,
        details: {},
        detailsLoading: false,
      };
    default:
      return state;
  }
};
export default reducer;
