import React from "react";
import { fetchMoviesAsync } from "./utils";

export const useMovies = (searchTerm, page) => {
  const [movies, setMovies] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [movieLoading, setMovieLoading] = React.useState(true);

  const getMovies = async () => {
    try {
      const data = await fetchMoviesAsync(searchTerm, page);
      console.log(data);
      const { Search, totalResults, Response } = data;
      if (Response === "True") {
        setMovies(
          Search.map((item) => {
            return {
              id: item.imdbID,
              title: item.Title,
              year: item.Year,
              thumb: item.Poster,
            };
          })
        );
        setTotal(parseInt(totalResults));
        setMovieLoading(false);
      } else {
        setMovies([]);
        setTotal(0);
        setMovieLoading(false);
      }
    } catch (error) {
      console.log(error);
      setMovies([]);
      setTotal(0);
      setMovieLoading(false);
    }
  };

  React.useEffect(() => {
    setMovieLoading(true);
    getMovies(searchTerm, page);
  }, [searchTerm, page]);

  return { movies, total, movieLoading };
};
