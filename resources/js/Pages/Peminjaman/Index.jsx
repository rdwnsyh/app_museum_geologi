import React, { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Table from "@/Components/Table/Table";
import SearchBar from "@/Components/SearchBar/SearchBar";
import Pagination from "@/Components/Pagination/Pagination";
import { ArrowDownToLine, Plus } from "lucide-react";
import NotificationModal from "@/Components/Modal/notif"; // Import Notification Modal

function Index() {
    // Retrieve dynamic data from Inertia.js page props
    const { peminjaman} = usePage().props;
    const data = peminjaman?.data || [];
    const links = peminjaman?.meta?.links || [];

    const [isNotificationOpen, setIsNotificationOpen] = useState(false); // State for notification modal
    const [notificationMessage, setNotificationMessage] = useState(""); // Store notification message

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            router.delete(route("peminjaman.destroy", id), {
                onSuccess: () => {
                    setNotificationMessage("Peminjaman deleted successfully!");
                    setIsNotificationOpen(true);
                },
                onError: (error) => {
                    setNotificationMessage("Failed to delete the item.");
                    setIsNotificationOpen(true);
                },
            });
        }
    };

    const handleCreateSubmit = (formData) => {
        // Send form data to the server using Inertia
        Inertia.post(route("peminjaman.store"), formData, {
            onSuccess: () => {
                setNotificationMessage("Peminjaman successfully created!");
                setIsNotificationOpen(true);
            },
            onError: (error) => {
                setNotificationMessage("Failed to create Peminjaman.");
                setIsNotificationOpen(true);
            }
        });
    };

    const closeNotificationModal = () => {
        setIsNotificationOpen(false); // Close the notification modal
    };

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">Peminjaman</h1>

            <div className="flex items-center justify-between mb-2">
                <SearchBar />
                <div className="flex items-center justify-end mb-2">
                    {/* Link to navigate to Create page */}
                    <Link
                        className="bg-green-600 text-white py-2 px-4 mx-2 rounded hover:bg-green-900 transition flex items-center"
                        href={route("peminjaman.create")} // Navigasi langsung ke halaman create
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

            {/* Table for displaying dynamic peminjaman data */}
            <Table
                columns={[
                    { label: "Nama Peminjam", name: "users_id", renderCell: (row) => row.user?.name },
                    { label: "Tanggal Pinjam", name: "tanggal_pinjam" },
                    { label: "Tanggal Jatuh Tempo", name: "tanggal_jatuh_tempo" },
                    {
                        label: "Status",
                        name: "status",
                        renderCell: (row) => (
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleCreateSubmit(row.id)}
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
                rows={data}
            />

            

            {/* Pagination component */}
            {links.length > 0 && <Pagination links={links} />}

            {/* Notification Modal */}
            <NotificationModal
                isOpen={isNotificationOpen}
                onClose={closeNotificationModal}
                message={notificationMessage}
            />
        </div>
    );
}

Index.layout = (page) => <MainLayout title="Kelola Peminjaman">{page}</MainLayout>;

export default Index;
