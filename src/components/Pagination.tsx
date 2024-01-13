import type { FC } from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, onPreviousPage, onNextPage }) => {
  return (
    <div className="pagination">
      <button className="button button-transparent" onClick={onPreviousPage} disabled={currentPage === 1} />
      {Array.from({ length: totalPages }).map((_, index) => (
        <button className={`button ${index + 1 === currentPage ? 'button-highlight' : ''}`} key={index} onClick={() => onPageChange(index + 1)}>
          {index + 1}
        </button>
      ))}
      <button className="button button-transparent" onClick={onNextPage} disabled={currentPage === totalPages} />
    </div>
  );
};

export default Pagination;
