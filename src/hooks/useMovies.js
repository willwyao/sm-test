import React from "react";
import { fetchMoviesAsync } from "./utils";

export const useMovies = (searchTerm, page) => {
  const [movies, setMovies] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [isInitialLoading, setIsInitialLoading] = React.useState(true);

  const getMovies = async (searchTerm, page) => {
    try {
      const data = await fetchMoviesAsync(searchTerm, page);
      console.log(data);
      const { Search: results, totalResults, Response } = data;
      if (Response==='True') {
        setMovies(
          results.map((item) => {
            return {
              id: item.imdbID,
              title: item.Title,
              year: item.Year,
              thumb: item.Poster,
            };
          })
        );
        setTotal(parseInt(totalResults));
      } else {
        setMovies([]);
        setTotal(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (isInitialLoading) return;
    getMovies(searchTerm, page);
  }, [page]);

  React.useEffect(() => {
    if (isInitialLoading) return;
    getMovies(searchTerm, 1);
  }, [searchTerm]);

  React.useEffect(() => {
    if (!isInitialLoading) return;
    getMovies(searchTerm, page);
    setIsInitialLoading(false);
  }, []);

  return { movies, total, getMovies };
};
