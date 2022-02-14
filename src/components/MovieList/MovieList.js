import React from "react";
import MovieItem from "../MovieItem/MovieItem";
import "./MovieList.scss";

const MovieList = ({
  movies,
  movieLoading,
  selectedMovie,
  setSelectedMovie,
}) => {
  if (movieLoading === true) {
    return <div className="MovieList empty">Movie list is loading...</div>;
  } else {
    if (movies.length === 0) {
      return <div className="MovieList empty">Didn't find any movie!</div>;
    } else {
      return (
        <div className="MovieList">
          <ul>
            {movies.map(({ id, title, year, thumb }) => {
              return (
                <MovieItem
                  key={id}
                  {...{
                    id,
                    title,
                    year,
                    thumb,
                    selectedMovie,
                    setSelectedMovie,
                  }}
                />
              );
            })}
          </ul>
        </div>
      );
    }
  }
};

export default MovieList;
