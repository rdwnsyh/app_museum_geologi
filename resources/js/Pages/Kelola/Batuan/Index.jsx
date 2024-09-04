import React from "react";
import { Link, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
// import FilterBar from "@/Components/FilterBar/FilterBar";
// import Pagination from "@/Components/Pagination/Pagination";
import Table from "@/Components/Table/Table";
import SearchBar from "@/Components/SearchBar/SearchBar";
// import { Trash2 } from "lucide-react";

function Index() {
    // const { organizations } = usePage().props;

    // const {
    //     data,
    //     meta: { links },
    // } = organizations;

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">Kelola Koleksi</h1>

            <div className="flex items-center justify-between mb-6">
                <SearchBar /> {/* Tambahkan SearchBar di sini */}
                {/* <FilterBar /> */}
                <Link
                    className="btn-indigo focus:outline-none"
                    href={route("kelolakoleksibatuan.create")}
                >
                    <span>Create</span>
                    <span className="hidden md:inline"> Kelola Koleksi </span>
                </Link>
            </div>

            <Table
                columns={[
                    {
                        label: "Nomor Koleksi",
                        name: "name",
                        renderCell: (row) => (
                            <>
                                {/* {row.name}
                                {row.deleted_at && (
                                    <Trash2
                                        size={16}
                                        className="ml-2 text-gray-400"
                                    />
                                )} */}
                            </>
                        ),
                    },
                    { label: "Nama Koleksi", name: "city" },
                    { label: "Tipe Koleksi", name: "phone" },
                    { label: "Alamat Storage", name: "phone" },
                    { label: "Aksi", name: "alamat", colSpan: 2 },
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