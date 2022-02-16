import React from "react";
import { FaSistrix } from "react-icons/fa";
import "./SearchBar.scss";
import { connect } from "react-redux";
import { searchMovie, clearSearch } from "../../store/actionCreators";

const SearchBar = ({ searchTerm, searchMovie, clearSearch }) => {
  const [inputValue, setInputValue] = React.useState(searchTerm);

  const handleClear = () => {
    setInputValue("");
    clearSearch();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovie(inputValue);
  };

  return (
    <div className="SearchBar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search here"
        />
        {inputValue === searchTerm ? (
          <button onClick={handleClear}>X</button>
        ) : (
          <button type="submit">
            <FaSistrix />
          </button>
        )}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchMovie: (searchTerm) => {
      dispatch(searchMovie(searchTerm));
    },
    clearSearch: () => {
      dispatch(clearSearch());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
