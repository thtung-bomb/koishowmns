import React from 'react';

const Pagination: React.FC = ({ onPageChange, currentPage, items, pageSize }) => {
    const totalPages = Math.ceil(items.length / pageSize);
    const renderPaginationLinks = () => {
        return Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <li key={pageNumber} className="pagination-item">
                <a
                    href=""
                    onClick={() => onPageChange(pageNumber)}
                    className={pageNumber === currentPage ? "bg-orange-500 rounded-[4px] text-white" : ""}
                >
                    {pageNumber}
                </a>
            </li>
        ));
    };

    return (
        <ul className='pagination my-8 flex-wrap gap-4 py-6'>
            <li>
                <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            </li>
            <div className='flex gap-2'>{renderPaginationLinks()}</div>
            <li>
                <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </li>
        </ul>
    );
};

export default Pagination;
