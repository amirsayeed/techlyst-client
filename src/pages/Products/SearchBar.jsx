import React from 'react';

const SearchBar = ({search, setSearch, setPage}) => {
    return (
        <div className="mb-8 max-w-md mx-auto">
            <input
            type="text"
            placeholder="Search by tag..."
            value={search}
            onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            />
        </div>
    );
};

export default SearchBar;