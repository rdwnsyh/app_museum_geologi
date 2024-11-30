import React, { useState, useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import LoadingButton from "@/Components/Button/LoadingButton";
import TextInput from "@/Components/Form/TextInput";
import SelectInput from "@/Components/Form/SelectInput";
import FieldGroup from "@/Components/Form/FieldGroup";
import FileInput from "@/Components/Form/FileInput";
import Select from "react-select";

const Create = ({ outbound, koleksiOptions }) => {
    const { data, setData, errors, post, processing } = useForm({
        users_id: outbound.id, // Isi otomatis dengan ID pengguna login
        no_referensi: "",
        keterangan: "",
        pesan: "",
        tanggal: "",
        status: "",
        lampiran: null,
        koleksi: [], // Array untuk menyimpan koleksi
    });

    // Fungsi untuk menambah koleksi
    const addKoleksiRow = () => {
        setData("koleksi", [
            ...data.koleksi,
            { nama_koleksi: "", jumlah_dipinjam: 1 },
        ]);
    };

    // Fungsi untuk menghapus koleksi berdasarkan index
    const removeKoleksiRow = (index) => {
        const newKoleksi = [...data.koleksi];
        newKoleksi.splice(index, 1);
        setData("koleksi", newKoleksi);
    };

    // Fungsi untuk mengubah data koleksi pada baris tertentu
    const handleKoleksiChange = (index, field, value) => {
        const newKoleksi = [...data.koleksi];
        newKoleksi[index][field] = value;
        setData("koleksi", newKoleksi);
    };

    const handleFileChange = (name, file) => {
        setData(name, file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Serialize data for non-file fields
        Object.keys(data).forEach((key) => {
            if (data[key] instanceof File) {
                formData.append(key, data[key]); // Append file field
            } else {
                formData.append(key, JSON.stringify(data[key])); // Serialize array and primitive fields
            }
        });

        post(route("outbound.store"), {
            data: formData,
            preserveScroll: true,
            forceFormData: true, // Ensure formData is sent instead of JSON
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
                <span className="font-medium text-indigo-600"> /</span> Create
            </h1>
            <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid gap-8 p-8 lg:grid-cols-2">
                        {/* Nama Lengkap Pengguna Login */}
                        <FieldGroup
                            label="Nama Lengkap"
                            name="nama_lengkap"
                            error={errors.users_id}
                        >
                            <div className="p-2 bg-gray-100 border border-gray-300 rounded">
                                {outbound.nama_lengkap}
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
                                error={errors.no_referensi}
                                value={data.no_referensi}
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
                                error={errors.keterangan}
                                value={data.keterangan}
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

                        {/* Input untuk Pesan (Textarea) */}
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
                                error={errors.tanggal}
                                value={data.tanggal}
                                onChange={(e) =>
                                    setData("tanggal", e.target.value)
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
                                error={errors.status}
                                value={data.status}
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
                        <FieldGroup
                            label="Lampiran"
                            name="lampiran"
                            error={errors.lampiran}
                        >
                            <FileInput
                                name="lampiran"
                                error={errors.lampiran}
                                onFileChange={(file) =>
                                    handleFileChange("lampiran", file)
                                }
                            />
                        </FieldGroup>
                    </div>

                    {/* Tabel Koleksi */}
                    <div className="p-8">
                        <h3 className="mb-4 text-xl font-semibold">Koleksi</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2">
                                            Nama Koleksi
                                        </th>
                                        <th className="px-4 py-2">
                                            Jumlah Dipinjam
                                        </th>
                                        <th className="px-4 py-2">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.koleksi.map((koleksi, index) => (
                                        <tr key={index}>
                                            {/* Nama Koleksi */}
                                            <td className="px-4 py-2">
                                                <Select
                                                    name={`koleksi[${index}].nama_koleksi`}
                                                    value={{
                                                        value: koleksi.nama_koleksi,
                                                        label: koleksi.nama_koleksi,
                                                    }}
                                                    onChange={(e) =>
                                                        handleKoleksiChange(
                                                            index,
                                                            "nama_koleksi",
                                                            e.value
                                                        )
                                                    }
                                                    options={
                                                        koleksiOptions &&
                                                        koleksiOptions.length >
                                                            0
                                                            ? koleksiOptions.map(
                                                                  (
                                                                      koleksiOption
                                                                  ) => ({
                                                                      value: koleksiOption.nama_koleksi,
                                                                      label: koleksiOption.nama_koleksi,
                                                                  })
                                                              )
                                                            : []
                                                    }
                                                    isSearchable
                                                />
                                            </td>
                                            {/* Jumlah Dipinjam */}
                                            <td className="px-4 py-2">
                                                <TextInput
                                                    name={`koleksi[${index}].jumlah_dipinjam`}
                                                    type="number"
                                                    value={
                                                        koleksi.jumlah_dipinjam
                                                    }
                                                    onChange={(e) =>
                                                        handleKoleksiChange(
                                                            index,
                                                            "jumlah_dipinjam",
                                                            e.target.value
                                                        )
                                                    }
                                                    min="1"
                                                    max="100"
                                                />
                                            </td>
                                            {/* Aksi */}
                                            <td className="px-4 py-2">
                                                <button
                                                    type="button"
                                                    className="px-4 py-2 bg-red-500 text-white rounded"
                                                    onClick={() =>
                                                        removeKoleksiRow(index)
                                                    }
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Tombol untuk menambah koleksi */}
                            <button
                                type="button"
                                onClick={addKoleksiRow}
                                className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
                            >
                                Tambah Koleksi
                            </button>
                        </div>
                    </div>

                    {/* Tombol Simpan */}
                    <div className="p-8 flex justify-end">
                        <LoadingButton
                            type="submit"
                            processing={processing}
                            className="px-4 py-2 bg-indigo-600 text-white rounded"
                        >
                            Simpan
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

Create.layout = (page) => <MainLayout>{page}</MainLayout>;

export default Create;
