import { useState } from "react";
import { useForm } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar";
import TextInput from "@/Components/Form/TextInput";
import FieldGroup from "@/Components/Form/FieldGroup";
import FileInput from "@/Components/Form/FileInput";

const Pinjam = ({ checkoutItems = [], user }) => {
    // Initialize form data using useForm from Inertia
    const { data, setData, post, errors, processing } = useForm({
        items: checkoutItems, // Use the items passed from the backend
        tanggal_pinjam: "",
        tanggal_jatuh_tempo: "",
        users_id: user.id, // Assuming `user` object contains `id` and `name`
        identitas: null,
        surat_permohonan: null,
    });

    // Handle file input change
    const handleFileChange = (fieldName, file) => {
        setData(fieldName, file);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare the detail_peminjaman array
        const detailPeminjaman = data.items.map((item) => ({
            koleksi_id: item.koleksi_id, // Ensure each item has a `koleksi_id` field
            jumlah_dipinjam: item.jumlah_dipinjam,
            kondisi: item.kondisi, // If available in the item data, otherwise handle it
        }));

        // Add the `detail_peminjaman` data to the form data
        const formData = {
            ...data,
            detail_peminjaman: detailPeminjaman,
        };

        post(route("peminjaman.checkout"), {
            data: formData,
            onSuccess: () => {
                alert("Peminjaman berhasil dibuat!");
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 flex-grow">
                <h2 className="text-2xl font-bold mb-6">Form Peminjaman</h2>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md p-6 rounded-md max-w-3xl mx-auto"
                >
                    <div className="grid gap-6 sm:grid-cols-2">
                        {/* Display the user name */}
                        <FieldGroup label="Nama Peminjam">
                            <TextInput
                                name="nama_lengkap"
                                value={user.nama_lengkap} // Display user name
                                readOnly
                                className="bg-gray-100"
                            />
                        </FieldGroup>

                        {/* Input fields */}
                        <FieldGroup
                            label="Tanggal Pinjam"
                            error={errors.tanggal_pinjam}
                        >
                            <TextInput
                                type="date"
                                name="tanggal_pinjam"
                                error={errors.tanggal_pinjam}
                                value={data.tanggal_pinjam}
                                onChange={(e) =>
                                    setData("tanggal_pinjam", e.target.value)
                                }
                                required
                            />
                        </FieldGroup>

                        <FieldGroup
                            label="Tanggal Jatuh Tempo"
                            error={errors.tanggal_jatuh_tempo}
                        >
                            <TextInput
                                type="date"
                                name="tanggal_jatuh_tempo"
                                error={errors.tanggal_jatuh_tempo}
                                value={data.tanggal_jatuh_tempo}
                                onChange={(e) =>
                                    setData(
                                        "tanggal_jatuh_tempo",
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </FieldGroup>

                        <FieldGroup
                            label="Identitas Diri"
                            error={errors.identitas}
                        >
                            <FileInput
                                name="identitas"
                                error={errors.identitas}
                                onFileChange={(file) =>
                                    handleFileChange("identitas", file)
                                }
                            />
                        </FieldGroup>

                        <FieldGroup
                            label="Surat Permohonan"
                            error={errors.surat_permohonan}
                        >
                            <FileInput
                                name="surat_permohonan"
                                error={errors.surat_permohonan}
                                onFileChange={(file) =>
                                    handleFileChange("surat_permohonan", file)
                                }
                            />
                        </FieldGroup>
                    </div>

                    {/* Table for selected items */}
                    <div className="mt-6">
                        <h3 className="font-semibold mb-2">
                            Items yang Dipilih
                        </h3>
                        <div className="overflow-x-auto bg-gray-50 rounded-lg shadow">
                            <table className="min-w-full table-auto">
                                <thead className="bg-indigo-600 text-white">
                                    <th className="px-4 py-2 text-left">
                                        Gambar
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Nama Koleksi
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Jumlah Dipinjam
                                    </th>
                                </thead>
                                <tbody>
                                    {data.items && data.items.length > 0 ? (
                                        data.items.map((item) => (
                                            <tr
                                                key={item.koleksi_id}
                                                className="border-b"
                                            >
                                                <td className="px-4 py-2">
                                                    <img
                                                        src={item.gambar_satu}
                                                        alt={item.nama_koleksi}
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    {item.nama_koleksi}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {item.jumlah_dipinjam}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="px-4 py-2 text-center text-gray-500"
                                            >
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
                        {processing ? "Loading..." : "Pinjam"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Pinjam;
