import React from "react";
import { Link, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
// import FilterBar from "@/Components/FilterBar/FilterBar";
// import Pagination from "@/Components/Pagination/Pagination";
import Table from "@/Components/Table/Table";
import SearchBar from "@/Components/SearchBar/SearchBar";
// import { Trash2 } from "lucide-react";
import { ArrowDownToLine } from 'lucide-react';

function Index() {
    // const { batuan } = usePage().props;

    // const {
    //     data,
    //     meta: { links },
    // } = batuan;

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">Kelola Koleksi</h1>

            <div className="flex items-center justify-between mb-2 ">
                <SearchBar /> {/* Tambahkan SearchBar di sini */}
                {/* <FilterBar /> */}
                <div className="flex items-center justify-end mb-2">
                <Link
                    className="bg-green-600 text-white py-2 px-4 mx-2 rounded hover:bg-green-900 transition"
                    href={route("kelolakoleksibatuan.create")}
                >
                    
                    <span className="hidden md:inline">+ Tambah</span>
                </Link>
                <Link
                    className="bg-blue-600 text-white py-2 px-4 mx-2 rounded hover:bg-blue-900 transition"
                    href={route("kelolakoleksibatuan.create")}
                    
                >
                    <ArrowDownToLine className="w-4 h-4 mr-2" /> {/* Ikon di sebelah kiri teks */}
                    <span className="hidden md:inline">Excel</span>
                </Link>
                <Link
                    className="bg-blue-600 text-white py-2 px-4 mx-2 rounded hover:bg-blue-900 transition"
                    href={route("kelolakoleksibatuan.create")}
                >
                    
                    <ArrowDownToLine className="w-4 h-4 mr-2" /> {/* Ukuran kecil */}
                    <span className="hidden md:inline">PDF</span>
                </Link>
                </div>
            </div>

            <Table
                columns={[
                    { label: "Nomor Koleksi", name: "nomor_koleksi" },
                    {
                        label: "Nama Koleksi",
                        name: "nama_koleksi",
                        renderCell: (row) => (
                            <>
                                {/* {row.nama_koleksi}
                                {row.deleted_at && (
                                    <Trash2
                                        size={16}
                                        className="ml-2 text-gray-400"
                                    />
                                )} */}
                            </>
                        ),
                    },
                    { label: "Tipe Koleksi", name: "tipe_koleksi" },
                    { label: "Alamat Storage", name: "alamat_storage" },
                    { label: "Aksi", name: "alamat", colSpan: 2 },
                ]}
                // rows={data}
                // getRowDetailsUrl={(row) => route("batuan.edit", row.id)}
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
