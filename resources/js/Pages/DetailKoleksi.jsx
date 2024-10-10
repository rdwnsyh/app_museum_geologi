import React, { useState } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar"; // Adjust the import path as needed
import { Inertia } from "@inertiajs/inertia"; // Import Inertia for navigation

const DetailKoleksi = () => {
    const { item, type } = usePage().props; // Destructure props passed from the server
    const [searchQuery, setSearchQuery] = useState("");

    // Form handling
    const { data, setData, post } = useForm({});

    const handleAddToCart = () => {
        console.log("Adding to cart:", { itemId: item.id }); // Debugging line
        Inertia.post('/keranjang', { itemId: item.id }, {
            onSuccess: () => {
                // Navigate to the cart page after adding the item
                Inertia.visit('/keranjang');
            },
            onError: (errors) => {
                console.error("Error adding to cart:", errors);
            }
        });
    };
    

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <Head title={item.nama_koleksi} />
            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <img
                                src={item.gambar_satu || "/default-image.png"} // Fallback image
                                alt={item.nama_koleksi}
                                className="w-full h-auto mb-4 rounded-md"
                            />
                            <h3 className="text-lg font-medium leading-6 text-gray-900 text-center">
                                {item.nama_koleksi}
                            </h3>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={post}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-1 gap-6">
                                        {[ 
                                            { label: "Name:", value: item.nama_koleksi },
                                            { label: "Type:", value: type.tipe_bmn || "-" },
                                            { label: "Dimensi:", value: item.dimensions || "-" },
                                            { label: "Lokasi Temuan:", value: item.ditemukan || "-" },
                                            { label: "Deskripsi:", value: item.deskripsi_koleksi || "-" },
                                        ].map((field, index) => (
                                            <div key={index}>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    {field.label}
                                                </label>
                                                <p className="mt-1 text-gray-900">
                                                    {field.value}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-100 text-right sm:px-6">
                                    <Link
                                        href="/"
                                        className="bg-blue py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Kembali ke Koleksi
                                    </Link>
                                    <div className="inline-flex ml-3">
                                    <button
                                        type="button"
                                        onClick={handleAddToCart}
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        Masukkan Keranjang
                                    </button>
                                        <button
                                            type="button"
                                            onClick={() => Inertia.get(`/audio/${item.audio}`)}
                                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Audio
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => Inertia.get(`/video/${item.video}`)}
                                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Video
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailKoleksi;
