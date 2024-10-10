import React from "react";
import { Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Table from "@/Components/Table/Table";
import SearchBar from "@/Components/SearchBar/SearchBar";
import { ArrowDownToLine, Plus } from "lucide-react";

function Index() {
    // Static data for the table
    const staticData = [
        { id: 1, users_id: "John Doe", tanggal_pinjam: "2024-10-01", tanggal_jatuh_tempo: "2024-10-15", status: "Sedang dipinjam" },
        { id: 2, users_id: "Jane Smith", tanggal_pinjam: "2024-09-20", tanggal_jatuh_tempo: "2024-10-05", status: "Sedang dipinjam" },
        { id: 3, users_id: "Alice Johnson", tanggal_pinjam: "2024-09-25", tanggal_jatuh_tempo: "2024-10-10", status: "Sedang dipinjam" },
        { id: 4, users_id: "Bob Brown", tanggal_pinjam: "2024-09-30", tanggal_jatuh_tempo: "2024-10-14", status: "Sedang dipinjam" },
        { id: 5, users_id: "Charlie Davis", tanggal_pinjam: "2024-09-15", tanggal_jatuh_tempo: "2024-09-30", status: "Sedang dipinjam" },
    ];

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">Inbound</h1>

            <div className="flex items-center justify-between mb-6">
                <SearchBar />
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
                    { label: "Nama Peminjam", name: "users_id" },
                    { label: "Tanggal Pinjam", name: "tanggal_pinjam" },
                    { label: "Tanggal Jatuh Tempo", name: "tanggal_jatuh_tempo" },
                    {
                        label: "Status",
                        name: "status",
                        renderCell: (row) => (
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleDelete(row.id)} // Implement handleDelete if needed
                                    className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-900 transition"
                                >
                                    {row.status}
                                </button>
                            </div>
                        ),
                    },
                ]}
                rows={staticData} // Use static data as rows
            />
            {/* <Pagination links={links} /> */}
        </div>
    );
}

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
Index.layout = (page) => <MainLayout title="Kelola Koleksi">{page}</MainLayout>;

export default Index;
