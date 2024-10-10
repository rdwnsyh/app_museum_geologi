import React from "react";
import { Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Table from "@/Components/Table/Table";
import SearchBar from "@/Components/SearchBar/SearchBar";
import { ArrowDownToLine, Plus } from "lucide-react";

const Index = () => {
    // Static data for the table
    const staticData = [
        { id: 1, name: "Alice Johnson", status: "Approved" },
        { id: 2, name: "Bob Smith", status: "Pending" },
        { id: 3, name: "Charlie Brown", status: "Rejected" },
        { id: 4, name: "Diana Prince", status: "Approved" },
        { id: 5, name: "Ethan Hunt", status: "Pending" },
    ];

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">Persetujuan</h1>
            <div className="flex items-center justify-between mb-6">
                <SearchBar />
                <div className="flex items-center justify-end mb-2">
                    <Link
                        className="bg-green-600 text-white py-2 px-2 mx-2 rounded hover:bg-green-900 transition flex items-center"
                        href={route("manajemenadmin.create")}
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
                        label: "Name",
                        name: "name",
                        renderCell: (row) => (
                            <>
                                {row.name}
                            </>
                        ),
                    },
                    {
                        label: "Aksi",
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
};

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
Index.layout = (page) => <MainLayout title="Persetujuan">{page}</MainLayout>;

export default Index;
