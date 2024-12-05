import React, { useState } from "react";
import { usePage, Head } from '@inertiajs/react';
import { Link, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import LoadingButton from "@/Components/Button/LoadingButton";
import TextInput from "@/Components/Form/TextInput";
import SelectInput from "@/Components/Form/SelectInput";
import FieldGroup from "@/Components/Form/FieldGroup";
import FileInput from "@/Components/Form/FileInput";

const Edit = () => {
    const { outbound } = usePage().props || {}; // Getting data sent from the controller
    console.log(outbound);

    const { data, setData, errors, put, processing } = useForm({
        users_id: outbound?.users_id || [], // Memastikan data sudah terisi
        no_referensi: outbound?.no_referensi || null,
        keterangan: outbound?.keterangan || "",
        pesan: outbound?.pesan || "",
        tanggal: outbound?.tanggal || "",
        status: outbound?.status || "",
        lampiran: outbound?.lampiran || null,
        koleksi: outbound?.koleksi || [],
    });

    const [successMessage, setSuccessMessage] = useState("");

    // Handle file input change
    const handleFileChange = (name, file) => {
        setData(name, file);
    };

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
    
        // Loop through data and append it to the FormData object
        Object.entries(data).forEach(([key, value]) => {
            if (value instanceof File) {
                console.log(`Appending file: ${key}, ${value}`); // Debug log
                formData.append(key, value); // Append file
            } else if (Array.isArray(value)) {
                formData.append(key, JSON.stringify(value)); // Serialize array to string
            } else if (value !== null) {
                formData.append(key, value); // Append normal values
            }
        });
    
        // Send the form data via Inertia's put method
        put(route("outbound.update", outbound.id), formData, {
            onSuccess: () => {
                setSuccessMessage("Outbound berhasil diperbarui");
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    }    

    return (
        <div>
            <Head
                title={`edit ${outbound?.users?.nama_lengkap || "unknown"}`}
            />
            <h1 className="mb-8 text-3xl font-bold">
                <Link
                    href={route("outbound")}
                    className="text-indigo-600 hover:text-indigo-700"
                >
                    Edit Outbound
                </Link>
                <span className="mx-2 font-medium text-indigo-600">/</span>
                {outbound?.users?.nama_lengkap || "unknown"}
            </h1>

            <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid gap-8 p-8 lg:grid-cols-2">
                        {/* Nama Pembuat */}
                        <FieldGroup
                            label="Nama Pembuat"
                            name="users_id"
                            error={errors.users_id}
                        >
                            <div className="p-2 bg-gray-100 border border-gray-300 rounded">
                                {outbound?.users?.nama_lengkap ||
                                    "Nama tidak tersedia"}
                            </div>
                        </FieldGroup>

                        {/* Input untuk No Referensi */}
                        <FieldGroup
                            label="No Referensi"
                            name="no_referensi"
                            error={errors.no_referensi}
                        >
                            <TextInput
                                name="no_referensi"
                                value={data.no_referensi}
                                error={errors.no_referensi}
                                onChange={(e) =>
                                    setData("no_referensi", e.target.value)
                                }
                                required
                            />
                        </FieldGroup>

                        {/* Input untuk Keterangan */}
                        <FieldGroup
                            label="Keterangan"
                            name="keterangan"
                            error={errors.keterangan}
                        >
                            <SelectInput
                                type="keterangan"
                                name="keterangan"
                                value={data.keterangan}
                                error={errors.keterangan}
                                onChange={(e) =>
                                    setData("keterangan", e.target.value)
                                }
                                options={[
                                    { value: "", label: "Pilih Keterangan" },
                                    {
                                        value: "Peminjaman",
                                        label: "Peminjaman",
                                    },
                                    { value: "Pameran", label: "Pameran" },
                                    { value: "Perbaikan", label: "Perbaikan" },
                                    { value: "dll", label: "Lain-lain" },
                                ]}
                                required
                            />
                        </FieldGroup>

                        {/* Input untuk Pesan */}
                        <FieldGroup
                            label="Pesan"
                            name="pesan"
                            error={errors.pesan}
                        >
                            <textarea
                                name="pesan"
                                className={`w-full p-2 border rounded ${
                                    errors.pesan
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                rows="4"
                                value={data.pesan}
                                onChange={(e) =>
                                    setData("pesan", e.target.value)
                                }
                                required
                            />
                            {errors.pesan && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.pesan}
                                </div>
                            )}
                            
                        </FieldGroup>

                        {/* Input untuk Tanggal Masuk */}
                        <FieldGroup
                            label="Tanggal"
                            name="tanggal"
                            error={errors.tanggal}
                        >
                            <TextInput
                                name="tanggal"
                                type="date"
                                value={data.tanggal}
                                error={errors.tanggal}
                                onChange={(e) =>
                                    setData("tanggal", e.target.value)
                                }
                                required
                            />
                        </FieldGroup>

                        {/* Input untuk Tanggal Keluar */}

                        {/* Input untuk Status */}
                        <FieldGroup
                            label="Status"
                            name="status"
                            error={errors.status}
                        >
                            <SelectInput
                                name="status"
                                value={data.status}
                                error={errors.status}
                                onChange={(e) =>
                                    setData("status", e.target.value)
                                }
                                options={[
                                    { value: "", label: "Pilih Status" },
                                    { value: "Outbound", label: "Outbound" },
                                ]}
                                required
                            />
                        </FieldGroup>

                        {/* Input untuk Lampiran */}
                        <FieldGroup
                            label="Lampiran"
                            name="lampiran"
                            error={errors.lampiran}
                        >
                            <FileInput
                                name="lampiran"  // Ensure this matches the backend field
                                error={errors.lampiran}
                                existingFile={outbound.lampiran}
                                onFileChange={(file) => handleFileChange("lampiran", file)}
                            />
                        </FieldGroup>
                    </div>

                    <div className="p-8">
                        <h3 className="mb-4 text-xl font-semibold">Koleksi</h3>

                        {/* Display the Koleksi data in a table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-300 rounded">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">Koleksi</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">Jumlah Dipinjam</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.koleksi.map((koleksiItem, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="px-6 py-4 text-sm text-gray-800">
                                                {/* Displaying the name of the koleksi */}
                                                {koleksiItem.koleksi_id
                                                    ? koleksi.find((k) => k.id === koleksiItem.koleksi_id)?.nama_koleksi
                                                    : "Tidak ada koleksi"}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800">
                                                {/* Displaying jumlah dipinjam */}
                                                {koleksiItem.jumlah_dipinjam || "0"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    
                    <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
                        <LoadingButton
                            loading={processing}
                            type="submit"
                            className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                        >
                            Update
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

/**
 * Persistent Layout (Inertia.js)
 */
Edit.layout = (page) => <MainLayout title="Edit Outbound">{page}</MainLayout>;

export default Edit;
