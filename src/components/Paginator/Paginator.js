import React from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import "./Paginator.scss";
import { connect } from "react-redux";
import { prevPage, nextPage } from "../../store/actionCreators";

const Paginator = ({ page, total, prevPage, nextPage }) => {
  const maxPage = Math.ceil(total / 10);
  return (
    <div className="Paginator">
      <button className="prev" onClick={prevPage}>
        <BiLeftArrow />
      </button>
      <span>{`Page ${page}/${maxPage}`}</span>
      <button className="next" onClick={nextPage}>
        <BiRightArrow />
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    page: state.page,
    total: state.total,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    prevPage: () => {
      dispatch(prevPage());
    },
    nextPage: () => {
      dispatch(nextPage());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Paginator);
