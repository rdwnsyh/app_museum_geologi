import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import LoadingButton from "@/Components/Button/LoadingButton";
import TextInput from "@/Components/Form/TextInput";
import FieldGroup from "@/Components/Form/FieldGroup";
import FileInput from "@/Components/Form/FileInput";
import { usePage } from '@inertiajs/react'; // Import usePage hook

const Create = () => {
    const { user_id } = usePage().props;

    const { data, setData, errors, post, processing } = useForm({
        users_id: user_id, // Set user_id secara otomatis dari props
        tanggal_pinjam: '',
        tanggal_jatuh_tempo: '',
        identitas: null,
        surat_permohonan: null,
    });

    // State untuk modal notifikasi
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        post(route("peminjaman.store"), {
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onSuccess: () => {
                // Tampilkan modal notifikasi jika sukses
                setNotificationMessage("Peminjaman berhasil dibuat!");
                setIsModalOpen(true);
            },
            onError: (errors) => {
                // Tampilkan modal notifikasi jika ada error
                setNotificationMessage("Terjadi kesalahan saat membuat peminjaman.");
                setIsModalOpen(true);
            },
        });
    };

    const closeModal = () => {
      setIsModalOpen(false);
      Inertia.back();
    };

    const handleFileChange = (name, file) => {
        setData(name, file);
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

            {/* Modal notifikasi */}
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
