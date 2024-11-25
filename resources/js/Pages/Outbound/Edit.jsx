import React from "react";
import { Link, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import LoadingButton from "@/Components/Button/LoadingButton";
import TextInput from "@/Components/Form/TextInput";
import SelectInput from "@/Components/Form/SelectInput";
import FieldGroup from "@/Components/Form/FieldGroup";

const Edit = ({ outbound }) => {
    const { data, setData, errors, put, processing } = useForm({
        users_id: outbound.users_id,
        no_referensi: outbound.no_referensi || "",
        keterangan: outbound.keterangan || "",
        pesan: outbound.pesan || "",
        tanggal_masuk: outbound.tanggal_masuk || "",
        tanggal_keluar: outbound.tanggal_keluar || "",
        status: outbound.status || "",
        lampiran: outbound?.lampiran || null, // Untuk upload file baru
    });

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            if (data[key] instanceof File) {
                formData.append(key, data[key]);
            } else {
                formData.append(key, data[key] || "");
            }
        });

        for (let pair of formData.entries()) {
            console.log(pair[0] + ": " + pair[1]);
        }

        put(route("outbound.update", outbound.id), {
            data: formData,
            preserveScroll: true,
            forceFormData: true,
        });
    }

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">
                <Link
                    href={route("outbound")}
                    className="text-indigo-600 hover:text-indigo-700"
                >
                    Outbound
                </Link>
                <span className="font-medium text-indigo-600"> /</span> Edit
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
                                {outbound.users?.nama_lengkap ||
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
                            />
                        </FieldGroup>

                        {/* Input untuk Keterangan */}
                        <FieldGroup
                            label="Keterangan"
                            name="keterangan"
                            error={errors.keterangan}
                        >
                            <SelectInput
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
                                    {
                                        value: "Pengembalian",
                                        label: "Pengembalian",
                                    },
                                    {
                                        value: "Barang Baru",
                                        label: "Barang Baru",
                                    },
                                    { value: "Pameran", label: "Pameran" },
                                    { value: "Perbaikan", label: "Perbaikan" },
                                    { value: "dll", label: "Lain-lain" },
                                ]}
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
                            />
                            {errors.pesan && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.pesan}
                                </div>
                            )}
                        </FieldGroup>

                        {/* Input untuk Tanggal Masuk */}
                        <FieldGroup
                            label="Tanggal Masuk"
                            name="tanggal_masuk"
                            error={errors.tanggal_masuk}
                        >
                            <TextInput
                                name="tanggal_masuk"
                                type="date"
                                value={data.tanggal_masuk}
                                error={errors.tanggal_masuk}
                                onChange={(e) =>
                                    setData("tanggal_masuk", e.target.value)
                                }
                            />
                        </FieldGroup>

                        {/* Input untuk Tanggal Keluar */}
                        <FieldGroup
                            label="Tanggal Keluar"
                            name="tanggal_keluar"
                            error={errors.tanggal_keluar}
                        >
                            <TextInput
                                name="tanggal_keluar"
                                type="date"
                                value={data.tanggal_keluar}
                                error={errors.tanggal_keluar}
                                onChange={(e) =>
                                    setData("tanggal_keluar", e.target.value)
                                }
                            />
                        </FieldGroup>

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
                                    { value: "Inbound", label: "Inbound" },
                                    { value: "Outbound", label: "Outbound" },
                                ]}
                            />
                        </FieldGroup>

                        {/* Input untuk Lampiran */}
                        <input
                            type="file"
                            name="lampiran"
                            className={`w-full p-2 border rounded ${
                                errors.lampiran
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setData("lampiran", e.target.files[0]);
                                }
                            }}
                        />
                    </div>
                    <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
                        <LoadingButton
                            loading={processing}
                            type="submit"
                            className="btn-indigo"
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
