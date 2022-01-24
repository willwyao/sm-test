import { render, waitFor, screen } from "@testing-library/react";
import MovieList from '../components/MovieList/MovieList';
import MovieItem from "../components/MovieItem/MovieItem";

const emptyMovies = [];
const mockMovies = [
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: "1977",
    id: "tt0076759",
    thumb:
      "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
  },
];

jest.mock("../components/MovieItem/MovieItem", ()=>{
  return function MockItem(prop) {
    return (
      <div data-testid="item" key={prop.id}>
        {prop.title},
        {prop.year},
        {prop.id}
      </div>
    );
  };
})

it("randers with an empty movie list", () => {
  render(<MovieList movies={emptyMovies} />);

  expect(screen.getByText(/Didn't find any movie!/i)).toBeVisible();
});

it('renders the provided movie list',()=>{
  render(<MovieList movies={mockMovies} />);
  expect(screen.getAllByTestId('item').length).toBe(mockMovies.length);
});

it('renders movie items with props',()=>{
  render(<MovieList movies={mockMovies} />);
  expect(screen.getByTestId('item').textContent).toContain(mockMovies[0].title);
  expect(screen.getByTestId('item').textContent).toContain(mockMovies[0].year);
  expect(screen.getByTestId('item').textContent).toContain(mockMovies[0].id);
});