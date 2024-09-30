import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Table from "@/Components/Table/Table";
import SearchBar from "@/Components/SearchBar/SearchBar";
import Pagination from "@/Components/Pagination/Pagination";
import { ArrowDownToLine, Plus } from "lucide-react";

function Index() {
    const { kelolakoleksi } = usePage().props;

    const data = kelolakoleksi?.data || [];
    const links = kelolakoleksi?.meta?.links || [];

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            router.delete(route("kelolakoleksi.destroy", id), {
                onSuccess: () => {
                    // console.log(`Item with id: ${id} deleted`);
                },
                onError: (error) => {
                    // console.error("Failed to delete the item:", error);
                },
            });
        }
    };

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">Kelola Koleksi</h1>

            <div className="flex items-center justify-between mb-2">
                <SearchBar />
                <div className="flex items-center justify-end mb-2">
                    <Link
                        className="bg-green-600 text-white py-2 px-2 mx-2 rounded hover:bg-green-900 transition flex items-center"
                        href={route("kelolakoleksi.create")}
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
                    { label: "Koleksi Batuan", name: "id" },
                    { label: "Nama Koleksi", name: "nama_koleksi" },
                    { label: "Tipe Koleksi", name: "tipe_bmn" },
                    { label: "Alamat Storage", name: "alamat" },
                    {
                        label: "Aksi",
                        name: "aksi",
                        renderCell: (row) => (
                            <div className="flex space-x-2">
                                <Link
                                    href={route("kelolakoleksi.edit", row.id)} // Mengarahkan ke halaman edit dengan ID
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

            {links.length > 0 && <Pagination links={links} />}
        </div>
    );
}

Index.layout = (page) => <MainLayout title="Kelola Koleksi">{page}</MainLayout>;

export default Index;
