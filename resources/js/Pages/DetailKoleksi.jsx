import React, { useState } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar";

const DetailKoleksi = () => {
    const { item } = usePage().props;
    const [searchQuery, setSearchQuery] = useState("");
    const [currentAudio, setCurrentAudio] = useState("");
    const [currentVideo, setCurrentVideo] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [checkoutData, setCheckoutData] = useState({
        users_id: "", // Assuming this comes from your auth context
        tanggal_pinjam: "",
        tanggal_jatuh_tempo: "",
        status: "Pengajuan", // Default status
        identitas: null,
        surat_permohonan: null,
    });

    const { post } = useForm();

    const handleAddToCart = () => {
        const itemId = item.users_id || null; // Fallback to null
        console.log("Adding to cart:", { itemId });
    
        if (itemId) {
            setCartItems((prev) => [...prev, { id: itemId, nama_koleksi: item.nama_koleksi }]);
            localStorage.setItem('cart', JSON.stringify([...cartItems, { id: itemId, nama_koleksi: item.nama_koleksi }]));
        } else {
            console.error("Item ID is undefined, cannot add to cart.");
            alert("Item ID is not available. Please check the item details.");
        }
    };

    const handleAudioClick = () => {
        if (item.audio) {
            setCurrentAudio(`/storage/${item.audio}`);
        }
        setCurrentVideo("");
        setIsModalOpen(true);
    };

    const handleVideoClick = () => {
        if (item.vidio) {
            setCurrentVideo(`/storage/${item.vidio}`);
        }
        setCurrentAudio("");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentAudio("");
        setCurrentVideo("");
    };

    const handleModalClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

    const handleCheckout = async () => {
        const formData = new FormData();
        formData.append('users_id', checkoutData.users_id);
        formData.append('tanggal_pinjam', checkoutData.tanggal_pinjam);
        formData.append('tanggal_jatuh_tempo', checkoutData.tanggal_jatuh_tempo);
        formData.append('status', checkoutData.status);
        
        if (checkoutData.identitas) {
            formData.append('identitas', checkoutData.identitas);
        }
        if (checkoutData.surat_permohonan) {
            formData.append('surat_permohonan', checkoutData.surat_permohonan);
        }

        try {
            const response = await fetch('/checkout', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to checkout");
            }

            setSuccessMessage("Peminjaman berhasil diajukan!");
            setCartItems([]); // Reset cart items or navigate as needed

        } catch (error) {
            console.error("Checkout error:", error);
            setSuccessMessage("Checkout failed. Please try again.");
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
                                {[item.gambar_satu, item.gambar_dua, item.gambar_tiga].map((gambar, index) => (
                                    <img
                                        key={index}
                                        src={gambar ? `/storage/${gambar}` : "/batu.png"}
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
                        <form onSubmit={post}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-1 gap-6">
                                        {[
                                            { label: "Name:", value: item.nama_koleksi },
                                            { label: "Type:", value: item.tipe_bmn || "-" },
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

                <div className="mt-10">
                    <h4 className="text-lg font-semibold">Items in Cart:</h4>
                    <ul className="mt-2">
                        {cartItems.length === 0 ? (
                            <li className="text-gray-500">Cart is empty</li>
                        ) : (
                            cartItems.map((cartItem, index) => (
                                <li key={index} className="flex justify-between border-b py-2">
                                    <span>{cartItem.nama_koleksi}</span>
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                <div className="mt-5">
                    <button
                        type="button"
                        onClick={handleCheckout}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Checkout
                    </button>
                    {successMessage && (
                        <div className="mt-2 text-green-600">{successMessage}</div>
                    )}
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
                                <source src={currentAudio} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        )}
                        {currentVideo && (
                            <video controls className="w-full mt-4">
                                <source src={currentVideo} type="video/mp4" />
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
