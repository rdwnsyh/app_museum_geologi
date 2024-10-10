import React from "react";
import { Link, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
// import FilterBar from "@/Components/FilterBar/FilterBar";
// import Pagination from "@/Components/Pagination/Pagination";
import Table from "@/Components/Table/Table";
import SearchBar from "@/Components/SearchBar/SearchBar";
// import { Trash2 } from "lucide-react";
import { ArrowDownToLine, Plus } from "lucide-react";

function Index() {
    // const { organizations } = usePage().props;

    // const {
    //     data,
    //     meta: { links },
    // } = organizations;

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">Inbound</h1>

            <div className="flex items-center justify-between mb-6">
                <SearchBar /> {/* Tambahkan SearchBar di sini */}
                {/* <FilterBar /> */}
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
                                    onClick={() => handleDelete(row.id)}
                                    className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-900 transition"
                                >
                                    Sedang dipinjam
                                </button>
                            </div>
                        ),
                    },
                ]}
                // rows={data}
                // getRowDetailsUrl={(row) => route("organizations.edit", row.id)}
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
