import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import LoadingButton from "@/Components/Button/LoadingButton";
import TextInput from "@/Components/Form/TextInput";
import FieldGroup from "@/Components/Form/FieldGroup";
import FileInput from "@/Components/Form/FileInput";
import Select from "react-select";

const Create = ({ user, pengembalian, koleksiBaru }) => {
    const [isImport, setIsImport] = useState(false);
    const [importedKoleksi, setImportedKoleksi] = useState([]);

    const { data, setData, post, processing, errors } = useForm({
        users_id: user?.id || "",
        no_referensi: "",
        keterangan: "",
        pesan: "",
        tanggal: "",
        status: "Inbound",
        lampiran: null,
        pengembalian_id: "",
        koleksi: [],
    });

    const addKoleksiRow = () => {
        setData("koleksi", [
            ...data.koleksi,
            { koleksi_id: "", jumlah_dipinjam: 1, nama_koleksi: "" },
        ]);
    };

    const removeKoleksiRow = (index) => {
        const updatedKoleksi = [...data.koleksi];
        updatedKoleksi.splice(index, 1);
        setData("koleksi", updatedKoleksi);
    };

    const handleKoleksiChange = (index, field, value) => {
        const updatedKoleksi = [...data.koleksi];
        updatedKoleksi[index][field] = value;

        if (field === "koleksi_id") {
            const selected = koleksiBaru.find((item) => item.id === value);
            updatedKoleksi[index].nama_koleksi = selected
                ? selected.nama_koleksi
                : "";
        }

        setData("koleksi", updatedKoleksi);
    };

    const handleFileChange = (name, file) => {
        setData(name, file || null);
    };

    // Mengambil data koleksi dari pengembalian
    const handlePengembalianChange = (id) => {
        setData("pengembalian_id", id);

        const selectedPengembalian = pengembalian.find(
            (item) => item.id === parseInt(id)
        );

        if (selectedPengembalian?.detail_peminjaman) {
            setImportedKoleksi(selectedPengembalian.detail_peminjaman);
        } else {
            setImportedKoleksi([]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isImport) {
            // Proses Import
            post(route("inbound.import"), {
                preserveScroll: true,
            });
        } else {
            // Proses Manual
            post(route("inbound.store"), {
                preserveScroll: true,
            });
        }
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

                        {/* Import Koleksi */}
                        {isImport ? (
                            <FieldGroup
                                label="Pilih Pengembalian"
                                name="pengembalian_id"
                            >
                                <select
                                    value={data.pengembalian_id}
                                    onChange={(e) =>
                                        handlePengembalianChange(e.target.value)
                                    }
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="">Pilih Pengembalian</option>
                                    {pengembalian.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.nama_peminjam} -{" "}
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
                            {/* Field Manual Input */}
                            {!isImport ? (
                                <div className="p-0">
                                    <h3 className="mb-4 text-xl font-semibold">
                                        Koleksi Manual
                                    </h3>
                                    {data.koleksi.map((koleksiItem, index) => (
                                        <div
                                            key={index}
                                            className="mb-4 grid grid-cols-3 gap-4"
                                        >
                                            <Select
                                                options={koleksiBaru.map(
                                                    (k) => ({
                                                        value: k.id,
                                                        label: k.nama_koleksi,
                                                    })
                                                )}
                                                value={
                                                    koleksiItem.koleksi_id
                                                        ? {
                                                              value: koleksiItem.koleksi_id,
                                                              label: koleksiItem.nama_koleksi,
                                                          }
                                                        : null
                                                }
                                                onChange={(option) =>
                                                    handleKoleksiChange(
                                                        index,
                                                        "koleksi_id",
                                                        option.value
                                                    )
                                                }
                                                placeholder="Pilih Koleksi"
                                            />
                                            <TextInput
                                                type="number"
                                                min="1"
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
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addKoleksiRow}
                                        className="py-2 px-4 bg-green-500 text-white rounded"
                                    >
                                        Tambah Koleksi
                                    </button>
                                </div>
                            ) : null}
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
