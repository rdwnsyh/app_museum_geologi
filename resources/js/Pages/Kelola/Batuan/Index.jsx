import React from "react";
import { Link, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Table from "@/Components/Table/Table";
import SearchBar from "@/Components/SearchBar/SearchBar";
import Pagination from "@/Components/Pagination/Pagination";
import { ArrowDownToLine } from "lucide-react";

function Index() {
    const { batuan } = usePage().props;

    // Pastikan bahwa batuan dan meta tersedia sebelum diakses
    const data = batuan?.data || [];
    const links = batuan?.meta?.links || [];

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">Kelola Koleksi</h1>

            <div className="flex items-center justify-between mb-2 ">
                <SearchBar /> {/* Tambahkan SearchBar di sini */}
                <div className="flex items-center justify-end mb-2">
                    <Link
                        className="bg-green-600 text-white py-2 px-4 mx-2 rounded hover:bg-green-900 transition"
                        href={route("kelolakoleksibatuan.create")}
                    >
                        <span className="hidden md:inline">+ Tambah</span>
                    </Link>
                    <Link
                        className="bg-blue-600 text-white py-2 px-4 mx-2 rounded hover:bg-blue-900 transition"
                        href="#"
                    >
                        <ArrowDownToLine className="w-4 h-4 mr-2" />
                        <span className="hidden md:inline">Excel</span>
                    </Link>
                    <Link
                        className="bg-blue-600 text-white py-2 px-4 mx-2 rounded hover:bg-blue-900 transition"
                        href="#"
                    >
                        <ArrowDownToLine className="w-4 h-4 mr-2" />
                        <span className="hidden md:inline">PDF</span>
                    </Link>
                </div>
            </div>

            {/* Tabel untuk menampilkan data koleksi */}
            <Table
                columns={[
                    { label: "Nomor Koleksi", name: "nomor_koleksi" },
                    { label: "Nama Koleksi", name: "nama_koleksi" },
                    { label: "Tipe Koleksi", name: "tipe_koleksi" },
                    { label: "Alamat Storage", name: "alamat_storage" },
                    { label: "Aksi", name: "aksi" },
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
