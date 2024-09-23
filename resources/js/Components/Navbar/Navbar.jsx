// Navbar.jsx
import React from 'react';
import { Link } from "@inertiajs/react";
import Logo from "@/Components/Logo/Logo"; // Assuming you have a Logo component
import { ChevronDown } from "lucide-react";

const Navbar = ({ searchQuery, setSearchQuery }) => {
    return (
        <nav className="bg-yellow-500 shadow-lg p-4">
            <div className="container mx-auto flex justify-between items-center">
            <Link className="mt-1" href="/">
                <Logo className="text-white fill-current" width="120" height="28" />
            </Link>
                <div className="flex-1 relative rounded-md shadow-sm">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="form-input py-2 px-3 pr-8 leading-5 block w-full rounded-md sm:text-sm sm:leading-5 bg-yellow-400 border-yellow-500 placeholder-gray-700 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                        placeholder="Cari koleksi..."
                    />
                </div>
                <div className="space-x-4">
                
                    {/* <Link href="/" className="text-white hover:underline">
                        Home
                    </Link>
                    <Link href="/koleksi" className="text-white hover:underline">
                        Koleksi
                    </Link>
                    <Link href="/about" className="text-white hover:underline">
                        About
                    </Link>
                    <Link href="/contact" className="text-white hover:underline">
                        Contact
                    </Link> */}
                    <div className="ml-4 relative">
                    <Link
                        href="/"
                        // className="flex items-center bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        
                        <ChevronDown
                            size={20}
                            className="ml-2 text-gray-800 group-hover:text-indigo-600"
                        />
                    </Link>

                        {/* <button
                            type="button"
                            className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                            id="user-menu"
                            aria-label="User menu"
                            aria-haspopup="true"
                        >
                            <img
                                className="h-8 w-8 rounded-full"
                                src="/images/user.png" // Replace with your user image
                                alt="User"
                            />
                        </button> */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
