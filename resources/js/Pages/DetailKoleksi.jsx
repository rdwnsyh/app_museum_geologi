import React, { useState } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar"; // Adjust the import path as needed
import { Inertia } from "@inertiajs/inertia"; // Import Inertia for navigation

const DetailKoleksi = () => {
    const { item, type } = usePage().props; // Destructure props passed from the server
    const [searchQuery, setSearchQuery] = useState("");

    // Form handling for further functionalities if needed
    const { data, setData, post } = useForm({});

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <Head title={item.nama_koleksi} />{" "}
            {/* Set the page title dynamically */}
            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            {/* Display the image of the collection */}
                            <img
                                src={item.gambar_satu || "/default-image.png"} // Fallback image if no image is provided
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
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Name:
                                            </label>
                                            <p className="mt-1 text-gray-900">
                                                {item.nama_koleksi}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Type:
                                            </label>
                                            <p className="mt-1 text-gray-900">
                                                {type.tipe_bmn || "-"}
                                            </p>{" "}
                                            {/* Display the type or a fallback */}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Dimensi:
                                            </label>
                                            <p className="mt-1 text-gray-900">
                                                {item.dimensions || "-"}
                                            </p>{" "}
                                            {/* Fallback if dimensions are not available */}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Lokasi Temuan:
                                            </label>
                                            <p className="mt-1 text-gray-900">
                                                {item.ditemukan || "-"}
                                            </p>{" "}
                                            {/* Fallback if location is not available */}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Deskripsi:
                                            </label>
                                            <p className="mt-1 text-gray-900">
                                                {item.deskripsi_koleksi || "-"}
                                            </p>{" "}
                                            {/* Fallback if description is not available */}
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <Link
                                        href="/"
                                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Kembali ke Koleksi
                                    </Link>
                                    <div className="inline-flex ml-3">
                                        {/* Link to audio resource if available */}
                                        {item.audio && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    Inertia.get(
                                                        `/audio/${item.audio}`
                                                    )
                                                }
                                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Audio
                                            </button>
                                        )}
                                        {/* Link to video resource if available */}
                                        {item.video && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    Inertia.get(
                                                        `/video/${item.video}`
                                                    )
                                                }
                                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Video
                                            </button>
                                        )}
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
