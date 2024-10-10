import React from "react";
import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar";

const Keranjang = ({ items = [] }) => { // Berikan nilai default sebagai array kosong
    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <Head title="Keranjang" />
            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold mb-6">Keranjang</h2>
                {items.length === 0 ? (
                    <p className="text-lg">Keranjang Anda kosong.</p>
                ) : (
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="p-4 bg-white rounded-md shadow-md">
                                <h3 className="text-lg font-semibold">{item.nama_koleksi}</h3>
                                <p>Type: {item.type || "-"}</p>
                                <p>Dimensi: {item.dimensions || "-"}</p>
                                <p>Lokasi Temuan: {item.ditemukan || "-"}</p>
                                <p>Deskripsi: {item.deskripsi_koleksi || "-"}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Keranjang;
