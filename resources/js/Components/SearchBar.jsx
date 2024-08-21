// src/components/SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ placeholder = 'Search...' }) => {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle search submit logic here
        console.log('Search query:', query);
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-lg mx-auto">

                        <input
                            type="text"
                            value={query}
                            onChange={handleChange}
                            placeholder={placeholder}
                            className="w-full py-2 px-4 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF2D20]"
                        />
                        <svg
                            className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-4.35-4.35M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
                            />
                        </svg>
                        
        </form>
        
    );
};

export default SearchBar;
