import { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar";
import Modal from "@/Components/Modal/Modal";
import Tambah from "./Tambah";

const Keranjang = ({ cartItems = [] }) => {
    const [items, setItems] = useState(
        Array.isArray(cartItems) ? cartItems : []
    );

    useEffect(() => {
        setItems(Array.isArray(cartItems) ? cartItems : []);
    }, [cartItems]);

    // Toggle the "checked" state of an item
    const handleCheck = (id) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    };

    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = (event) => {
        event.preventDefault();
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleCreateSubmit = (formData) => {
        console.log("Form submitted:", formData);
        handleCloseModal();
    };

    const [searchQuery, setSearchQuery] = useState("");

    // Handle deleting an item from the cart
    const handleDelete = (id) => {
        if (
            confirm(
                "Apakah Anda yakin ingin menghapus item ini dari keranjang?"
            )
        ) {
            Inertia.delete(route("keranjang.remove", id), {
                onSuccess: (response) => {
                    alert("Item berhasil dihapus dari keranjang.");
                    setItems((prevItems) =>
                        prevItems.filter((item) => item.id !== id)
                    );
                },
                onError: (errors) => {
                    console.error(errors);
                    alert("Gagal menghapus item dari keranjang.");
                },
            });
        }
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

    const checkedItems = items.filter((item) => item.checked);

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
                                                src={item.image_satu}
                                                alt={item.nama_koleksi}
                                                className="w-16 h-16 object-cover"
                                            />
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-200">
                                            {item.nama_koleksi}
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-200">
                                            <input
                                                type="number"
                                                value={item.jumlah_dipinjam}
                                                min="1"
                                                onChange={(e) =>
                                                    handleQuantityChange(
                                                        item.id,
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                                className="w-16 border border-gray-300 rounded"
                                            />
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-200">
                                            <button
                                                onClick={() =>
                                                    handleDelete(item.id)
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

                    <div className="bg-white shadow rounded-md p-4 mt-4">
                        <div className="mt-4 flex justify-between items-center">
                            <h3 className="text-lg font-semibold">
                                Subtotal: {checkedItems.length} item terpilih
                            </h3>
                            <Link
                                onClick={handleOpenModal}
                                className="bg-yellow-500 text-black py-2 px-4 rounded-md ml-2"
                            >
                                Pinjam Sekarang
                            </Link>
                        </div>
                    </div>

                    <Modal
                        isOpen={isOpen}
                        onClose={handleCloseModal}
                        title="Tambah Peminjaman"
                        logoSrc={null}
                    >
                        <Tambah onSubmit={handleCreateSubmit} />
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Keranjang;
