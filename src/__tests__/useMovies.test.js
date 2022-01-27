import React from "react";
import { render, screen } from "@testing-library/react";
import { useMovies } from "../hooks/useMovies";
import { fetchMoviesAsync } from "../hooks/utils";

const mockResponseMovies = {
  Search: [
    {
      Title: "Star Wars: Episode IV - A New Hope",
      Year: "1977",
      imdbID: "tt0076759",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    },
  ],
  totalResults: "2991",
  Response: "True",
};

jest.mock("../hooks/utils");

const TestComponent = ({ searchTerm, page }) => {
  const { movies, total } = useMovies(searchTerm, page);
  console.log(movies);
  return (
    <div>
      <div data-testid="movies-length">{movies.length}</div>
      <div data-testid="movies-title">{movies[0]?.title}</div>
      <div data-testid="total">{total}</div>
    </div>
  );
};

it("should return a movie list and a total number", async () => {
  fetchMoviesAsync.mockResolvedValue(mockResponseMovies);

  render(<TestComponent searchTerm={"test"} page={1} />);

  expect(fetchMoviesAsync).toBeCalled();
  expect(fetchMoviesAsync).toBeCalledWith("test", 1);

  const testMoviesLength = await screen.findByTestId("movies-length");
  const testMoviesTitle = await screen.findByTestId("movies-title");
  const testTotal = await screen.findByTestId("total");

  expect(testMoviesLength.textContent).toBe("1");
  expect(testMoviesTitle.textContent).toContain("Star Wars: Episode IV");
  expect(testTotal.textContent).toBe("2991");
});
