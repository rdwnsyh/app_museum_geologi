import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import LoadingButton from "@/Components/Button/LoadingButton";
import FieldGroup from "@/Components/Form/FieldGroup";
import TextInput from "@/Components/Form/TextInput";
import SelectInput from "@/Components/Form/SelectInput";

const Create = ({ peminjaman }) => {
    const { data, setData, errors, post, processing } = useForm({
        peminjaman_id: "", // ID peminjaman terkait
        tanggal_kembali: "", // Tanggal pengembalian
        status_pengembalian: "", // Status pengembalian
        keterangan: "", // Keterangan tambahan
    });

    const [selectedKoleksi, setSelectedKoleksi] = useState([]); // Untuk menyimpan koleksi yang dipinjam
    const [namaPeminjam, setNamaPeminjam] = useState(""); // Untuk menyimpan nama peminjam

    // Fungsi untuk menangani perubahan pada peminjaman_id
    const handlePeminjamanChange = (id) => {
        setData("peminjaman_id", id);
        // Cari peminjaman berdasarkan ID yang dipilih
        const peminjamanTerpilih = peminjaman.find(
            (item) => item.id === parseInt(id)
        );
        // Update koleksi yang dipinjam dan nama peminjam
        if (peminjamanTerpilih) {
            setSelectedKoleksi(peminjamanTerpilih.detail_peminjaman || []);
            setNamaPeminjam(peminjamanTerpilih.users?.nama_lengkap || "N/A");
        } else {
            setSelectedKoleksi([]);
            setNamaPeminjam("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("pengembalian.store"));
    };

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">
                <Link
                    href={route("pengembalian")}
                    className="text-indigo-600 hover:text-indigo-700"
                >
                    Pengembalian
                </Link>
                <span className="font-medium text-indigo-600"> /</span> Create
            </h1>
            <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-8 p-8 lg:grid-cols-2">
                        {/* Pilih Peminjaman */}
                        <FieldGroup
                            label="Pilih Peminjaman"
                            name="peminjaman_id"
                            error={errors.peminjaman_id}
                        >
                            <select
                                value={data.peminjaman_id}
                                onChange={(e) =>
                                    handlePeminjamanChange(e.target.value)
                                }
                                className="w-full border rounded p-2"
                            >
                                <option value="">Pilih Peminjaman</option>
                                {peminjaman.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.keperluan} - {item.tanggal_pinjam}
                                    </option>
                                ))}
                            </select>
                        </FieldGroup>

                        {/* Nama Peminjam */}
                        <FieldGroup label="Nama Peminjam" name="nama_peminjam">
                            <div className="p-2 bg-gray-100 border rounded">
                                {namaPeminjam || "N/A"}
                            </div>
                        </FieldGroup>

                        {/* Tanggal Kembali */}
                        <FieldGroup
                            label="Tanggal Kembali"
                            name="tanggal_kembali"
                            error={errors.tanggal_kembali}
                        >
                            <TextInput
                                type="date"
                                value={data.tanggal_kembali}
                                onChange={(e) =>
                                    setData("tanggal_kembali", e.target.value)
                                }
                                error={errors.tanggal_kembali}
                            />
                        </FieldGroup>

                        {/* Status Pengembalian */}
                        <FieldGroup
                            label="Status Pengembalian"
                            name="status_pengembalian"
                            error={errors.status_pengembalian}
                        >
                            <SelectInput
                                name="status_pengembalian"
                                value={data.status_pengembalian}
                                onChange={(e) =>
                                    setData(
                                        "status_pengembalian",
                                        e.target.value
                                    )
                                }
                                options={[
                                    { value: "", label: "Pilih Status" },
                                    {
                                        value: "Dikembalikan",
                                        label: "Dikembalikan",
                                    },
                                    { value: "Terlambat", label: "Terlambat" },
                                ]}
                                error={errors.status_pengembalian}
                            />
                        </FieldGroup>

                        {/* Keterangan */}
                        <FieldGroup
                            label="Keterangan"
                            name="keterangan"
                            error={errors.keterangan}
                        >
                            <textarea
                                value={data.keterangan}
                                onChange={(e) =>
                                    setData("keterangan", e.target.value)
                                }
                                className={`w-full p-2 border rounded ${
                                    errors.keterangan
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                rows="4"
                                placeholder="Tambahkan keterangan jika diperlukan"
                            />
                        </FieldGroup>
                    </div>

                    {/* Koleksi yang Dipinjam */}
                    {selectedKoleksi.length > 0 && (
                        <div className="p-8">
                            <h3 className="text-xl font-semibold mb-4">
                                Koleksi yang Dipinjam
                            </h3>
                            <table className="min-w-full bg-white border rounded">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border">
                                            Nama Koleksi
                                        </th>
                                        <th className="px-4 py-2 border">
                                            Jumlah
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedKoleksi.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2 border">
                                                {item.koleksi?.nama_koleksi ||
                                                    "N/A"}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                {item.jumlah_dipinjam}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Tombol Kirim */}
                    <div className="flex justify-end mt-8">
                        <LoadingButton
                            loading={processing}
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-500 rounded"
                        >
                            Simpan
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

Create.layout = (page) => <MainLayout children={page} />;

export default Create;
