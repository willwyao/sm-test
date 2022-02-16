import React from "react";
import "./MovieDetails.scss";
import { connect } from "react-redux";
import { loadDetails } from "../../store/actionCreators";

const MovieDetails = ({
  details,
  detailsLoading,
  selectedMovie,
  loadDetails,
}) => {
  React.useEffect(() => {
    if (selectedMovie) {
      loadDetails(selectedMovie);
    }
  }, [selectedMovie, loadDetails]);
  if (detailsLoading === true) {
    return (
      <div className="MovieDetails">
        <p className="MovieDetails-empty">Movie data is loading....</p>
      </div>
    );
  } else {
    if (Object.keys(details).length === 0) {
      return (
        <div className="MovieDetails">
          <p className="MovieDetails-empty">
            Please select a title from the sidebar
          </p>
        </div>
      );
    } else {
      const {
        Title: title,
        Year: year,
        Actors: cast,
        Language: language,
        Plot: synopsis,
        Poster: thumb,
        Runtime: duration,
      } = details;

      const castArr = cast ? cast.split(",") : [];
      return (
        <div className="MovieDetails">
          <div className="MovieDetails-header">
            <h1>{title}</h1>
            <span>{`(${year})`}</span>
          </div>
          <div className="MovieDetails-main">
            <div className="MovieDetails-sidebar">
              <img src={thumb} alt={title} />
              <div className="MovieDetails-info">
                <div>
                  <span>Language</span>
                  {language}
                </div>
                <div>
                  <span>Duration</span>
                  {duration}
                </div>
                <div>
                  <span>Cast</span>
                  {castArr.map((actor, index) => {
                    return <p key={index}>{actor.trim()}</p>;
                  })}
                </div>
              </div>
            </div>
            <div className="MovieDetails-content">
              <h2>Synopsis</h2>
              <p>{synopsis}</p>
            </div>
          </div>
        </div>
      );
    }
  }
};

const mapStateToProps = (state) => {
  return {
    details: state.details,
    detailsLoading: state.detailsLoading,
    selectedMovie: state.selectedMovie,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadDetails: (selectedMovie) => dispatch(loadDetails(selectedMovie)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
