import React from "react";
import MovieItem from "../MovieItem/MovieItem";
import "./MovieList.scss";
import { connect } from "react-redux";
import { listMovie } from "../../store/actionCreators";

const MovieList = ({ movies, movieLoading, searchTerm, page, listMovie }) => {
  React.useEffect(() => {
    listMovie(searchTerm, page);
  }, [searchTerm, page, listMovie]);
  if (movieLoading === true) {
    return <div className="MovieList empty">Movie list is loading...</div>;
  } else {
    if (movies.length === 0) {
      return <div className="MovieList empty">Didn't find any movie!</div>;
    } else {
      return (
        <div className="MovieList">
          <ul>
            {movies.map((movie) => {
              return <MovieItem key={movie.id} movie={movie} />;
            })}
          </ul>
        </div>
      );
    }
  }
};

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    movieLoading: state.movieLoading,
    searchTerm: state.searchTerm,
    page: state.page,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    listMovie: (searchTerm, page) => {
      dispatch(listMovie(searchTerm, page));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
