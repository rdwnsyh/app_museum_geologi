import { useState } from "react";
import { useForm } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar";

const Pinjam = ({ checkoutItems = [] }) => {
    // Initialize form data using useForm from Inertia
    const { data, setData, post, errors, processing } = useForm({
        items: checkoutItems, // Use the items passed from the backend
        tanggal_pinjam: "",
        tanggal_jatuh_tempo: "",
    });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("peminjaman.checkout"), {
            onSuccess: () => {
                alert("Peminjaman berhasil dibuat!");
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="container mx-auto p-4 flex-grow">
                <h2 className="text-2xl font-bold mb-4">Form Peminjaman</h2>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow p-4 rounded-md"
                >
                    <div className="grid gap-4">
                        <div>
                            <label className="block font-semibold">
                                Tanggal Pinjam
                            </label>
                            <input
                                type="date"
                                name="tanggal_pinjam"
                                value={data.tanggal_pinjam}
                                onChange={(e) =>
                                    setData("tanggal_pinjam", e.target.value)
                                }
                                className="w-full border-gray-300 rounded"
                            />
                            {errors.tanggal_pinjam && (
                                <div className="text-red-600">
                                    {errors.tanggal_pinjam}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block font-semibold">
                                Tanggal Jatuh Tempo
                            </label>
                            <input
                                type="date"
                                name="tanggal_jatuh_tempo"
                                value={data.tanggal_jatuh_tempo}
                                onChange={(e) =>
                                    setData(
                                        "tanggal_jatuh_tempo",
                                        e.target.value
                                    )
                                }
                                className="w-full border-gray-300 rounded"
                            />
                            {errors.tanggal_jatuh_tempo && (
                                <div className="text-red-600">
                                    {errors.tanggal_jatuh_tempo}
                                </div>
                            )}
                        </div>

                        <div>
                            <h3 className="font-semibold">
                                Items yang Dipilih
                            </h3>
                            <ul className="space-y-2">
                                {data.items.map((item) => (
                                    <li
                                        key={item.id}
                                        className="flex justify-between items-center border-b py-2"
                                    >
                                        <div className="flex items-center">
                                            <img
                                                src={item.image_satu}
                                                alt={item.nama_koleksi}
                                                className="w-16 h-16 object-cover rounded mr-4"
                                            />
                                            <span>{item.nama_koleksi}</span>
                                        </div>
                                        <span>{item.jumlah_dipinjam}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded-md mt-4"
                            disabled={processing}
                        >
                            {processing ? "Loading..." : "Pinjam"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Pinjam;
