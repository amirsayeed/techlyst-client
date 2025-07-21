import React from 'react';

const Pagination = ({ page, totalPages, setPage }) => {
    if(totalPages <= 1) return null;

    return (
        <div className="join flex justify-center mt-10">
           {Array.from({ length: totalPages }).map((_, idx) => (
            <button
                key={idx}
                className={`join-item btn ${page === idx + 1 ? 'btn-active' : ''}`}
                onClick={() => setPage(idx + 1)}
                >
                {idx + 1}
            </button>
        ))} 
        </div>
    );
};

export default Pagination;