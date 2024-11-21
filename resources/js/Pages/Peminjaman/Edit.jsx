import React, { useState } from "react";
import { Head, Link, usePage, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import FieldGroup from "@/Components/Form/FieldGroup";
import TextInput from "@/Components/Form/TextInput";
import FileInput from "@/Components/Form/FileInput";
import SelectInput from "@/Components/Form/SelectInput";

const Edit = () => {
    const { peminjaman } = usePage().props || {}; // Getting data sent from the controller
    console.log(peminjaman);

    // Initialize form data
    const { data, setData, errors, post, put, processing } = useForm({
        items: peminjaman?.detailPeminjaman || [], // Use 'detailPeminjaman' here, since it contains the items
        keperluan: peminjaman?.keperluan || "",
        status: peminjaman?.status || "",  // Ensure 'status' is initialized properly
        tanggal_pinjam: peminjaman?.tanggal_pinjam || "",
        tanggal_jatuh_tempo: peminjaman?.tanggal_jatuh_tempo || "",
        users_id: peminjaman?.users?.id || "",
        identitas: peminjaman?.identitas || null,
        surat_permohonan: peminjaman?.surat_permohonan || null,
    });

    const [successMessage, setSuccessMessage] = useState("");

    // Handle file input change
    function handleFileChange(name, file) {
        console.log(name, file); // Debugging: ensure file is selected and passed correctly
        setData(name, file); // Update form state with selected file
    }

    // Handle form submit
    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();

        // Add form data to FormData object
        Object.entries(data).forEach(([key, value]) => {
            if (value instanceof File) {
                console.log(`Appending file: ${key}`, value); // Check if file is present
                formData.append(key, value); // Append file data
            } else if (Array.isArray(value)) {
                formData.append(key, JSON.stringify(value));
            } else if (value !== null) {
                formData.append(key, value);
            }
        });

        // Submit the form using `put` from Inertia
        put(route("peminjaman.update", peminjaman.id), formData, {
            onSuccess: () => {
                setSuccessMessage("Peminjaman berhasil diperbarui");
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    }

    return (
        <div>
            <Head title={`edit ${peminjaman?.users?.nama_lengkap || "unknown"}`} />
            <h1 className="mb-8 text-3xl font-bold">
                <Link href={route("peminjaman")} className="text-indigo-600 hover:text-indigo-700">
                    Edit Peminjaman
                </Link>
                <span className="mx-2 font-medium text-indigo-600">/</span>
                {peminjaman?.users?.nama_lengkap || "unknown"}
            </h1>

            <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid gap-6 sm:grid-cols-2">
                        <FieldGroup label="Nama Peminjam">
                            <TextInput
                                name="nama_lengkap"
                                value={peminjaman?.users?.nama_lengkap || "Nama tidak tersedia"}
                                readOnly
                                className="bg-gray-100"
                            />
                        </FieldGroup>

                        <FieldGroup label="Keperluan" error={errors.keperluan}>
                            <TextInput
                                type="text"
                                name="keperluan"
                                error={errors.keperluan}
                                value={data.keperluan}
                                onChange={(e) => setData("keperluan", e.target.value)}
                                required
                                readOnly
                                className="bg-gray-100"
                            />
                        </FieldGroup>
                       
                        <FieldGroup 
                        label="Status" 
                        name="status" 
                        error={errors.status}
                        >
                            <SelectInput
                                type="text"
                                name="status"
                                error={errors.status}
                                value={data.status} 
                                onChange={(e) => 
                                    setData("status", 
                                        e.target.value
                                    )
                                } 
                                options={[
                                    { value: "", label: "Pilih Status" }, 
                                    { value: "P", label: "Pengajuan" },
                                    { value: "SP", label: "Sedang di Pinjam" },
                                    { value: "T", label: "Terlambat" },
                                    { value: "DT", label: "Ditolak" },
                                    { value: "S", label: "Selesai" },
                                ]}
                                required
                               
                                
                            />
                        </FieldGroup>

                        <FieldGroup label="Tanggal Pinjam" error={errors.tanggal_pinjam}>
                            <TextInput
                                type="date"
                                name="tanggal_pinjam"
                                error={errors.tanggal_pinjam}
                                value={data.tanggal_pinjam}
                                onChange={(e) => setData("tanggal_pinjam", e.target.value)}
                                required
                                readOnly
                                className="bg-gray-100"
                            />
                        </FieldGroup>

                        <FieldGroup label="Tanggal Jatuh Tempo" error={errors.tanggal_jatuh_tempo}>
                            <TextInput
                                type="date"
                                name="tanggal_jatuh_tempo"
                                error={errors.tanggal_jatuh_tempo}
                                value={data.tanggal_jatuh_tempo}
                                onChange={(e) => setData("tanggal_jatuh_tempo", e.target.value)}
                                required
                                readOnly
                                className="bg-gray-100"
                            />
                        </FieldGroup>

                        {/* Input Identitas Diri */}
                        <FieldGroup label="Identitas Diri" name="identitas" error={errors.identitas}>
                            <FileInput
                                name="identitas"
                                error={errors.identitas}
                                existingFile={peminjaman.identitas}
                                onFileChange={(file) => handleFileChange("identitas", file)}
                                readOnly
                                className="bg-gray-100"
                            />
                        </FieldGroup>

                        {/* Input Surat Permohonan */}
                        <FieldGroup label="Surat Permohonan" name="surat_permohonan" error={errors.surat_permohonan}>
                            <FileInput
                                name="surat_permohonan"
                                error={errors.surat_permohonan}
                                existingFile={peminjaman.surat_permohonan}
                                onFileChange={(file) => handleFileChange("surat_permohonan", file)}
                                readOnly
                                className="bg-gray-100"
                            />
                        </FieldGroup>
                    </div>

                    <div className="mt-6">
                        <h3 className="font-semibold mb-2">Items yang Dipilih</h3>
                        <div className="overflow-x-auto bg-gray-50 rounded-lg shadow">
                            <table className="min-w-full table-auto">
                                <thead className="bg-indigo-600 text-white">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Gambar</th>
                                        <th className="px-4 py-2 text-left">Nama Koleksi</th>
                                        <th className="px-4 py-2 text-left">Jumlah Dipinjam</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.checkoutItems && data.checkoutItems.length > 0 ? (
                                        data.checkoutItems.map((item) => (
                                            <tr key={item.koleksi_id} className="border-b">
                                                <td className="px-4 py-2">
                                                    <img
                                                        src={item.gambar_satu}
                                                        alt={item.nama_koleksi}
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                </td>
                                                <td className="px-4 py-2">{item.nama_koleksi}</td>
                                                <td className="px-4 py-2">{item.jumlah_dipinjam}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="px-4 py-2 text-center text-gray-500">
                                                Tidak ada item yang dipilih
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-6 rounded-md mt-4 w-full sm:w-auto"
                        disabled={processing}
                    >
                        {processing ? "Loading..." : "Edit"}
                    </button>
                </form>
            </div>

            {successMessage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                        <p className="text-lg font-semibold text-green-600">{successMessage}</p>
                        <button
                            onClick={() => setSuccessMessage("")}
                            className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                        >
                            Oke
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

Edit.layout = (page) => <MainLayout children={page} />;

export default Edit;
