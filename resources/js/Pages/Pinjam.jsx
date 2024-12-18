import { useState } from "react";
import { useForm } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar";
import TextInput from "@/Components/Form/TextInput";
import FieldGroup from "@/Components/Form/FieldGroup";
import FileInput from "@/Components/Form/FileInput";
import SelectInput from "@/Components/Form/SelectInput";

const Pinjam = ({ checkoutItems = [], user }) => {
    const { data, setData, post, errors, processing } = useForm({
        checkoutItems, // Gunakan items yang dikirim dari backend
        tanggal_pinjam: "",
        tanggal_jatuh_tempo: "",
        keperluan: "",
        users_id: user.id, // Asumsi user memiliki properti id dan name
        identitas: null,
        surat_permohonan: null,
    });

    // Mengelola perubahan file input
    const handleFileChange = (fieldName, file) => {
        setData(fieldName, file);
    };

    // Mengelola pengiriman form
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validasi wajib untuk identitas dan surat permohonan
        if (!data.identitas) {
            alert("Identitas wajib diunggah!");
            return;
        }
        if (!data.surat_permohonan) {
            alert("Surat permohonan wajib diunggah!");
            return;
        }

        // Menyiapkan array detail_peminjaman
        const detailPeminjaman = data.checkoutItems.map((item) => ({
            koleksi_id: item.koleksi_id,
            jumlah_dipinjam: item.jumlah_dipinjam,
            kondisi: item.kondisi ?? "Baik", // Kondisi default 'Baik'
        }));

        // Menambahkan data detail_peminjaman ke data form
        const formData = new FormData();
        formData.append("keperluan", data.keperluan);
        formData.append("tanggal_pinjam", data.tanggal_pinjam);
        formData.append("tanggal_jatuh_tempo", data.tanggal_jatuh_tempo);
        formData.append("users_id", data.users_id);
        formData.append("identitas", data.identitas);
        formData.append("surat_permohonan", data.surat_permohonan);
        formData.append("checkoutItems", JSON.stringify(detailPeminjaman)); // Mengirim detail peminjaman sebagai string JSON

        // Mengirim data form ke server
        post(route("keranjang.checkout"), {
            data: formData,
            forceFormData: true,
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
                        {/* Menampilkan nama pengguna */}
                        <FieldGroup label="Nama Peminjam">
                            <TextInput
                                name="nama_lengkap"
                                value={user.nama_lengkap} // Menampilkan nama pengguna
                                readOnly
                                className="bg-gray-100"
                            />
                        </FieldGroup>

                        {/* Input Keperluan */}
                        <FieldGroup label="Keperluan" error={errors.keperluan}>
                            <SelectInput
                                name="keperluan"
                                error={errors.keperluan}
                                value={data.keperluan}
                                onChange={(e) =>
                                    setData("keperluan", e.target.value)
                                }
                                options={[
                                    { value: "", label: "Pilih keperluan" },
                                    {
                                        value: "Penelitian",
                                        label: "Penelitian",
                                    },
                                    { value: "Pameran", label: "Pameran" },
                                    { value: "Perbaikan", label: "Perbaikan" },
                                    {
                                        value: "Dan Lain-Lain",
                                        label: "Lain-Lain",
                                    },
                                ]}
                            />
                        </FieldGroup>

                        {/* Input Tanggal Pinjam */}
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

                        {/* Input Tanggal Jatuh Tempo */}
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

                        {/* Input Identitas Diri */}
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

                        {/* Input Surat Permohonan */}
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

                    {/* Tabel item yang dipilih */}
                    <div className="mt-6">
                        <h3 className="font-semibold mb-2">
                            Items yang Dipilih
                        </h3>
                        <div className="overflow-x-auto bg-gray-50 rounded-lg shadow">
                            <table className="min-w-full table-auto">
                                <thead className="bg-indigo-600 text-white">
                                    <tr>
                                        <th className="px-4 py-2 text-left">
                                            Gambar
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Nama Koleksi
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Jumlah Dipinjam
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.checkoutItems &&
                                    data.checkoutItems.length > 0 ? (
                                        data.checkoutItems.map((item) => (
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
                                                colSpan="3"
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
