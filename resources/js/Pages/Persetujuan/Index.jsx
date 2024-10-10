import React from "react";
import { Link, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Pagination from "@/Components/Pagination/Pagination";
import FilterBar from "@/Components/FilterBar/FilterBar";
import Table from "@/Components/Table/Table";
import SearchBar from "@/Components/SearchBar/SearchBar";
import { Trash2 } from "lucide-react";
import { ArrowDownToLine, Plus } from "lucide-react";

const Index = () => {
    // const { contacts } = usePage().props;

    // const {
    //     data,
    //     meta: { links },
    // } = contacts;

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">Persetujuan</h1>
            <div className="flex items-center justify-between mb-6">
            <SearchBar /> {/* Tambahkan SearchBar di sini */}
                {/* <FilterBar /> */}
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
                    { label: "Organization", name: "organization.name" },
                    { label: "City", name: "city" },
                    { label: "Phone", name: "phone", colSpan: 2 },
                ]}
                // rows={data}
                // getRowDetailsUrl={(row) => route("contacts.edit", row.id)}
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
