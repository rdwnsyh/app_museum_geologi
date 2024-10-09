// Navbar.jsx
import React from 'react';
import { Link } from "@inertiajs/react";
import Logo from "@/Components/Logo/Logo"; // Assuming you have a Logo component
import { ChevronDown, ShoppingCart } from "lucide-react"; // Import the ShoppingCart icon
import Keranjang from '@/Pages/Keranjang';

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
                <div className="flex items-center space-x-4">
                    <Link
                        href="/keranjang" // Ensure this points to the correct route for the Keranjang page
                        className="flex items-center text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <ShoppingCart size={20} className="mr-1" /> {/* Cart icon */}
                        
                    </Link>
                    <div className="relative">
                        <Link
                            href="/"
                            className="flex items-center text-white"
                        >
                            <span className="mr-1"></span>
                            <ChevronDown
                                size={20}
                                className="text-gray-800 group-hover:text-indigo-600"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
