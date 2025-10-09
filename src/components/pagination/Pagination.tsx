import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface IPagination {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  maxPageButtons: number;
}

function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  maxPageButtons,
}: IPagination) {
  // 🧠 Logic to calculate visible page range
  const half = Math.floor(maxPageButtons / 2);
  let startPage = Math.max(1, currentPage - half);
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  // Adjust if we're near the end
  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex justify-center items-center gap-1 my-2">
      {/* Previous Button */}
      <button
        className={`flex justify-center items-center rounded-md border border-gray-300 text-sm px-2 py-2 ${
          currentPage === 1 ? "text-gray-400" : "hover:bg-[#1E2939] hover:text-white cursor-pointer"
        }`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <MdChevronLeft />
        <span>Prev</span>
      </button>

      {/* Show "1 ..." if not starting from page 1 */}
      {startPage > 1 && (
        <>
          <button
            className="rounded-md border border-gray-300 text-sm px-2.5 py-2 hover:bg-[#1E2939] hover:text-white cursor-pointer"
            onClick={() => onPageChange(1)}
          >
            1
          </button>
          <span className="px-1 text-gray-500">...</span>
        </>
      )}

      {/* Main Page Numbers */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`rounded-md border border-gray-300 text-sm px-2.5 py-2 cursor-pointer ${
            currentPage === page
              ? "bg-[#1E2939] font-bold text-white"
              : "hover:bg-[#1E2939] hover:text-white"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* Show "... N" if not ending on last page */}
      {endPage < totalPages && (
        <>
          <span className="px-1 text-gray-500">...</span>
          <button
            className="rounded-md border border-gray-300 text-sm px-2.5 py-2 hover:bg-[#1E2939] hover:text-white cursor-pointer"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        className={`flex justify-center items-center rounded-md border border-gray-300 text-sm px-2 py-2 ${
          currentPage === totalPages
            ? "text-gray-400"
            : "hover:bg-[#1E2939] hover:text-white cursor-pointer"
        }`}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <span>Next</span>
        <MdChevronRight />
      </button>
    </div>
  );
}

export default Pagination;
