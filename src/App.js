import React from "react";
import "./App.scss";
import SearchBar from "./components/SearchBar/SearchBar";
import MovieList from "./components/MovieList/MovieList";
import Paginator from "./components/Paginator/Paginator";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import { useMovies } from "./hooks/useMovies";
import { useDetails } from "./hooks/useDetails";
function App() {
  const [page, setPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState("star");
  const [selectedMovie, setSelectedMovie] = React.useState("");
  const { total, movies, movieLoading } = useMovies(searchTerm, page);
  const { details, detailsLoading } = useDetails(selectedMovie);

  return (
    <div className="App">
      <section className="App-sidebar">
        <SearchBar {...{ searchTerm, setSearchTerm, setPage }} />
        <MovieList
          {...{ movies, movieLoading, selectedMovie, setSelectedMovie }}
        />
        {total > 10 && <Paginator {...{ total, page, setPage }} />}
      </section>
      <section className="App-main">
        <MovieDetails {...{ details, detailsLoading }} />
      </section>
    </div>
  );
}

export default App;
