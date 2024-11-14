import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import LoadingButton from "@/Components/Button/LoadingButton";
import TextInput from "@/Components/Form/TextInput";
import FieldGroup from "@/Components/Form/FieldGroup";
import FileInput from "@/Components/Form/FileInput";
import { usePage, Inertia } from '@inertiajs/react'; // Import usePage and Inertia

const Create = () => {
    const { users_id, koleksi } = usePage().props; // Get users_id and koleksi data from the page props

    const { data, setData, errors, post, processing } = useForm({
        users_id: users_id || "", // Default to an empty string if users_id is undefined
        tanggal_pinjam: '',
        tanggal_jatuh_tempo: '',
        identitas: null,
        surat_permohonan: null,
        items: [], // Make sure items array is initialized, assuming you will pass it via props
    });

    // State for notification modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a FormData object to send the files and form data
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value) formData.append(key, value); // Append only if value is not null
        });

        post(route("peminjaman.store"), {
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data", // Ensure the correct content type
            },
            onSuccess: () => {
                setNotificationMessage("Peminjaman berhasil dibuat!");
                setIsModalOpen(true); // Open modal on success
            },
            onError: () => {
                setNotificationMessage("Terjadi kesalahan saat membuat peminjaman.");
                setIsModalOpen(true); // Open modal on error
            },
        });
    };

    // Close modal and go back
    const closeModal = () => {
        setIsModalOpen(false);
        Inertia.back(); // Navigate back to previous page
    };

    // Handle file change (for identitas and surat_permohonan)
    const handleFileChange = (name, file) => {
        setData(name, file);
    };

    // Handle adding items to the peminjaman
    const handleAddItem = (item) => {
        const newItem = {
            id: item.id,
            nama_koleksi: item.nama_koleksi,
            jumlah_dipinjam: 1, // Default quantity
            image_satu: item.image_satu,
        };

        // Add item to the items array in form data
        setData("items", [...data.items, newItem]);
    };

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">
                <span className="font-medium text-indigo-600">Create Peminjaman</span>
            </h1>
            <div className="max-w-3xl mx-auto overflow-hidden bg-white rounded shadow">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid gap-10 p-10 lg:grid-cols-2">
                        {/* Input fields */}
                        <FieldGroup label="Nama Peminjam" error={errors.users_id}>
                            <TextInput
                                name="users_id"
                                error={errors.users_id}
                                value={data.users_id}
                                onChange={(e) => setData("users_id", e.target.value)}
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
                            />
                        </FieldGroup>

                        <FieldGroup label="Identitas Diri" name="identitas" error={errors.identitas}>
                            <FileInput
                                name="identitas"
                                error={errors.identitas}
                                onFileChange={(file) => handleFileChange("identitas", file)}
                            />
                        </FieldGroup>

                        <FieldGroup label="Surat Permohonan" name="surat_permohonan" error={errors.surat_permohonan}>
                            <FileInput
                                name="surat_permohonan"
                                error={errors.surat_permohonan}
                                onFileChange={(file) => handleFileChange("surat_permohonan", file)}
                            />
                        </FieldGroup>
                    </div>

                    {/* Table for showing available koleksi */}
                    <div className="mt-6">
                        <h3 className="font-semibold mb-2">Koleksi yang Tersedia</h3>
                        <div className="overflow-x-auto bg-gray-50 rounded-lg shadow">
                            <table className="min-w-full table-auto">
                                <thead className="bg-indigo-600 text-white">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Nama Koleksi</th>
                                        <th className="px-4 py-2 text-left">Jumlah Tersedia</th>
                                        <th className="px-4 py-2 text-left">Gambar</th>
                                        <th className="px-4 py-2 text-left">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {koleksi && koleksi.length > 0 ? (
                                        koleksi.map((item) => (
                                            <tr key={item.id} className="border-b">
                                                <td className="px-4 py-2">{item.nama_koleksi}</td>
                                                <td className="px-4 py-2">{item.jumlah_tersedia}</td>
                                                <td className="px-4 py-2">
                                                    <img
                                                        src={item.image_satu}
                                                        alt={item.nama_koleksi}
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                </td>
                                                <td className="px-4 py-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleAddItem(item)}
                                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                                    >
                                                        Tambah
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
                                                Tidak ada koleksi yang tersedia
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Table for selected items */}
                    <div className="mt-6">
                        <h3 className="font-semibold mb-2">Items yang Dipilih</h3>
                        <div className="overflow-x-auto bg-gray-50 rounded-lg shadow">
                            <table className="min-w-full table-auto">
                                <thead className="bg-indigo-600 text-white">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Nama Koleksi</th>
                                        <th className="px-4 py-2 text-left">Jumlah Dipinjam</th>
                                        <th className="px-4 py-2 text-left">Gambar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.items && data.items.length > 0 ? (
                                        data.items.map((item) => (
                                            <tr key={item.id} className="border-b">
                                                <td className="px-4 py-2">{item.nama_koleksi}</td>
                                                <td className="px-4 py-2">{item.jumlah_dipinjam}</td>
                                                <td className="px-4 py-2">
                                                    <img
                                                        src={item.image_satu}
                                                        alt={item.nama_koleksi}
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                </td>
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

                    <div className="flex items-center justify-between px-8 py-4 bg-gray-100 border-t border-gray-200">
                        <LoadingButton
                            loading={processing}
                            type="submit"
                            className="ml-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-900 transition"
                            disabled={processing}
                        >
                            Submit
                        </LoadingButton>
                    </div>
                </form>
            </div>

            {/* Modal for notifications */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-bold mb-4">{notificationMessage}</h3>
                        <button
                            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-900 transition"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

Create.layout = (page) => (
    <MainLayout title="Tambah Peminjaman" children={page} />
);

export default Create;
