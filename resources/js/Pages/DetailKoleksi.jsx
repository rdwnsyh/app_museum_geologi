import React, { useState } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar";

const DetailKoleksi = () => {
    const { item } = usePage().props; // item passed from Laravel controller
    const [searchQuery, setSearchQuery] = useState("");
    const [currentAudio, setCurrentAudio] = useState("");
    const [currentVideo, setCurrentVideo] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // Initialize the form for adding items to the cart
    const { post, data, setData, reset } = useForm({
        koleksi_id: item.id || "",
        quantity: 1, // default quantity
    });

    const handleAddToCart = (e) => {
        e.preventDefault();

        post("/keranjang/add", {
            data,
            onSuccess: () => {
                setSuccessMessage("Item berhasil ditambahkan ke keranjang!");
                reset("quantity");
            },
            onError: (errors) => {
                console.error("Error adding to cart:", errors);
            },
        });
    };

    // Function to handle audio modal
    const handleAudioClick = () => {
        if (item.audio) {
            setCurrentAudio(`/storage/${item.audio}`);
        }
        setCurrentVideo("");
        setIsModalOpen(true);
    };

    // Function to handle video modal
    const handleVideoClick = () => {
        if (item.vidio) {
            setCurrentVideo(`/storage/${item.vidio}`);
        }
        setCurrentAudio("");
        setIsModalOpen(true);
    };

    // Close modal function
    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentAudio("");
        setCurrentVideo("");
    };

    // Close modal on outside click
    const handleModalClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <Head title={item.nama_koleksi} />
            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="flex flex-col items-center">
                            <div className="overflow-x-auto whitespace-nowrap mb-8">
                                {[
                                    item.gambar_satu,
                                    item.gambar_dua,
                                    item.gambar_tiga,
                                ].map((gambar, index) => (
                                    <img
                                        key={index}
                                        src={
                                            gambar
                                                ? `/storage/${gambar}`
                                                : "/batu.png"
                                        }
                                        alt={item.nama_koleksi}
                                        className="inline-block w-full h-auto rounded-md"
                                    />
                                ))}
                            </div>
                            <h3 className="text-lg font-medium leading-6 text-gray-900 text-center">
                                {item.nama_koleksi}
                            </h3>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={handleAddToCart}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-1 gap-6">
                                        {[
                                            {
                                                label: "Name:",
                                                value: item.nama_koleksi,
                                            },
                                            {
                                                label: "Type:",
                                                value: item.tipe_bmn || "-",
                                            },
                                            {
                                                label: "Dimensi:",
                                                value: item.dimensions || "-",
                                            },
                                            {
                                                label: "Lokasi Temuan:",
                                                value: item.ditemukan || "-",
                                            },
                                            {
                                                label: "Deskripsi:",
                                                value:
                                                    item.deskripsi_koleksi ||
                                                    "-",
                                            },
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
                                    <button
                                        type="submit"
                                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        Masukkan Keranjang
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleAudioClick}
                                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Audio
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleVideoClick}
                                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Video
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {isModalOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                        onClick={handleModalClick}
                    >
                        <div className="bg-white rounded-lg p-4 w-11/12 md:w-1/3">
                            <button
                                onClick={closeModal}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            >
                                &times;
                            </button>
                            {currentAudio && (
                                <audio controls className="w-full">
                                    <source
                                        src={currentAudio}
                                        type="audio/mpeg"
                                    />
                                    Your browser does not support the audio
                                    element.
                                </audio>
                            )}
                            {currentVideo && (
                                <video controls className="w-full">
                                    <source
                                        src={currentVideo}
                                        type="video/mp4"
                                    />
                                    Your browser does not support the video
                                    element.
                                </video>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DetailKoleksi;
