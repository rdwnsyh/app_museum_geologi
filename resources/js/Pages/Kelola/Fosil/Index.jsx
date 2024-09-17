import React from "react";
import { Link, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Table from "@/Components/Table/Table";
import SearchBar from "@/Components/SearchBar/SearchBar";
import Pagination from "@/Components/Pagination/Pagination";
import { ArrowDownToLine } from "lucide-react";

// Define the handleDelete function if you plan to use it
const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
        // Implement deletion logic here
        console.log(`Delete item with id: ${id}`);
    }
};

function Index() {
    const { fosil } = usePage().props;

    // Ensure that fosil and meta are available before accessing them
    const data = fosil?.data || [];
    const links = fosil?.meta?.links || [];

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">Kelola Koleksi Fosil</h1>

            <div className="flex items-center justify-between mb-4">
                <SearchBar /> {/* Add SearchBar here */}
                <div className="flex items-center space-x-2">
                    <Link
                        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-900 transition flex items-center"
                        href={route("kelolakoleksibatuan.create")}
                    >
                        <span className="hidden md:inline">+ Tambah</span>
                    </Link>
                    <Link
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-900 transition flex items-center"
                        href={route("kelolakoleksibatuan.export", { format: 'excel' })}
                    >
                        <ArrowDownToLine className="w-4 h-4 mr-2" />
                        <span className="hidden md:inline">Excel</span>
                    </Link>
                    <Link
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-900 transition flex items-center"
                        href={route("kelolakoleksibatuan.export", { format: 'pdf' })}
                    >
                        <ArrowDownToLine className="w-4 h-4 mr-2" />
                        <span className="hidden md:inline">PDF</span>
                    </Link>
                </div>
            </div>

            {/* Table to display collection data */}
            <Table
                columns={[
                    { label: "Nomor Koleksi", name: "id" },
                    { label: "Nama Koleksi", name: "nama_koleksi" },
                    { label: "Tipe Koleksi", name: "tipe_bmn" },
                    { label: "Alamat Storage", name: "alamat" },
                    {
                        label: "Aksi",
                        name: "aksi",
                        renderCell: (row) => (
                            <div className="flex space-x-2">
                                {/* Button for detailed info */}
                                <button
                                    onClick={() => handleDelete(row.id)}
                                    className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-800 transition"
                                >
                                    Info Lengkap
                                </button>
                                
                                {/* Button for editing */}
                                <Link
                                    href={route("kelolakoleksibatuan.edit", row.id)}
                                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition"
                                >
                                    Edit
                                </Link>
                            </div>
                        ),
                    },
                ]}
                rows={data}
                getRowDetailsUrl={(row) =>
                    route("kelolakoleksibatuan.edit", row.id)
                }
            />

            {/* Pagination Links */}
            {links.length > 0 && <Pagination links={links} />}
        </div>
    );
}

/**
 * Persistent Layout (Inertia.js)
 */
Index.layout = (page) => <MainLayout title="Kelola Koleksi">{page}</MainLayout>;

export default Index;
