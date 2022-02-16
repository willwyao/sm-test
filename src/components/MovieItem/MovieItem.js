import React from "react";
import "./MovieItem.scss";
import { connect } from "react-redux";
import { selectMovie } from "../../store/actionCreators";

const MovieItem = (props) => {
  const { movie, selectedMovie, selectMovie } = props;
  const { id, title, thumb, year } = movie;
  return (
    <li
      className={`MovieItem ${id === selectedMovie && "active"}`}
      onClick={() => selectMovie(id)}
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

const mapStateToProps = (state) => {
  return {
    selectedMovie: state.selectedMovie,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectMovie: (movieId) => {
      dispatch(selectMovie(movieId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieItem);
