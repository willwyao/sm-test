import React from "react";
import { FaSistrix } from "react-icons/fa";
import "./SearchBar.scss";

const SearchBar = ({ searchTerm, setSearchTerm, setPage }) => {
  const [inputValue, setInputValue] = React.useState(searchTerm);

  const clearSearch = () => {
    setInputValue('');
    setSearchTerm('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(inputValue);
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
        {inputValue===searchTerm ? (
          <button onClick={clearSearch}>X</button>
        ) : (
          <button type="submit">
            <FaSistrix />
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
