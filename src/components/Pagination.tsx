import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    totalCount,
    limit,
    onPageChange,
}) => {
    return (
        <div className="flex items-center justify-between bg-white px-4 mt-2 sm:px-6">
            <div className="flex flex-1 justify-between">
                <p className="text-sm text-gray-500 text-center lg:block">
                    Showing {Math.min((currentPage - 1) * limit + 1, totalCount)}-
                    {Math.min(currentPage * limit, totalCount)} of {totalCount} items
                </p>
            </div>
            <div className="lg:items-center bg-white">
                <nav className="isolate inline-flex -space-x-px rounded-md" aria-label="Pagination">
                    <button
                        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                        <i className="ri-arrow-left-s-line text-sm"></i>
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => onPageChange(pageNumber)}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === pageNumber
                                ? "bg-blue-600 text-white"
                                : "text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                                } focus:z-20 focus:outline-offset-0`}
                        >
                            {pageNumber}
                        </button>
                    ))}
                    <button
                        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                        <i className="ri-arrow-right-s-line text-sm"></i>
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default Pagination;