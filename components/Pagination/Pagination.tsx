import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selected: number) => void;
}

export default function Pagination({ pageCount, currentPage, onPageChange }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      forcePage={currentPage - 1} 
      onPageChange={(event) => onPageChange(event.selected + 1)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
    />
  );
}
