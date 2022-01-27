import { render, screen } from "@testing-library/react";
import MovieDetails from "../components/MovieDetails/MovieDetails";

const emptyDetails = {};
const mockDetails = {
  Title: "test title",
  Year: "3000",
  Actors: "Tom, John, Smith",
  Language: "unknown",
  Plot: "lorem lorem lorem",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
  Runtime: "10 mins",
};

it("randers with an empty details object", () => {
  render(<MovieDetails details={emptyDetails} />);

  expect(screen.getByText(/lease select a title from the sidebar/i)).toBeVisible();
});

it("randers with given details content", () => {
  render(<MovieDetails details={mockDetails} />);

  expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
    mockDetails.Title
  );
  expect(
    screen.getByText(new RegExp(mockDetails.Year, "i")).textContent
  ).toContain(mockDetails.Year);
  expect(
    screen.getByText(new RegExp(mockDetails.Language, "i")).textContent
  ).toContain(mockDetails.Language);
  expect(
    screen.getByText(new RegExp(mockDetails.Runtime, "i")).textContent
  ).toContain(mockDetails.Runtime);
  expect(
    screen.getByText(new RegExp(mockDetails.Plot, "i")).textContent
  ).toContain(mockDetails.Plot);
});
