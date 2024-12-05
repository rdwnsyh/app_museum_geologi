import React, { useState, useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import LoadingButton from "@/Components/Button/LoadingButton";
import TextInput from "@/Components/Form/TextInput";
import SelectInput from "@/Components/Form/SelectInput";
import FieldGroup from "@/Components/Form/FieldGroup";
import FileInput from "@/Components/Form/FileInput";
import Select from "react-select";

const Create = ({ koleksi, peminjaman, user }) => {
    const { data, setData, errors, post, processing } = useForm({
        users_id: user?.id || "", // Isi otomatis dengan ID pengguna login
        no_referensi: "", // Untuk memilih referensi dari peminjaman
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
            { koleksi_id: "", jumlah_dipinjam: 1, nama_koleksi: "" },
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

        // Jika field adalah koleksi_id, kita perlu mencari nama koleksi yang sesuai
        if (field === "koleksi_id") {
            const selectedKoleksi = koleksi.find((item) => item.id === value);
            newKoleksi[index].nama_koleksi = selectedKoleksi
                ? selectedKoleksi.nama_koleksi
                : "";
        }

        setData("koleksi", newKoleksi);
    };

    // Menangani perubahan file lampiran
    const handleFileChange = (name, file) => {
        // Jika tidak ada file, set nilai lampiran sebagai null
        setData(name, file || null);
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Menambahkan data pengguna dan kolom lainnya ke formData
        Object.keys(data).forEach((key) => {
            if (Array.isArray(data[key])) {
                data[key].forEach((item, index) => {
                    Object.keys(item).forEach((subKey) => {
                        formData.append(
                            `${key}[${index}][${subKey}]`,
                            item[subKey]
                        );
                    });
                });
            } else if (data[key] instanceof File) {
                formData.append(key, data[key]);
            } else if (data[key] !== null) {
                formData.append(key, data[key]);
            }
        });

        // Kirim form dengan method post
        post(route("outbound.store"), {
            data: formData,
            forceFormData: true,
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
                                {user?.nama_lengkap || "Nama Pengguna"}
                            </div>
                        </FieldGroup>

                        {/* Referensi Peminjaman */}
                        <FieldGroup
                            label="No Referensi"
                            name="no_referensi"
                            error={errors.no_referensi}
                        >
                            <TextInput
                                name="no_referensi"
                                value={data.no_referensi || ""}
                                onChange={(e) =>
                                    setData("no_referensi", e.target.value)
                                }
                                error={errors.no_referensi}
                                placeholder="Masukkan No Referensi (Opsional)"
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
                        {data.koleksi.map((koleksiItem, index) => (
                            <div key={index} className="mb-4">
                                <FieldGroup
                                    name={`koleksi[${index}]`}
                                    error={errors.koleksi?.[index]}
                                >
                                    <div className="grid gap-4 grid-cols-3">
                                        <Select
                                            value={
                                                koleksiItem.koleksi_id
                                                    ? {
                                                          value: koleksiItem.koleksi_id,
                                                          label: koleksi.find(
                                                              (k) =>
                                                                  k.id ===
                                                                  koleksiItem.koleksi_id
                                                          )?.nama_koleksi,
                                                      }
                                                    : null
                                            }
                                            onChange={(selectedOption) =>
                                                handleKoleksiChange(
                                                    index,
                                                    "koleksi_id",
                                                    selectedOption?.value
                                                )
                                            }
                                            options={koleksi.map((k) => ({
                                                value: k.id,
                                                label: k.nama_koleksi,
                                            }))}
                                        />
                                        <TextInput
                                            value={koleksiItem.jumlah_dipinjam}
                                            onChange={(e) =>
                                                handleKoleksiChange(
                                                    index,
                                                    "jumlah_dipinjam",
                                                    e.target.value
                                                )
                                            }
                                            type="number"
                                            min="1"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeKoleksiRow(index)
                                            }
                                            className="p-2 bg-red-500 text-white rounded"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </FieldGroup>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addKoleksiRow}
                            className="py-2 px-4 bg-green-500 text-white rounded"
                        >
                            Tambah Koleksi
                        </button>
                    </div>

                    {/* Tombol Kirim */}
                    <div className="flex justify-end mt-8">
                        <LoadingButton
                            loading={processing}
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-500 rounded"
                        >
                            Kirim
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

Create.layout = (page) => <MainLayout children={page} />;

export default Create;
