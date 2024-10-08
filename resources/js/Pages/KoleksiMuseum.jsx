import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar"; // Adjust the import path as needed

const KoleksiMuseum = () => {
    const { results } = usePage().props;
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState("");

    const openModal = (description) => {
        setSelectedDescription(description);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDescription("");
    };

    // Filter results based on search query
    const filteredResults = results.filter((item) =>
        item.nama_koleksi.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Hasil Pencarian</h1>

                <div className="space-y-4">
                    {filteredResults.length > 0 ? (
                        filteredResults.map((item) => (
                            <div
                                key={item.id}
                                className="border p-4 rounded-lg shadow flex items-center"
                            >
                                <div className="flex-grow">
                                    <h2 className="text-xl font-semibold">
                                        <a
                                            href={`/detail/${item.id}/koleksi`} // Update the link to point to the detailkoleksi page
                                            className="text-blue-500 hover:underline"
                                        >
                                            {item.nama_koleksi}
                                        </a>
                                    </h2>
                                    <p className="text-gray-500 mt-1">
                                        {item.deskripsi_koleksi ||
                                            "Deskripsi tidak tersedia."}
                                    </p>
                                    <a
                                        href={`/detail/${item.id}/batuan`}
                                        className="text-blue-500 hover:underline mt-2 block"
                                    >
                                        Lihat Detail
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">
                            Tidak ada hasil ditemukan.
                        </p>
                    )}
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg p-8 max-w-5xl w-full">
                            <button
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                                onClick={closeModal}
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>

                            {selectedDescription && (
                                <p className="text-gray-800">
                                    {selectedDescription}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default KoleksiMuseum;
