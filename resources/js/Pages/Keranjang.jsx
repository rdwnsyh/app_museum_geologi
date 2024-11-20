import { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react"; // Menggunakan useForm untuk permintaan POST
import Navbar from "@/Components/Navbar/Navbar";

const Keranjang = ({ cartItems = [] }) => {
    const [items, setItems] = useState(
        Array.isArray(cartItems)
            ? cartItems.map((item) => ({ ...item, checked: false }))
            : []
    );
    const [searchQuery, setSearchQuery] = useState("");

    const { setData, post, processing } = useForm();

    useEffect(() => {
        // Pastikan data dikirim hanya jika ada perubahan pada cartItems
        if (items.length > 0) {
            const cartItemsData = items
                .filter((item) => item.checked)
                .map((item) => ({
                    koleksi_id: item.id,
                    jumlah_dipinjam: item.jumlah_dipinjam,
                }));
            setData("cartItems", cartItemsData);
        }
    }, [items]); // Re-run setiap ada perubahan pada items

    // Fungsi untuk toggle checkbox item
    const handleCheck = (id) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    };

    // Fungsi untuk mengubah jumlah pinjaman
    const handleQuantityChange = (id, value) => {
        const jumlah = parseInt(value, 10) || 1;
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, jumlah_dipinjam: jumlah } : item
            )
        );
    };

    // Fungsi untuk toggle semua checkbox
    const toggleSelectAll = () => {
        const allChecked = items.every((item) => item.checked);
        setItems((prevItems) =>
            prevItems.map((item) => ({ ...item, checked: !allChecked }))
        );
    };

    // Fungsi untuk proses peminjaman
    const handleBorrow = () => {
        const checkedItems = items.filter((item) => item.checked);

        if (checkedItems.length === 0) {
            alert("Pilih setidaknya satu item untuk dipinjam.");
            return;
        }

        // Mengirim data ke backend
        post(route("keranjang.pinjam"), {
            onSuccess: () => alert("Peminjaman berhasil!"),
            onError: (errors) => console.error(errors),
        });
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <div className="flex-grow container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Keranjang</h2>
                <div className="bg-white shadow rounded-md p-4">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left">
                                        <input
                                            type="checkbox"
                                            onChange={toggleSelectAll}
                                            checked={items.every(
                                                (item) => item.checked
                                            )}
                                            aria-label="Pilih semua item"
                                        />
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Gambar
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Koleksi
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Jumlah
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {items.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-4 py-2 text-left">
                                            <input
                                                type="checkbox"
                                                checked={item.checked}
                                                onChange={() =>
                                                    handleCheck(item.id)
                                                }
                                                aria-label={`Pilih ${item.nama_koleksi}`}
                                            />
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-200">
                                            <img
                                                src={item.gambar_satu}
                                                alt={item.nama_koleksi}
                                                className="w-20 h-20 object-cover"
                                            />
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-200">
                                            {item.nama_koleksi}
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-200">
                                            <input
                                                type="number"
                                                value={
                                                    item.jumlah_dipinjam || 1
                                                }
                                                onChange={(e) =>
                                                    handleQuantityChange(
                                                        item.id,
                                                        e.target.value
                                                    )
                                                }
                                                min="1"
                                                max="100"
                                                className="w-12 text-center border rounded-md"
                                            />
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-200">
                                            <button
                                                onClick={() =>
                                                    setItems((prevItems) =>
                                                        prevItems.filter(
                                                            (i) =>
                                                                i.id !== item.id
                                                        )
                                                    )
                                                }
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button
                            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                            onClick={handleBorrow}
                            disabled={processing} // Disable button while processing
                        >
                            {processing ? "Memproses..." : "Pinjam"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Keranjang;
