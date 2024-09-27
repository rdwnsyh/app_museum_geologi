import React from "react";
import { Link, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import LoadingButton from "@/Components/Button/LoadingButton";
import TextInput from "@/Components/Form/TextInput";
import SelectInput from "@/Components/Form/SelectInput";
import FieldGroup from "@/Components/Form/FieldGroup";
import FileInput from "@/Components/Form/FileInput";

const Create = () => {
    const { data, setData, errors, post, processing } = useForm({
        koleksi_id: "",
        peminjam: "",
        keperluan: "",
        tanggal_pinjam: "",
        surat_permohonan: "",
        identitas_diri: "",
        jenis_koleksi: "",
        status_peminjaman: "",
    });

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
                // Handle success (e.g., redirect)
            },
            onError: (errors) => {
                // Handle errors
            },
        });
    };

    const handleFileChange = (name, file) => {
        setData(name, file);
    };

    
    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">
                <Link
                    href={route("kelolakoleksibatuan")}
                    className="text-indigo-600 hover:text-indigo-700"
                >
                    Peminjaman
                </Link>
                <span className="font-medium text-indigo-600"> /</span> Create
            </h1>
            <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid gap-10 p-10 lg:grid-cols-2">
                        {/** Input fields */}
                        <FieldGroup label="Nama Peminjam" error={errors.peminjam}>
                            <TextInput
                                name="peminjam"
                                error={errors.peminjam}
                                value={data.peminjam}
                                onChange={(e) => setData("peminjam", e.target.value)}
                                required
                            />
                        </FieldGroup>

                        <FieldGroup label="Keperluan" error={errors.keperluan}>
                            <TextInput
                                name="keperluan"
                                error={errors.keperluan}
                                value={data.keperluan}
                                onChange={(e) => setData("keperluan", e.target.value)}
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

                        <FieldGroup
                                    label="Identitas Diri"
                                    name="identitas_diri"
                                    error={errors.identitas_diri}
                                >
                                    <FileInput
                                        name="identitas_diri"
                                        error={errors.identitas_diri}
                                        onFileChange={(file) =>
                                            handleFileChange("identitas_diri", file)
                                        }
                                    />
                        </FieldGroup>

                        <FieldGroup
                                    label="Surat Permohonan"
                                    name="surat_permohonan"
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

                        <FieldGroup 
                        label="Jenis Koleksi" 
                        error={errors.jenis_koleksi}>

                            <SelectInput
                                name="jenis_koleksi"
                                error={errors.jenis_koleksi}
                                value={data.jenis_koleksi}
                                onChange={(e) => setData("jenis_koleksi", e.target.value)}
                                options={[
                                    { value: "", label: "" },
                                    { value: "BA", label: "Batuan" },
                                    { value: "FO", label: "Fosil" },
                                    { value: "SD", label: "Sumber Daya Geologi" },
                                    
                                ]}
                            />
                        </FieldGroup>
                        
                        <FieldGroup label="Status Peminjaman" error={errors.status_peminjaman}>
                            <SelectInput
                                name="status_peminjaman"
                                error={errors.status_peminjaman}
                                value={data.status_peminjaman}
                                onChange={(e) => setData("status_peminjaman", e.target.value)}
                                options={[
                                    { value: "", label: "" },
                                    { value: "PE", label: "Pengajuan" },
                                    { value: "DP", label: "Dipinjam" },
                                    { value: "DT", label: "Ditolak" },
                                    { value: "TE", label: "Terlambat" },
                                    { value: "SE", label: "Selesai" },
                                ]}
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
        </div>
    );
};

Create.layout = (page) => (
    <MainLayout title="Tambah Kelola Koleksi Batuan" children={page} />
);

export default Create;
