import React from "react";

interface PaginationProps {
  page: number;
  pages: number;
  onClick: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, pages, onClick }) => {
  const pageNumbers: number[] = [];

  // Calculate the starting page for the current range
  const startPage = Math.max(1, page - 1);

  // Calculate the ending page for the current range
  const endPage = Math.min(pages, startPage + 3);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="text-center pb-6">
      {pages > 4 ? (
        <button
          className="bg-blue-500 rounded-sm text-white py-2 px-2 mr-3"
          onClick={() => onClick(1)}
          disabled={page === 1}
        >
          {"<<"}
        </button>
      ) : (
        ""
      )}
      {pages > 1 ? (
        <button
          className="bg-blue-500 rounded-sm text-white py-2 px-2 mr-3"
          onClick={() => onClick(page - 1)}
          disabled={page === 1}
        >
          {"<"}
        </button>
      ) : (
        ""
      )}
      {pages > 1
        ? pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              className={`${
                pageNumber === page ? "bg-blue-700" : "bg-blue-500"
              } rounded-sm text-white py-2 px-2 mr-2`}
              onClick={() => onClick(pageNumber)}
            >
              {pageNumber}
            </button>
          ))
        : ""}

      {pages > 1 ? (
        <button
          className="bg-blue-500 rounded-sm text-white py-2 px-2 ml-3"
          onClick={() => onClick(page + 1)}
          disabled={page === pages}
        >
          {">"}
        </button>
      ) : (
        ""
      )}
      {pages > 4 ? (
        <button
          className="bg-blue-500 rounded-sm text-white py-2 px-2 ml-3"
          onClick={() => onClick(pages)}
          disabled={page === pages}
        >
          {">>"}
        </button>
      ) : (
        ""
      )}
      {
        <span className={` rounded-sm  py-2 px-2 mr-2`}>
          Page {page} of {pages}
        </span>
      }
    </div>
  );
};

export default Pagination;
