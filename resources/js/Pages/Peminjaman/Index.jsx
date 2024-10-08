import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Table from "@/Components/Table/Table";
import SearchBar from "@/Components/SearchBar/SearchBar";
import Pagination from "@/Components/Pagination/Pagination";
import { ArrowDownToLine, Plus } from "lucide-react";
import Modal from "@/Components/Modal/Modal"; 
import Create from "./Create"; // Import Create component

function Index() {
    // Static data for the table
    const staticData = [
        { id: 1, users_id: "John Doe", tanggal_pinjam: "2024-10-01", tanggal_jatuh_tempo: "2024-10-10", status: "Sedang dipinjam" },
        { id: 2, users_id: "Jane Smith", tanggal_pinjam: "2024-09-15", tanggal_jatuh_tempo: "2024-09-25", status: "Kembali" },
        { id: 3, users_id: "Alice Johnson", tanggal_pinjam: "2024-10-05", tanggal_jatuh_tempo: "2024-10-15", status: "Sedang dipinjam" },
        { id: 4, users_id: "Bob Brown", tanggal_pinjam: "2024-09-20", tanggal_jatuh_tempo: "2024-09-30", status: "Kembali" },
        { id: 5, users_id: "Charlie Davis", tanggal_pinjam: "2024-10-07", tanggal_jatuh_tempo: "2024-10-14", status: "Sedang dipinjam" },
    ];

    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = (event) => {
        event.preventDefault(); // Prevent default action
        setIsOpen(true);
    };    

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleCreateSubmit = (formData) => {
        // Handle the form submission logic here
        console.log('Form submitted:', formData);
        // After successful submission, you can close the modal
        handleCloseModal();
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            router.delete(route("peminjaman.destroy", id), {
                onSuccess: () => {
                    // Optionally, you can trigger a refresh or update your state here
                },
                onError: (error) => {
                    console.error("Failed to delete the item:", error);
                },
            });
        }
    };

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">Peminjaman</h1>

            <div className="flex items-center justify-between mb-2">
                <SearchBar />
                <div className="flex items-center justify-end mb-2">
                    <Link
                        className="bg-green-600 text-white py-2 px-4 mx-2 rounded hover:bg-green-900 transition flex items-center"
                        onClick={handleOpenModal}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        <span className="hidden md:inline">Tambah</span>
                    </Link>
                    <Link
                        className="bg-blue-600 text-white py-2 px-4 mx-2 rounded hover:bg-blue-900 transition flex items-center"
                        href="#"
                    >
                        <ArrowDownToLine className="w-4 h-4 mr-2" />
                        <span className="hidden md:inline">Excel</span>
                    </Link>
                    <Link
                        className="bg-blue-600 text-white py-2 px-4 mx-2 rounded hover:bg-blue-900 transition flex items-center"
                        href="#"
                    >
                        <ArrowDownToLine className="w-4 h-4 mr-2" />
                        <span className="hidden md:inline">PDF</span>
                    </Link>
                </div>
            </div>

            {/* Modal for creating new entry */}
            <Modal isOpen={isOpen} onClose={handleCloseModal} title="Tambah Peminjaman">
                <Create onSubmit={handleCreateSubmit} /> {/* Pass the submit handler */}
            </Modal>

            <Table
                columns={[
                    { label: "Nama Peminjam", name: "users_id" },
                    { label: "Tanggal Pinjam", name: "tanggal_pinjam" },
                    { label: "Tanggal Jatuh Tempo", name: "tanggal_jatuh_tempo" },
                    {
                        label: "Status",
                        name: "status",
                        renderCell: (row) => (
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleDelete(row.id)}
                                    className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-900 transition"
                                >
                                    {row.status}
                                </button>
                            </div>
                        ),
                    },
                    {
                        label: "Aksi",
                        name: "aksi",
                        renderCell: (row) => (
                            <div className="flex space-x-2">
                                <Link
                                    href={route("peminjaman.edit", row.id)}
                                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-700 transition"
                                >
                                    Edit
                                </Link>
                            </div>
                        ),
                    },
                ]}
                rows={staticData} // Use static data as rows
            />

            {/* Pagination component (optional) */}
            {/* {links.length > 0 && <Pagination links={links} />} */}
        </div>
    );
}

Index.layout = (page) => <MainLayout title="Kelola Koleksi">{page}</MainLayout>;

export default Index;
