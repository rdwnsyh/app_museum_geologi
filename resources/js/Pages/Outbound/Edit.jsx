import React from "react";
import { usePage, Head, Link, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import LoadingButton from "@/Components/Button/LoadingButton";
import TextInput from "@/Components/Form/TextInput";
import FieldGroup from "@/Components/Form/FieldGroup";
import FileInput from "@/Components/Form/FileInput";

const Edit = () => {
    const { outbound, koleksi } = usePage().props || {}; // Data dari server
    const { data, setData, errors, put, processing } = useForm({
        users_id: outbound?.users_id || [],
        no_referensi: outbound?.no_referensi || null,
        keterangan: outbound?.keterangan || "",
        pesan: outbound?.pesan || "",
        tanggal: outbound?.tanggal || "",
        status: outbound?.status || "",
        lampiran: outbound?.lampiran || null,
        koleksi: outbound?.koleksi || [], // Default ke array kosong
    });
    // console.log("Data Koleksi:", data.koleksi);

    const handleKoleksiChange = (index, field, value) => {
        const updatedKoleksi = [...data.koleksi];
        updatedKoleksi[index][field] = value;
        setData("koleksi", updatedKoleksi);
    };

    const handleFileChange = (name, file) => {
        setData(name, file || null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("outbound.update", outbound.id));
    };

    return (
        <div>
            <Head title={`Edit Outbound: ${outbound?.users?.nama_lengkap}`} />

            <h1 className="mb-8 text-3xl font-bold">
                <Link
                    href={route("outbound")}
                    className="text-indigo-600 hover:text-indigo-700"
                >
                    Outbound
                </Link>
                <span className="font-medium text-indigo-600"> / </span> Edit
            </h1>

            <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-8 p-8 lg:grid-cols-2">
                        {/* Nama Pembuat */}
                        <FieldGroup label="Nama Pembuat" name="users_id">
                            <div className="p-2 bg-gray-100 border rounded">
                                {outbound?.users?.nama_lengkap || "N/A"}
                            </div>
                        </FieldGroup>

                        {/* Input untuk No Referensi */}
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

                        {/* Input untuk Keterangan */}
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
                                className="w-full p-2 border rounded"
                                rows="4"
                            />
                        </FieldGroup>

                        {/* Input untuk Pesan */}
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

                        {/* Input untuk Tanggal */}
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

                        {/* Input untuk Status */}
                        <FieldGroup label="Status" name="status">
                            <div className="p-2 bg-gray-100 border rounded">
                                {data.status}
                            </div>
                        </FieldGroup>

                        {/* Input untuk Lampiran */}
                        <FieldGroup
                            label="Lampiran"
                            name="lampiran"
                            error={errors.lampiran}
                        >
                            <FileInput
                                onFileChange={(file) =>
                                    handleFileChange("lampiran", file)
                                }
                                error={errors.lampiran}
                            />
                        </FieldGroup>
                    </div>

                    {/* Tabel Koleksi */}
                    <div className="p-8">
                        <h3 className="text-xl font-semibold mb-4">Koleksi</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-300 rounded">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">
                                            Koleksi
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b">
                                            Jumlah Dipinjam
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.koleksi && data.koleksi.length > 0 ? (
                                        data.koleksi.map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-2 border">
                                                    <select
                                                        className="w-full p-2 border rounded"
                                                        value={
                                                            item.koleksi_id ||
                                                            ""
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
                                                            Pilih Koleksi
                                                        </option>
                                                        {/* {koleksi.map((k) => (
                                                            <option
                                                                key={k.id}
                                                                value={k.id}
                                                            >
                                                                {k.nama_koleksi}
                                                            </option>
                                                        ))} */}
                                                    </select>
                                                </td>
                                                <td className="px-4 py-2 border">
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={
                                                            item.jumlah_dipinjam ||
                                                            ""
                                                        }
                                                        onChange={(e) =>
                                                            handleKoleksiChange(
                                                                index,
                                                                "jumlah_dipinjam",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full p-2 border rounded"
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="2"
                                                className="text-center px-4 py-2 text-gray-500"
                                            >
                                                Tidak ada data koleksi yang
                                                tersedia
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex justify-end mt-8 px-8">
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

Edit.layout = (page) => <MainLayout>{page}</MainLayout>;

export default Edit;
