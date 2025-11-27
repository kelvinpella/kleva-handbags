import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-1 mt-12 mb-8">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          scroll={true}
          className="px-4 py-2 border border-neutral-300 text-sm font-medium text-neutral-900 bg-white hover:bg-neutral-50 transition-colors min-w-[90px]"
        >
          Previous
        </Link>
      ) : (
        <button
          disabled
          className="px-4 py-2 border border-neutral-300 text-sm font-medium text-neutral-900 bg-white opacity-30 cursor-not-allowed min-w-[90px]"
        >
          Previous
        </button>
      )}

      {/* Page Numbers - Desktop */}
      <div className="hidden md:flex space-x-1">
        {getPageNumbers().map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <span key={`ellipsis-${index}`} className="px-4 py-2 text-neutral-500">
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = currentPage === pageNum;

          return (
            <Link
              key={pageNum}
              href={`${basePath}?page=${pageNum}`}
              scroll={true}
              className={`min-w-[44px] px-4 py-2 border text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'border-neutral-300 text-neutral-900 bg-white hover:bg-neutral-50'
              }`}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {/* Page Info - Mobile */}
      <div className="md:hidden">
        <span className="px-4 py-2 text-sm text-neutral-700">
          Page {currentPage} of {totalPages}
        </span>
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          scroll={true}
          className="px-4 py-2 border border-neutral-300 text-sm font-medium text-neutral-900 bg-white hover:bg-neutral-50 transition-colors min-w-[90px]"
        >
          Next
        </Link>
      ) : (
        <button
          disabled
          className="px-4 py-2 border border-neutral-300 text-sm font-medium text-neutral-900 bg-white opacity-30 cursor-not-allowed min-w-[90px]"
        >
          Next
        </button>
      )}
    </div>
  );
}