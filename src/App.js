import React from "react";
import "./App.scss";
import SearchBar from "./components/SearchBar/SearchBar";
import MovieList from "./components/MovieList/MovieList";
import Paginator from "./components/Paginator/Paginator";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import { connect } from "react-redux";
function App({ total }) {
  // const [page, setPage] = React.useState(1);
  // const [searchTerm, setSearchTerm] = React.useState("star");
  // const [selectedMovie, setSelectedMovie] = React.useState("");
  // const { total, movies, movieLoading } = useMovies(searchTerm, page);
  // const { details, detailsLoading } = useDetails(selectedMovie);

  return (
    <div className="App">
      <section className="App-sidebar">
        <SearchBar />
        <MovieList />
        {total > 10 && <Paginator />}
      </section>
      <section className="App-main">
        <MovieDetails />
      </section>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    total: state.total,
  };
};

export default connect(mapStateToProps)(App);
