import React, { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search query:', query);
    // Implement your search logic here
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-start items-center mb-6">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Cari Koleksi..."
        className="w-full max-w-sm py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Cari
      </button>
    </form>
  );
};

export default SearchBar;
