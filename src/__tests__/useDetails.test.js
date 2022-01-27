import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useDetails } from "../hooks/useDetails";
import { fetchDetailsAsync } from "../hooks/utils";

const mockResponseDetails = {
  Title: "test title",
  Year: "1977",
  Rated: "PG",
  Released: "25 May 1977",
  Runtime: "121 min",
  Genre: "Action, Adventure, Fantasy",
  Director: "George Lucas",
  Writer: "George Lucas",
  Actors: "Mark Hamill, Harrison Ford, Carrie Fisher",
  Plot: "The Imperial Forces, under orders from cruel Darth Vader, hold Princess Leia hostage in their efforts to quell the rebellion against the Galactic Empire. Luke Skywalker and Han Solo, captain of the Millennium Falcon, work together with the companionable droid duo R2-D2 and C-3PO to rescue the beautiful princess, help the Rebel Alliance and restore freedom and justice to the Galaxy.",
  Language: "English",
  Country: "United States",
  Awards: "Won 7 Oscars. 63 wins & 29 nominations total",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
  Ratings: [
    {
      Source: "Internet Movie Database",
      Value: "8.6/10",
    },
    {
      Source: "Rotten Tomatoes",
      Value: "92%",
    },
    {
      Source: "Metacritic",
      Value: "90/100",
    },
  ],
  Metascore: "90",
  imdbRating: "8.6",
  imdbVotes: "1,299,658",
  imdbID: "test123",
  Type: "movie",
  DVD: "06 Dec 2005",
  BoxOffice: "$460,998,507",
  Production: "N/A",
  Website: "N/A",
  Response: "True",
};

jest.mock("../hooks/utils");

const TestComponent = ({ movieId }) => {
  const { details } = useDetails(movieId);
  return (
    <div>
      <div data-testid="details-title">{details.Title}</div>
      <div data-testid="details-id">{details.imdbID}</div>
    </div>
  );
};

it("should return movie details", async () => {
  fetchDetailsAsync.mockResolvedValue(mockResponseDetails);
  
  render(<TestComponent movieId={"test"} />);

  expect(fetchDetailsAsync).toBeCalled();
  expect(fetchDetailsAsync).toBeCalledWith("test");

  const testTitle = await screen.findByTestId("details-title");
  const testId = await screen.findByTestId("details-id");
  expect(testTitle.textContent).toBe("test title");
  expect(testId.textContent).toBe("test123");
});
