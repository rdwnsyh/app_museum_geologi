import React, { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Table from "@/Components/Table/Table";
import SearchBar from "@/Components/SearchBar/SearchBar";
import Pagination from "@/Components/Pagination/Pagination";
import { ArrowDownToLine, Plus } from "lucide-react";
import NotificationModal from "@/Components/Modal/notif";
import Modal from "@/Components/Modal/Modal";

function Index() {
    const { peminjaman } = usePage().props;
    const data = peminjaman?.data || []; // Pastikan data selalu array
    const paginationLinks = peminjaman?.meta?.links || [];

    const handleSearch = (query) => {
        router.get(
            route("peminjaman"),
            { search: query },
            { preserveState: true, replace: true }
        );
    };

    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [pesan, setMessage] = useState("");

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

    const openModal = (data) => {
        setModalData(data);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setMessage("");
    };

    const notificationColor = notificationMessage.includes("successfully")
        ? "bg-green-500"
        : "bg-red-600";

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">Peminjaman</h1>

            <div className="flex items-center justify-between mb-4">
                <SearchBar
                    onSearch={handleSearch}
                    // initialQuery={filters?.search || ""}
                />
                <div className="flex items-center">
                    <Link
                        className="bg-green-600 text-white py-2 px-2 mx-2 rounded hover:bg-green-900 transition flex items-center"
                        href={route("peminjaman.create")}
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
                        renderCell: (row) => {
                            let bgColor = "";
                            switch (row.status) {
                                case "Pengajuan":
                                    bgColor = "bg-yellow-500";
                                    break;
                                case "Disetujui":
                                    bgColor = "bg-green-500";
                                    break;
                                case "Direvisi":
                                    bgColor = "bg-orange-500";
                                    break;
                                case "Ditolak":
                                    bgColor = "bg-red-600";
                                    break;
                                default:
                                    bgColor = "bg-gray-400";
                            }

                            return (
                                <span
                                    className={`py-1 px-3 rounded ${bgColor} text-white`}
                                >
                                    {row.status}
                                </span>
                            );
                        },
                    },
                    {
                        label: "Aksi",
                        name: "aksi",
                        renderCell: (row) => (
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => openModal(row)}
                                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-700 transition"
                                >
                                    Validasi
                                </button>
                                <button
                                    onClick={() => handleDelete(row.id)}
                                    className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-900 transition"
                                >
                                    Hapus
                                </button>
                            </div>
                        ),
                    },
                ]}
                rows={data}
            />

            <Pagination links={paginationLinks} />

            {/* Notification Modal */}
            <NotificationModal
                isOpen={isNotificationOpen}
                onClose={closeNotificationModal}
                message={notificationMessage}
                color={notificationColor}
            />

            {/* Triggered Modal */}
            {modalData && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    title="Detail Peminjaman"
                    className="max-w-lg mx-auto p-4"
                >
                    <div className="space-y-4">
                        {/* Nama Peminjam */}
                        <div>
                            <strong>Nama Peminjam:</strong>{" "}
                            {modalData.users?.nama_lengkap || "N/A"}
                        </div>
                        {/* Tanggal Pinjam */}
                        <div>
                            <strong>Tanggal Pinjam:</strong>{" "}
                            {modalData.tanggal_pinjam}
                        </div>

                        {/* Tanggal Jatuh Tempo */}
                        <div>
                            <strong>Tanggal Jatuh Tempo:</strong>{" "}
                            {modalData.tanggal_jatuh_tempo}
                        </div>

                        {/* Status */}
                        <div>
                            <strong>Status:</strong> {modalData.status}
                        </div>

                        {/* Status Selector */}
                        <div>
                            <label className="block">
                                <span>Status:</span>
                                <select
                                    value={modalData.status}
                                    onChange={(e) =>
                                        setModalData((prevData) => ({
                                            ...prevData,
                                            status: e.target.value,
                                        }))
                                    }
                                    className="border rounded w-full p-2 mt-2"
                                >
                                    <option value="Pengajuan">Pengajuan</option>
                                    <option value="Disetujui">Disetujui</option>
                                    <option value="Direvisi">Direvisi</option>
                                    <option value="Ditolak">Ditolak</option>
                                </select>
                            </label>
                        </div>

                        {/* Pesan Input */}
                        <div>
                            <label className="block">
                                <span>Pesan:</span>
                                <textarea
                                    value={pesan}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="border rounded w-full p-2 mt-2"
                                    rows="4"
                                />
                            </label>
                        </div>

                        {/* Tabel Koleksi */}
                        <div className="overflow-x-auto mt-4">
                            <table className="min-w-full table-auto border-collapse">
                                <thead>
                                    <tr>
                                        <th className="border px-2 py-1 text-left">
                                            Gambar
                                        </th>
                                        <th className="border px-2 py-1 text-left">
                                            Nama Koleksi
                                        </th>
                                        <th className="border px-2 py-1 text-left">
                                            Jumlah
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(modalData.koleksi) &&
                                    modalData.koleksi.length > 0 ? (
                                        modalData.koleksi.map((item, index) => (
                                            <tr key={item.id}>
                                                <td className="border px-2 py-1">
                                                    {item.gambar_koleksi ? (
                                                        <img
                                                            src={
                                                                item.gambar_koleksi
                                                            }
                                                            alt={
                                                                item.nama_koleksi
                                                            }
                                                            className="w-16 h-16 object-cover"
                                                        />
                                                    ) : (
                                                        <span>
                                                            Tanpa Gambar
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="border px-2 py-1">
                                                    {item.nama_koleksi}
                                                </td>
                                                <td className="border px-2 py-1">
                                                    {item.jumlah_dipinjam}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="3"
                                                className="text-center py-2"
                                            >
                                                No data available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                const updatedData = {
                                    ...modalData,
                                    pesan: pesan.trim() === "" ? null : pesan,
                                };

                                router.put(
                                    route("peminjaman.update", modalData.id),
                                    updatedData,
                                    {
                                        onSuccess: () => {
                                            setNotificationMessage(
                                                "Data berhasil diperbarui!"
                                            );
                                            setIsNotificationOpen(true);
                                            closeModal();
                                        },
                                        onError: () => {
                                            setNotificationMessage(
                                                "Gagal memperbarui data."
                                            );
                                            setIsNotificationOpen(true);
                                        },
                                    }
                                );
                            }}
                            className="w-full bg-green-600 text-white p-2 rounded mt-4 hover:bg-green-700"
                        >
                            Perbarui
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

Index.layout = (page) => (
    <MainLayout title="Kelola Peminjaman">{page}</MainLayout>
);

export default Index;
