import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import LoadingButton from "@/Components/Button/LoadingButton";
import TextInput from "@/Components/Form/TextInput";
import FieldGroup from "@/Components/Form/FieldGroup";
import FileInput from "@/Components/Form/FileInput";

const Create = ({ user, pengembalian, koleksiBaru }) => {
    const [isImport, setIsImport] = useState(false); // Toggle Manual vs Import
    const [importedKoleksi, setImportedKoleksi] = useState([]); // Koleksi dari pengembalian
    const { data, setData, post, processing, errors } = useForm({
        users_id: user?.id || "",
        no_referensi: "",
        keterangan: "",
        pesan: "",
        tanggal: "",
        status: "Inbound", // Status default
        lampiran: null,
        pengembalian_id: "", // Untuk proses import
        koleksi: [], // Untuk proses manual
    });

    const handlePengembalianChange = (id) => {
        setData("pengembalian_id", id);

        const selectedPengembalian = pengembalian.find(
            (item) => item.id === parseInt(id)
        );

        if (selectedPengembalian?.peminjaman?.detailPeminjaman) {
            setImportedKoleksi(
                selectedPengembalian.peminjaman.detailPeminjaman.map(
                    (detail) => ({
                        nama_koleksi: detail.koleksi?.nama_koleksi || "N/A",
                        jumlah_dikembalikan: detail.jumlah_dipinjam || 0,
                    })
                )
            );
        } else {
            setImportedKoleksi([]);
        }
    };

    const addKoleksiRow = () => {
        setData("koleksi", [
            ...data.koleksi,
            { koleksi_id: "", jumlah: 1, nama_koleksi: "" },
        ]);
    };

    const removeKoleksiRow = (index) => {
        const newKoleksi = [...data.koleksi];
        newKoleksi.splice(index, 1);
        setData("koleksi", newKoleksi);
    };

    const handleKoleksiChange = (index, field, value) => {
        const newKoleksi = [...data.koleksi];
        newKoleksi[index][field] = value;

        if (field === "koleksi_id") {
            const selectedKoleksi = koleksiBaru.find(
                (item) => item.id === value
            );
            newKoleksi[index].nama_koleksi = selectedKoleksi
                ? selectedKoleksi.nama_koleksi
                : "";
        }

        setData("koleksi", newKoleksi);
    };

    const handleFileChange = (name, file) => {
        setData(name, file || null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("inbound.store"), {
            preserveScroll: true,
        });
    };

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">
                <Link
                    href={route("inbound")}
                    className="text-indigo-600 hover:text-indigo-700"
                >
                    Inbound
                </Link>
                <span className="font-medium text-indigo-600"> /</span> Create
            </h1>

            {/* Toggle antara Manual dan Import */}
            <div className="mb-6">
                <button
                    type="button"
                    className={`mr-4 px-4 py-2 ${
                        !isImport ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                    onClick={() => setIsImport(false)}
                >
                    Tambah Manual
                </button>
                <button
                    type="button"
                    className={`px-4 py-2 ${
                        isImport ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                    onClick={() => setIsImport(true)}
                >
                    Import Data Pengembalian
                </button>
            </div>

            <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-8 p-8 lg:grid-cols-2">
                        {/* Nama Pengguna */}
                        <FieldGroup label="Nama Pengguna" name="users_id">
                            <div className="p-2 bg-gray-100 border rounded">
                                {user?.nama_lengkap || "N/A"}
                            </div>
                        </FieldGroup>
                        {/* No Referensi */}
                        <FieldGroup
                            label="No Referensi"
                            name="no_referensi"
                            error={errors.no_referensi}
                        >
                            <TextInput
                                value={data.no_referensi}
                                onChange={(e) =>
                                    setData("no_referensi", e.target.value)
                                }
                                error={errors.no_referensi}
                            />
                        </FieldGroup>
                        {/* Keterangan */}
                        <FieldGroup
                            label="Keterangan"
                            name="keterangan"
                            error={errors.keterangan}
                        >
                            <TextInput
                                value={data.keterangan}
                                onChange={(e) =>
                                    setData("keterangan", e.target.value)
                                }
                                className="w-full p-2 border rounded"
                                rows="4"
                            />
                        </FieldGroup>
                        {/* Pesan */}
                        <FieldGroup
                            label="Pesan"
                            name="pesan"
                            error={errors.pesan}
                        >
                            <textarea
                                value={data.pesan}
                                onChange={(e) =>
                                    setData("pesan", e.target.value)
                                }
                                className="w-full p-2 border rounded"
                                rows="4"
                            />
                        </FieldGroup>
                        {/* Tanggal */}
                        <FieldGroup
                            label="Tanggal"
                            name="tanggal"
                            error={errors.tanggal}
                        >
                            <TextInput
                                type="date"
                                value={data.tanggal}
                                onChange={(e) =>
                                    setData("tanggal", e.target.value)
                                }
                                error={errors.tanggal}
                            />
                        </FieldGroup>
                        <FieldGroup
                            label="Status"
                            name="status"
                            error={errors.status}
                        >
                            <div className="p-2 bg-gray-100 border rounded">
                                {data.status || "Tidak Ada Status"}
                            </div>
                        </FieldGroup>

                        {isImport ? (
                            <FieldGroup
                                label="Pilih Pengembalian"
                                name="pengembalian_id"
                                error={errors.pengembalian_id}
                            >
                                <select
                                    value={data.pengembalian_id}
                                    onChange={(e) =>
                                        handlePengembalianChange(e.target.value)
                                    }
                                    className="w-full border rounded p-2"
                                >
                                    <option value="">
                                        Pilih Data Pengembalian
                                    </option>
                                    {pengembalian?.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.peminjaman.users
                                                ?.nama_lengkap || "N/A"}{" "}
                                            - {item.tanggal_kembali}
                                        </option>
                                    ))}
                                </select>
                            </FieldGroup>
                        ) : (
                            <FieldGroup label="Lampiran" name="lampiran">
                                <FileInput
                                    onFileChange={(file) =>
                                        handleFileChange("lampiran", file)
                                    }
                                    error={errors.lampiran}
                                />
                            </FieldGroup>
                        )}
                    </div>

                    {isImport ? (
                        <div className="p-8">
                            <h3 className="mb-4 text-xl font-semibold">
                                Koleksi yang Dikembalikan
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300 rounded">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="px-4 py-2 border border-gray-300 text-left font-semibold">
                                                Nama Koleksi
                                            </th>
                                            <th className="px-4 py-2 border border-gray-300 text-left font-semibold">
                                                Jumlah Dikembalikan
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {importedKoleksi.length > 0 ? (
                                            importedKoleksi.map(
                                                (item, index) => (
                                                    <tr
                                                        key={index}
                                                        className={`${
                                                            index % 2 === 0
                                                                ? "bg-white"
                                                                : "bg-gray-50"
                                                        } hover:bg-gray-100`}
                                                    >
                                                        <td className="px-4 py-2 border border-gray-300">
                                                            {item.nama_koleksi}
                                                        </td>
                                                        <td className="px-4 py-2 border border-gray-300">
                                                            {
                                                                item.jumlah_dikembalikan
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="2"
                                                    className="px-4 py-4 text-center text-gray-500"
                                                >
                                                    Tidak ada koleksi yang
                                                    dikembalikan.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="p-8">
                            <h3 className="text-xl font-semibold mb-4">
                                Koleksi Baru
                            </h3>
                            {data.koleksi.map((koleksiItem, index) => (
                                <div key={index} className="mb-4">
                                    <FieldGroup>
                                        <div className="grid gap-4 grid-cols-3">
                                            <select
                                                className="border rounded p-2"
                                                value={
                                                    koleksiItem.koleksi_id || ""
                                                }
                                                onChange={(e) =>
                                                    handleKoleksiChange(
                                                        index,
                                                        "koleksi_id",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    Pilih Koleksi Baru
                                                </option>
                                                {koleksiBaru?.map((k) => (
                                                    <option
                                                        key={k.id}
                                                        value={k.id}
                                                    >
                                                        {k.nama_koleksi}
                                                    </option>
                                                ))}
                                            </select>
                                            <TextInput
                                                type="number"
                                                min="1"
                                                value={koleksiItem.jumlah}
                                                onChange={(e) =>
                                                    handleKoleksiChange(
                                                        index,
                                                        "jumlah",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeKoleksiRow(index)
                                                }
                                                className="bg-red-500 text-white px-4 rounded"
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
                                Tambah Koleksi Baru
                            </button>
                        </div>
                    )}

                    {/* Tombol Simpan */}
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
