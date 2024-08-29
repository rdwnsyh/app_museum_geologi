import React from "react";
import { Link, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Pagination from "@/Components/Pagination/Pagination";
import FilterBar from "@/Components/FilterBar/FilterBar";
import Table from "@/Components/Table/Table";
import SearchBar from "@/Components/SearchBar/SearchBar";
import { Trash2 } from "lucide-react";

const Index = () => {
    // const { contacts } = usePage().props;

    // const {
    //     data,
    //     meta: { links },
    // } = contacts;

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">Pengembalian</h1>
            <div className="flex items-center justify-between mb-6">
            <SearchBar /> {/* Tambahkan SearchBar di sini */}
                {/* <FilterBar /> */}
                <Link
                    className="btn-indigo focus:outline-none"
                    // href={route("contacts.create")}
                >
                    <span>Create</span>
                    <span className="hidden md:inline"> Pengembalian</span>
                </Link>
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
Index.layout = (page) => <MainLayout title="Pengembalian">{page}</MainLayout>;

export default Index;
