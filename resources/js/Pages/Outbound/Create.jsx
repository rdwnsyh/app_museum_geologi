import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import LoadingButton from "@/Components/Button/LoadingButton";
import TextInput from "@/Components/Form/TextInput";
import FieldGroup from "@/Components/Form/FieldGroup";
import FileInput from "@/Components/Form/FileInput";
import Select from "react-select";

const Create = ({ koleksi, peminjaman, user }) => {
    const [isImport, setIsImport] = useState(false); // Toggle Manual vs Import
    const [importedKoleksi, setImportedKoleksi] = useState([]); // Untuk menyimpan koleksi dari peminjaman yang diimpor

    const { data, setData, errors, post, processing } = useForm({
        users_id: user?.id || "",
        no_referensi: "",
        keterangan: "",
        pesan: "",
        tanggal: "",
        status: "Outbound",
        lampiran: null,
        peminjaman_id: "", // Untuk proses import
        koleksi: [], // Untuk proses manual
    });

    const addKoleksiRow = () => {
        setData("koleksi", [
            ...data.koleksi,
            { koleksi_id: "", jumlah_dipinjam: 1, nama_koleksi: "" },
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
            const selectedKoleksi = koleksi.find((item) => item.id === value);
            newKoleksi[index].nama_koleksi = selectedKoleksi
                ? selectedKoleksi.nama_koleksi
                : "";
        }

        setData("koleksi", newKoleksi);
    };

    const handleFileChange = (name, file) => {
        setData(name, file || null);
    };

    const handleImportPeminjaman = (id) => {
        const selectedPeminjaman = peminjaman.find(
            (item) => item.id === parseInt(id)
        );
        if (selectedPeminjaman) {
            setImportedKoleksi(
                selectedPeminjaman.detail_peminjaman.map((detail) => ({
                    nama_koleksi:
                        detail.koleksi?.nama_koleksi || "Nama tidak tersedia",
                    jumlah_dipinjam: detail.jumlah_dipinjam,
                }))
            );
            setData("peminjaman_id", id);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isImport) {
            // Proses Import
            post(route("outbound.import"), {
                preserveScroll: true,
            });
        } else {
            // Proses Manual
            post(route("outbound.store"), {
                preserveScroll: true,
            });
        }
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
                    Import Data Peminjaman
                </button>
            </div>

            <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid gap-8 p-8 lg:grid-cols-2">
                        <FieldGroup label="Nama Lengkap" name="nama_lengkap">
                            <div className="p-2 bg-gray-100 border border-gray-300 rounded">
                                {user?.nama_lengkap || "Nama Pengguna"}
                            </div>
                        </FieldGroup>

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
                            />
                        </FieldGroup>

                        <FieldGroup
                            label="Keterangan"
                            name="keterangan"
                            error={errors.keterangan}
                        >
                            <TextInput
                                name="keterangan"
                                value={data.keterangan}
                                onChange={(e) =>
                                    setData("keterangan", e.target.value)
                                }
                                error={errors.keterangan}
                            />
                        </FieldGroup>
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
                            label="Tanggal"
                            name="tanggal"
                            error={errors.tanggal}
                        >
                            <TextInput
                                name="tanggal"
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
                                label="Pilih Peminjaman"
                                name="peminjaman_id"
                                error={errors.peminjaman_id}
                            >
                                <select
                                    value={data.peminjaman_id}
                                    onChange={(e) =>
                                        handleImportPeminjaman(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded p-2"
                                >
                                    <option value="">Pilih Peminjaman</option>
                                    {peminjaman.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.keperluan} -{" "}
                                            {item.tanggal_pinjam}
                                        </option>
                                    ))}
                                </select>
                            </FieldGroup>
                        ) : (
                            <FieldGroup label="Lampiran" name="lampiran">
                                <FileInput
                                    name="lampiran"
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
                                Koleksi yang Dipinjam
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300 rounded">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="px-4 py-2 border border-gray-300 text-left font-semibold">
                                                Nama Koleksi
                                            </th>
                                            <th className="px-4 py-2 border border-gray-300 text-left font-semibold">
                                                Jumlah Dipinjam
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
                                                                item.jumlah_dipinjam
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
                                                    dipinjam.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="p-8">
                            <h3 className="mb-4 text-xl font-semibold">
                                Koleksi
                            </h3>
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
                                                value={
                                                    koleksiItem.jumlah_dipinjam
                                                }
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
                    )}

                    <div className="flex justify-end mt-8">
                        <LoadingButton
                            loading={processing}
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-500 rounded"
                        >
                            {isImport ? "Import Data" : "Submit"}
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

Create.layout = (page) => <MainLayout children={page} />;

export default Create;
