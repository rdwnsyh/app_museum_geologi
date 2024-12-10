import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Table from "@/Components/Table/Table";
import SearchBar from "@/Components/SearchBar/SearchBar";
import Pagination from "@/Components/Pagination/Pagination";
import ExportButtons from "@/Components/ExportButtons/ExportButtons";
import { ArrowDownToLine, Plus } from "lucide-react";

function Index() {
    const { kelolakoleksi, filters } = usePage().props;

    const data = kelolakoleksi?.data || [];
    const links = kelolakoleksi?.links || [];

    // Fungsi pencarian
    const handleSearch = (query) => {
        router.get(
            route("kelolakoleksi"),
            { search: query },
            { preserveState: true, replace: true }
        );
    };

    // Fungsi hapus data
    const handleDelete = (id) => {
        if (window.confirm("Yakin ingin menghapus data ini?")) {
            router.delete(route("kelolakoleksi.destroy", id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">Kelola Koleksi</h1>

            <div className="flex items-center justify-between mb-4">
                <SearchBar
                    onSearch={handleSearch}
                    initialQuery={filters?.search || ""}
                />
                <div className="flex items-center space-x-2">
                    <Link
                        href={route("kelolakoleksi.create")}
                        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition flex items-center"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah
                    </Link>
                    <div className="flex items-center justify-between mb-4">
                        <ExportButtons />
                    </div>
                </div>
            </div>

            {data.length > 0 ? (
                <Table
                    columns={[
                        { label: "ID Koleksi", name: "id" },
                        { label: "Nama Koleksi", name: "nama_koleksi" },
                        { label: "Tipe BMN", name: "tipe_bmn" },
                        { label: "Alamat Penemuan", name: "alamat" },
                        {
                            label: "Aksi",
                            name: "aksi",
                            renderCell: (row) => (
                                <div className="flex space-x-2">
                                    <Link
                                        href={route(
                                            "kelolakoleksi.edit",
                                            row.id
                                        )}
                                        className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(row.id)}
                                        className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            ),
                        },
                    ]}
                    rows={data}
                />
            ) : (
                <p className="text-gray-500 text-center mt-4">
                    Tidak ada data yang ditemukan.
                </p>
            )}

            {links.length > 0 && <Pagination links={links} />}
        </div>
    );
}

Index.layout = (page) => <MainLayout title="Kelola Koleksi">{page}</MainLayout>;

export default Index;
