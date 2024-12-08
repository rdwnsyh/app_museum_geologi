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
        users_id: user?.id || "",
        keperluan: "",
        pesan: "",
        tanggal_pinjam: "",
        tanggal_jatuh_tempo: "",
        identitas: null,
        surat_permohonan: null,
        koleksi: [], // Array for koleksi details
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
        setData(name, file || null);  // Ensure null is set when no file is selected
    };


    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
    
        // Append normal data fields
        Object.keys(data).forEach((key) => {
            if (Array.isArray(data[key])) {
                // For arrays, we iterate over each item and append it individually
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
    
        // Send the formData using the post method
        post(route("peminjaman.store"), {
            data: formData,
            forceFormData: true,
        });
    };
    

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">
                <Link
                    href={route("peminjaman")}
                    className="text-indigo-600 hover:text-indigo-700"
                >
                    Peminjaman
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

                        {/* Referensi Peminjaman
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
                        </FieldGroup> */}

                        {/* Input untuk Keterangan */}
                        <FieldGroup
                            label="Keperluan"
                            name="keperluan"
                            error={errors.keperluan}
                        >
                            <SelectInput
                                name="keperluan"
                                error={errors.keperluan}
                                value={data.keperluan}
                                onChange={(e) =>
                                    setData("keperluan", e.target.value)
                                }
                                options={[
                                    { value: "", label: "Pilih Keperluan" },
                                    { value: "Penelitian", label: "Penelitian" },
                                    { value: "Pameran", label: "Pameran" },
                                    { value: "Perbaikan", label: "Perbaikan" },
                                    { value: "Lain-Lain", label: " Lain-Lain" },
                                    
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

                        <FieldGroup 
                            label="Tanggal Pinjam" 
                            name="tanggal_pinjam"
                            error={errors.tanggal_pinjam}>
                            <TextInput
                                name="tanggal_pinjam"
                                type="date"
                                error={errors.tanggal_pinjam}
                                value={data.tanggal_pinjam}
                                onChange={(e) => setData("tanggal_pinjam", 
                                    e.target.value)}
                            />
                        </FieldGroup>

                       
                        <FieldGroup 
                            label="Tanggal Jatuh Tempo"
                            name="tanggal_jatuh_tempo" 
                            error={errors.tanggal_jatuh_tempo}>
                            <TextInput
                                name="tanggal_jatuh_tempo"
                                type="date"
                                error={errors.tanggal_jatuh_tempo}
                                value={data.tanggal_jatuh_tempo}
                                onChange={(e) => setData("tanggal_jatuh_tempo", 
                                    e.target.value)}
                            />
                        </FieldGroup>

                
                        <FieldGroup 
                            label="Identitas" 
                            name="identitas"
                            error={errors.identitas}>
                            <FileInput
                                name="identitas"
                                error={errors.identitas}
                                onFileChange={(file) => handleFileChange(
                                    "identitas", file)}
                            />
                        </FieldGroup>

                      
                        <FieldGroup 
                            label="Surat Permohonan" 
                            name= "surat_permohonan"
                            error={errors.surat_permohonan}>
                            <FileInput
                                name="surat_permohonan"
                                error={errors.surat_permohonan}
                                onFileChange={(file) => handleFileChange(
                                    "surat_permohonan", file)}
                            />
                        </FieldGroup>
                    </div>

                    {/* Tabel Koleksi */}
                    <div className="p-8">
                        <h3 className="mb-4 text-xl font-semibold">Koleksi</h3>
                        {data.koleksi.map((koleksiItem, index) => (
                            <div key={index} className="mb-4">
                                <FieldGroup name={`koleksi[${index}]`} error={errors.koleksi?.[index]}>
                                    <div className="grid gap-4 grid-cols-3">
                                        <Select
                                            value={koleksiItem.koleksi_id ? { value: koleksiItem.koleksi_id, label: koleksi.find(k => k.id === koleksiItem.koleksi_id)?.nama_koleksi } : null}
                                            onChange={(selectedOption) => handleKoleksiChange(index, "koleksi_id", selectedOption?.value)}
                                            options={koleksi.map(k => ({ value: k.id, label: k.nama_koleksi }))}
                                        />
                                        <TextInput
                                            value={koleksiItem.jumlah_dipinjam}
                                            onChange={(e) => handleKoleksiChange(index, "jumlah_dipinjam", e.target.value)}
                                            type="number"
                                            min="1"
                                        />
                                        <button type="button" onClick={() => removeKoleksiRow(index)} className="p-2 bg-red-500 text-white rounded">
                                            Hapus
                                        </button>
                                    </div>
                                </FieldGroup>
                            </div>
                        ))}
                        <button type="button" onClick={addKoleksiRow} className="py-2 px-4 bg-green-500 text-white rounded">
                            Tambah Koleksi
                        </button>
                    </div>

                    {/* Tombol Kirim */}
                    <div className="flex justify-end mt-8">
                        <LoadingButton loading={processing} type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
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
