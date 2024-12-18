import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Table from "@/Components/Table/Table";
import SearchBar from "@/Components/SearchBar/SearchBar";
import { ArrowDownToLine, Plus, Edit } from "lucide-react";

function Index() {
    const { pengembalian, filters } = usePage().props;

    const data = pengembalian?.data || [];
    const links = pengembalian?.meta?.links || [];

    const handleDelete = (id) => {
        if (window.confirm("Yakin ingin menghapus data ini?")) {
            router.delete(route("pengembalian.destroy", id), {
                preserveScroll: true,
            });
        }
    };

    const handleSearch = (query) => {
        router.get(
            route("pengembalian"),
            { search: query },
            { preserveState: true, replace: true }
        );
    };

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">Pengembalian</h1>

            <div className="flex items-center justify-between mb-6">
                <SearchBar
                    onSearch={handleSearch}
                    initialQuery={filters?.search || ""}
                />
                <div className="flex items-center justify-end mb-2">
                    <Link
                        className="bg-green-600 text-white py-2 px-2 mx-2 rounded hover:bg-green-900 transition flex items-center"
                        href={route("pengembalian.create")}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        <span className="hidden md:inline">Tambah</span>
                    </Link>
                    <Link
                        className="bg-blue-600 text-white py-2 px-4 mx-2 rounded hover:bg-blue-900 transition flex items-center"
                        // href={route("pengembalian.exportExcel")} // Route ekspor Excel
                    >
                        <ArrowDownToLine className="w-4 h-4 mr-2" />
                        <span className="hidden md:inline">Excel</span>
                    </Link>
                    <Link
                        className="bg-blue-600 text-white py-2 px-4 mx-2 rounded hover:bg-blue-900 transition flex items-center"
                        // href={route("pengembalian.exportPdf")} // Route ekspor PDF
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
                        name: "peminjaman.users.nama_lengkap",
                        renderCell: (row) =>
                            row.peminjaman?.users?.nama_lengkap || "N/A",
                    },
                    { label: "Tanggal Kembali", name: "tanggal_kembali" },
                    {
                        label: "Status Pengembalian",
                        name: "status_pengembalian",
                        renderCell: (row) => (
                            <span
                                className={`py-1 px-3 rounded ${
                                    row.status_pengembalian === "Dikembalikan"
                                        ? "bg-green-500 text-white"
                                        : row.status_pengembalian ===
                                          "Terlambat"
                                        ? "bg-yellow-500 text-white"
                                        : "bg-red-500 text-white"
                                }`}
                            >
                                {row.status_pengembalian || "N/A"}
                            </span>
                        ),
                    },
                    { label: "Keterangan", name: "keterangan" },
                    {
                        label: "Aksi",
                        name: "aksi",
                        renderCell: (row) => (
                            <div className="flex space-x-2">
                                <Link
                                    href={route("pengembalian.edit", row.id)}
                                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition flex items-center"
                                >
                                    <Edit className="w-4 h-4 mr-1" />
                                    Edit
                                </Link>
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

            {/* Pagination */}
            {links.length > 0 && (
                <div className="mt-4">
                    <Pagination links={links} />
                </div>
            )}
        </div>
    );
}

Index.layout = (page) => (
    <MainLayout title="Kelola Pengembalian">{page}</MainLayout>
);

export default Index;
