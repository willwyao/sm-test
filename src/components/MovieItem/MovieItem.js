import React from "react";
import './MovieItem.scss';

const MovieItem = (props) => {
  const { id, title, year, thumb, selectedMovie, setSelectedMovie } = props;

  return (
    <li
      className={`MovieItem ${id === selectedMovie && "active"}`}
      onClick={() => setSelectedMovie(id)}
    >
      <div className="MovieItem-thumb">
        <img src={thumb} alt={title} />
      </div>
      <div className="MovieItem-info">
        <h4>{title}</h4>
        <p>({year})</p>
      </div>
    </li>
  );
};

export default MovieItem;
