import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Table from "@/Components/Table/Table";
import SearchBar from "@/Components/SearchBar/SearchBar";
import { ArrowDownToLine, Plus, Edit, Trash } from "lucide-react";

function Index() {
    const { outbound, filters } = usePage().props;
    const data = outbound?.data || []; // Ambil data dari props

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            router.delete(route("outbound.destroy", id), {
                onSuccess: () => alert("Data berhasil dihapus."),
                onError: (errors) => console.error("Errors:", errors),
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
            <h1 className="mb-8 text-3xl font-bold">Inbound</h1>

            <div className="flex items-center justify-between mb-6">
                <SearchBar
                    onSearch={handleSearch}
                    initialQuery={filters?.search || ""}
                />
                <div className="flex items-center justify-end mb-2">
                    <Link
                        className="bg-green-600 text-white py-2 px-2 mx-2 rounded hover:bg-green-900 transition flex items-center"
                        href={route("inbound.create")}
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
                    { label: "Nama Pembuat", name: "users.nama_lengkap" },
                    { label: "Tanggal", name: "tanggal" },
                    {
                        label: "Aksi",
                        name: "aksi",
                        renderCell: (row) => (
                            <div className="flex space-x-2">
                                <Link
                                    href={route("outbound.edit", row.id)} // Link ke halaman edit
                                    className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-900 transition flex items-center"
                                >
                                    <Edit className="w-4 h-4 mr-1" />
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(row.id)} // Hapus data
                                    className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-900 transition flex items-center"
                                >
                                    <Trash className="w-4 h-4 mr-1" />
                                    Delete
                                </button>
                            </div>
                        ),
                    },
                ]}
                rows={data} // Gunakan data paginated
            />
        </div>
    );
}

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
Index.layout = (page) => <MainLayout title="Outbound">{page}</MainLayout>;

export default Index;
