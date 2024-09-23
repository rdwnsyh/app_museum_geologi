import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

const SearchBar = ({ placeholder = "Search..." }) => {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query) {
            Inertia.get(route("search"), { search: query });
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="relative w-full max-w-lg mx-auto"
        >
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full py-2 px-4 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF2D20]"
            />
            <button
                type="submit"
                className="absolute top-1/2 right-3 transform -translate-y-1/2"
            >
                Cari
            </button>
        </form>
    );
};

export default SearchBar;
