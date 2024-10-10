import React from "react";
import { Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Table from "@/Components/Table/Table";
import SearchBar from "@/Components/SearchBar/SearchBar";
import { ArrowDownToLine } from "lucide-react";

const Index = () => {
    // Static data for the table
    const staticData = [
        { id: 1, peminjaman_id: "John Doe", tanggal_kembali: "2024-10-01", status_pengembalian: "Kembali", keterangan: "Sukses" },
        { id: 2, peminjaman_id: "Jane Smith", tanggal_kembali: "2024-09-15", status_pengembalian: "Terlambat", keterangan: "Denda dikenakan" },
        { id: 3, peminjaman_id: "Alice Johnson", tanggal_kembali: "2024-10-05", status_pengembalian: "Kembali", keterangan: "Sukses" },
        { id: 4, peminjaman_id: "Bob Brown", tanggal_kembali: "2024-09-20", status_pengembalian: "Kembali", keterangan: "Sukses" },
        { id: 5, peminjaman_id: "Charlie Davis", tanggal_kembali: "2024-10-07", status_pengembalian: "Terlambat", keterangan: "Denda dikenakan" },
    ];

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">Pengembalian</h1>
            <div className="flex items-center justify-between mb-6">
                <SearchBar />
                <div className="flex items-center justify-end mb-2">
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
                    { label: "Nama Peminjam", name: "peminjaman_id" },
                    { label: "Tanggal Kembali", name: "tanggal_kembali" },
                    { label: "Status Pengembalian", name: "status_pengembalian" },
                    { label: "Keterangan", name: "keterangan" },
                    {
                        label: "Aksi",
                        name: "status",
                        renderCell: (row) => (
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleDelete(row.id)} // Implement handleDelete function as needed
                                    className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-900 transition"
                                >
                                    Hapus
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
};

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
Index.layout = (page) => <MainLayout title="Pengembalian">{page}</MainLayout>;

export default Index;
