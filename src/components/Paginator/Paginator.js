import React from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import "./Paginator.scss";

const Paginator = ({ page, total, setPage }) => {
  const maxPage = Math.ceil(total / 10);
  const prevPage = () => {
    setPage(page > 1 ? page - 1 : 1);
  };
  const nextPage = () => {
    setPage(page < maxPage ? page + 1 : maxPage);
  };
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

export default Paginator;
