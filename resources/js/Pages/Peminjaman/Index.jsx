import React, { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Table from "@/Components/Table/Table";
import SearchBar from "@/Components/SearchBar/SearchBar";
import Pagination from "@/Components/Pagination/Pagination";
import { ArrowDownToLine } from "lucide-react";
import NotificationModal from "@/Components/Modal/notif";

function Index() {
    // Retrieve dynamic data from Inertia.js page props
    const { peminjaman } = usePage().props;
    const data = peminjaman || []; // Fallback to an empty array if `peminjaman` is undefined

    // State for notification modal
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            router.delete(route("peminjaman.destroy", id), {
                onSuccess: () => {
                    setNotificationMessage("Peminjaman deleted successfully!");
                    setIsNotificationOpen(true);
                },
                onError: () => {
                    setNotificationMessage("Failed to delete the item.");
                    setIsNotificationOpen(true);
                },
            });
        }
    };

    const closeNotificationModal = () => {
        setIsNotificationOpen(false);
    };

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">Peminjaman</h1>

            <div className="flex items-center justify-between mb-2">
                <SearchBar />
                <div className="flex items-center">
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

            {/* Table for displaying dynamic peminjaman data */}
            <Table
                columns={[
                    {
                        label: "Nama Peminjam",
                        name: "users.nama_lengkap",
                        renderCell: (row) => row.users?.nama_lengkap || "N/A",
                    },
                    { label: "Tanggal Pinjam", name: "tanggal_pinjam" },
                    {
                        label: "Tanggal Jatuh Tempo",
                        name: "tanggal_jatuh_tempo",
                    },
                    {
                        label: "Status",
                        name: "status",
                        renderCell: (row) => (
                            <span
                                className={`py-1 px-3 rounded ${
                                    row.status === "Pengajuan"
                                        ? "bg-yellow-500 text-white"
                                        : "bg-green-500 text-white"
                                }`}
                            >
                                {row.status}
                            </span>
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
                                <button
                                    onClick={() => handleDelete(row.id)}
                                    className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-900 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        ),
                    },
                ]}
                rows={data}
            />

            {/* Notification Modal */}
            <NotificationModal
                isOpen={isNotificationOpen}
                onClose={closeNotificationModal}
                message={notificationMessage}
            />
        </div>
    );
}

Index.layout = (page) => (
    <MainLayout title="Kelola Peminjaman">{page}</MainLayout>
);

export default Index;
