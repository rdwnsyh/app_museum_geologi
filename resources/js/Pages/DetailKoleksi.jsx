import React, { useState } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar"; // Adjust the import path as needed
import { Inertia } from "@inertiajs/inertia"; // Import Inertia for navigation

const DetailKoleksi = () => {
    const { item, type } = usePage().props; // Destructure props passed from the server
    const [searchQuery, setSearchQuery] = useState("");
    const [currentAudio, setCurrentAudio] = useState('');
    const [currentVideo, setCurrentVideo] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

    const audioSource = '/Audio.mp3'; // Single audio source
    const videoSource = '/Video.mp4'; // Single video source

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

    const handleAudioClick = () => {
        setCurrentAudio(audioSource);
        setCurrentVideo(''); // Reset video when audio is clicked
        setIsModalOpen(true); // Open modal
    };

    const handleVideoClick = () => {
        setCurrentVideo(videoSource);
        setCurrentAudio(''); // Reset audio when video is clicked
        setIsModalOpen(true); // Open modal
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentAudio(''); // Clear audio
        setCurrentVideo(''); // Clear video
    };

    const handleModalClick = (event) => {
        // Check if the click is outside the modal content
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
                                <img
                                    src={item.gambar_satu || "/batu.png"}
                                    alt={item.nama_koleksi}
                                    className="inline-block w-full h-auto rounded-md"
                                />
                                <img
                                    src={item.gambar_dua || "/batu.png"}
                                    alt={item.nama_koleksi}
                                    className="inline-block w-full h-auto rounded-md"
                                />
                                <img
                                    src={item.gambar_tiga || "/batu.png"} // Corrected to gambar_tiga
                                    alt={item.nama_koleksi}
                                    className="inline-block w-full h-auto rounded-md"
                                />
                            </div>
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
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Modal for Audio/Video */}
            {isModalOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={handleModalClick} // Handle click on modal background
                >
                    <div className="bg-white rounded-lg p-4 w-11/12 md:w-1/3">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            &times; {/* Close icon */}
                        </button>
                        {currentAudio && (
                            <audio controls className="w-full">
                                <source src={currentAudio || '/Audio.mp3'} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        )}
                        {currentVideo && (
                            <video controls className="w-full mt-4">
                                <source src={currentVideo || '/Vidio.mp4'} type="video/mp4" />
                                Your browser does not support the video element.
                            </video>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailKoleksi;
