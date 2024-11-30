import React from "react";
import { Link, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import LoadingButton from "@/Components/Button/LoadingButton";
import TextInput from "@/Components/Form/TextInput";
import SelectInput from "@/Components/Form/SelectInput";
import FieldGroup from "@/Components/Form/FieldGroup";
import FileInput from "@/Components/Form/FileInput";

const Edit = ({ outbound }) => {
    const { data, setData, errors, put, processing } = useForm({
        users_id: outbound.users_id,
        no_referensi: outbound.no_referensi || "",
        keterangan: outbound.keterangan || "",
        pesan: outbound.pesan || "",
        tanggal: outbound.tanggal || "",
        status: outbound.status || "",
        lampiran: null, // Untuk upload file baru
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (key === "lampiran" && data[key] === null) return; // Abaikan file jika null
            formData.append(key, data[key]);
        });

        put(route("outbound.update", outbound.id), {
            data: formData,
            onSuccess: () => alert("Data berhasil diperbarui."),
            onError: (errors) => console.error("Errors:", errors),
        });
    };

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
                            />
                        </FieldGroup>

                        {/* Input untuk Lampiran */}
                        <FileInput
                            name="lampiran"
                            existingFile={data.lampiran} // File eksisting dari backend
                            onFileChange={(file) => setData("lampiran", file)} // Update state parent
                            error={errors.lampiran} // Tampilkan pesan error
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
