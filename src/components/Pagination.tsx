import React from "react";
import ReactPaginate from "react-paginate";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface PaginationProps {
  pageCount: number;
  onPageChange: (event: { selected: number }) => void;
}

function Pagination(props: PaginationProps) {
  const { onPageChange, pageCount } = props;
  return (
    <div className="flex justify-center mt-5">
      <ReactPaginate
        className="react-paginate"
        breakClassName={"item break-me "}
        breakLabel={"..."}
        containerClassName={"pagination"}
        disabledClassName={"disabled-page"}
        marginPagesDisplayed={2}
        nextClassName={"item next "}
        nextLabel={<ArrowForwardIosIcon style={{ fontSize: 18 }} />}
        onPageChange={onPageChange}
        pageCount={pageCount}
        pageClassName={"item pagination-page "}
        pageRangeDisplayed={2}
        previousClassName={"item previous"}
        previousLabel={<ArrowBackIosIcon style={{ fontSize: 18 }} />}
      />
    </div>
  );
}

export default Pagination;
