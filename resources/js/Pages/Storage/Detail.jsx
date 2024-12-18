import React, { useState, useRef } from "react";
import { Head, usePage, Link } from "@inertiajs/react";
import MainLayout from '@/Layouts/MainLayout';
import { Container, Typography } from '@mui/material';

const Detail = () => {
    const { item } = usePage().props;
    const [currentAudio, setCurrentAudio] = useState("");
    const [currentVideo, setCurrentVideo] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Ref for the image container to control scroll
    const scrollContainerRef = useRef(null);

    // Handle audio click to open modal
    const handleAudioClick = () => {
        if (item.audio) {
            setCurrentAudio(`/kelolakoleksi/${item.audio}`);
        }
        setCurrentVideo("");
        setIsModalOpen(true);
    };

    // Handle video click to open modal
    const handleVideoClick = () => {
        if (item.vidio) {
            setCurrentVideo(`/kelolakoleksi/${item.vidio}`);
        }
        setCurrentAudio("");
        setIsModalOpen(true);
    };

    // Close modal
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

    // Scroll images left
    const handleScrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    // Scroll images right
    const handleScrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    return (
        <Container maxWidth="xl" className="py-6">
            <Typography variant="h4" sx={{ mb: 6 }}>
                Tata Letak
            </Typography>
            <Head title={item.nama_koleksi} />
            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                    <div className="relative">
                        {/* Left Arrow Button */}
                        <button
                            onClick={handleScrollLeft}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-800 p-4 rounded-full shadow-md hover:bg-gray-100 focus:outline-none z-10 text-3xl"
                        >
                            &larr; {/* Left Arrow */}
                        </button>

                        {/* Scrollable Image Container */}
                        <div
                            ref={scrollContainerRef}
                            className="overflow-x-auto mb-8"
                            style={{
                                display: "flex",
                                scrollSnapType: "x mandatory",
                                scrollbarWidth: "thin",  // This controls the size of the scrollbar
                            }}
                        >
                            {[item.gambar_satu, item.gambar_dua, item.gambar_tiga].map((gambar, index) => (
                                <div
                                    key={index}
                                    className="inline-block w-full flex-shrink-0 p-2"
                                    style={{ scrollSnapAlign: "start" }}
                                >
                                    <img
                                        src={gambar ? `/storage/${gambar}` : "/batu.png"}
                                        alt={item.nama_koleksi}
                                        className="w-full h-auto object-contain rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Right Arrow Button */}
                        <button
                            onClick={handleScrollRight}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-800 p-4 rounded-full shadow-md hover:bg-gray-100 focus:outline-none z-10 text-3xl"
                        >
                            &rarr; {/* Right Arrow */}
                        </button>
                    </div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900 text-center">
                        {item.nama_koleksi}
                    </h3>
                    </div>

                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="shadow overflow-hidden sm:rounded-md">
                            <div className="px-4 py-5 bg-white sm:p-6">
                                <div className="grid grid-cols-1 gap-6">
                                    {[{
                                        label: "Name:",
                                        value: item.nama_koleksi,
                                    },
                                    {
                                        label: "Type:",
                                        value: item.tipe_bmn || "-",
                                    },
                                    {
                                        label: "Satuan:",
                                        value: item.satuan || "-",
                                    },
                                    {
                                        label: "Lokasi Temuan:",
                                        value: item.ditemukan || "-",
                                    },
                                    {
                                        label: "Deskripsi:",
                                        value: item.deskripsi_koleksi || "-",
                                    },
                                    ].map((field, index) => (
                                        <div key={index}>
                                            <label className="block text-sm font-medium text-gray-700">
                                                {field.label}
                                            </label>
                                            <p className="mt-1 text-gray-900">{field.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-100 text-right sm:px-6 space-x-3">
                                <button
                                    onClick={() => window.history.back()}
                                    className="bg-blue py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Back
                                </button>
                                <button
                                    type="button"
                                    onClick={handleAudioClick}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Audio
                                </button>
                                <button
                                    type="button"
                                    onClick={handleVideoClick}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Video
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pop-up Modal for Audio/Video */}
                {isModalOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                        onClick={handleModalClick}
                    >
                        <div className="bg-white rounded-lg p-4 w-11/12 md:w-1/3 relative">
                            <button
                                onClick={closeModal}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                style={{
                                    zIndex: 10,
                                }}
                            >
                                &times;
                            </button>
                            {currentAudio && (
                                <audio controls className="w-full">
                                    <source src={currentAudio} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                            )}
                            {currentVideo && (
                                <video controls className="w-full">
                                    <source src={currentVideo} type="video/mp4" />
                                    Your browser does not support the video element.
                                </video>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
};

Detail.layout = (page) => <MainLayout title="Storage - Detail">{page}</MainLayout>;

export default Detail;
