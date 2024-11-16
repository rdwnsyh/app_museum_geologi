import { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react"; // Using useForm for POST requests
import Navbar from "@/Components/Navbar/Navbar";

const Keranjang = ({ cartItems = [] }) => {
    const [items, setItems] = useState(
        Array.isArray(cartItems)
            ? cartItems.map((item) => ({ ...item, checked: false }))
            : []
    );

    useEffect(() => {
        setItems(
            Array.isArray(cartItems)
                ? cartItems.map((item) => ({ ...item, checked: false }))
                : []
        );
    }, [cartItems]);

    const [searchQuery, setSearchQuery] = useState("");

    // Handle Toggle checkbox for each item
    const handleCheck = (id) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    };

    // Handle quantity change for an item
    const handleQuantityChange = (id, jumlah_dipinjam) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { ...item, jumlah_dipinjam: jumlah_dipinjam }
                    : item
            )
        );
    };

    // Filter checked items for borrowing
    const checkedItems = items.filter((item) => item.checked);

    // Using useForm for handling POST request
    const { post } = useForm();

    const handleBorrow = () => {
        if (checkedItems.length === 0) {
            alert("Pilih setidaknya satu item untuk dipinjam.");
            return; // Stop if no items are selected
        }

        const borrowData = checkedItems.map((item) => ({
            koleksi_id: item.id,
            jumlah_dipinjam: item.jumlah_dipinjam,
        }));

        // Sending the data to the server using a POST request
        post(route("keranjang.pinjam"), {
            borrowData: borrowData,
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
                                            onChange={() => {
                                                const allChecked =
                                                    checkedItems.length ===
                                                    items.length;
                                                setItems((prevItems) =>
                                                    prevItems.map((item) => ({
                                                        ...item,
                                                        checked: !allChecked,
                                                    }))
                                                );
                                            }}
                                            checked={
                                                checkedItems.length ===
                                                items.length
                                            }
                                            aria-label="Select all items"
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
                                        Actions
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
                                                aria-label={`Select ${item.nama_koleksi}`}
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
                                                value={item.jumlah_dipinjam}
                                                onChange={(e) =>
                                                    handleQuantityChange(
                                                        item.id,
                                                        e.target.value
                                                    )
                                                }
                                                min="1"
                                                max="100"
                                                className="w-12"
                                            />
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-200">
                                            <button
                                                onClick={() => {
                                                    setItems(
                                                        items.filter(
                                                            (i) =>
                                                                i.id !== item.id
                                                        )
                                                    );
                                                }}
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
                        >
                            Pinjam
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Keranjang;
