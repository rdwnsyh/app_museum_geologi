import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import LoadingButton from "@/Components/Button/LoadingButton";
import TextInput from "@/Components/Form/TextInput";
import SelectInput from "@/Components/Form/SelectInput";
import FieldGroup from "@/Components/Form/FieldGroup";
import FileInput from "@/Components/Form/FileInput";
import Select from "react-select";

const Create = ({ koleksi, user }) => {
    const { data, setData, errors, post, processing } = useForm({
        users_id: user?.id || "",
        keperluan: "",
        pesan: "",
        tanggal_pinjam: "",
        tanggal_jatuh_tempo: "",
        identitas: null,
        surat_permohonan: null,
        koleksi: [],
    });

    const [formErrors, setFormErrors] = useState({}); // Untuk validasi frontend

    // Fungsi untuk menambah koleksi
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (Array.isArray(data[key])) {
                data[key].forEach((item, index) => {
                    Object.keys(item).forEach((subKey) => {
                        formData.append(
                            `${key}[${index}][${subKey}]`,
                            item[subKey]
                        );
                    });
                });
            } else if (data[key] instanceof File) {
                formData.append(key, data[key]);
            } else if (data[key] !== null) {
                formData.append(key, data[key]);
            }
        });

        post(route("peminjaman.store"), {
            data: formData,
            forceFormData: true,
        });
    };

    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">
                <Link
                    href={route("peminjaman")}
                    className="text-indigo-600 hover:text-indigo-700"
                >
                    Peminjaman
                </Link>
                <span className="font-medium text-indigo-600"> /</span> Create
            </h1>
            <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid gap-8 p-8 lg:grid-cols-2">
                        {/* Nama Lengkap Pengguna */}
                        <FieldGroup
                            label="Nama Lengkap"
                            name="nama_lengkap"
                            error={errors.users_id}
                        >
                            <div className="p-2 bg-gray-100 border border-gray-300 rounded">
                                {user?.nama_lengkap || "Nama Pengguna"}
                            </div>
                        </FieldGroup>

                        {/* Input untuk Keperluan */}
                        <FieldGroup
                            label="Keperluan"
                            name="keperluan"
                            error={formErrors.keperluan || errors.keperluan}
                        >
                            <SelectInput
                                name="keperluan"
                                error={formErrors.keperluan || errors.keperluan}
                                value={data.keperluan}
                                onChange={(e) =>
                                    setData("keperluan", e.target.value)
                                }
                                options={[
                                    { value: "", label: "Pilih Keperluan" },
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

                        {/* Input untuk Pesan */}
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
                        </FieldGroup>

                        {/* Input untuk Tanggal Pinjam */}
                        <FieldGroup
                            label="Tanggal Pinjam"
                            name="tanggal_pinjam"
                            error={
                                formErrors.tanggal_pinjam ||
                                errors.tanggal_pinjam
                            }
                        >
                            <TextInput
                                name="tanggal_pinjam"
                                type="date"
                                error={
                                    formErrors.tanggal_pinjam ||
                                    errors.tanggal_pinjam
                                }
                                value={data.tanggal_pinjam}
                                onChange={(e) =>
                                    setData("tanggal_pinjam", e.target.value)
                                }
                            />
                        </FieldGroup>

                        {/* Input untuk Tanggal Jatuh Tempo */}
                        <FieldGroup
                            label="Tanggal Jatuh Tempo"
                            name="tanggal_jatuh_tempo"
                            error={
                                formErrors.tanggal_jatuh_tempo ||
                                errors.tanggal_jatuh_tempo
                            }
                        >
                            <TextInput
                                name="tanggal_jatuh_tempo"
                                type="date"
                                error={
                                    formErrors.tanggal_jatuh_tempo ||
                                    errors.tanggal_jatuh_tempo
                                }
                                value={data.tanggal_jatuh_tempo}
                                onChange={(e) =>
                                    setData(
                                        "tanggal_jatuh_tempo",
                                        e.target.value
                                    )
                                }
                            />
                        </FieldGroup>

                        {/* Input untuk Identitas */}
                        <FieldGroup
                            label="Identitas"
                            name="identitas"
                            error={formErrors.identitas || errors.identitas}
                        >
                            <FileInput
                                name="identitas"
                                error={formErrors.identitas || errors.identitas}
                                onFileChange={(file) =>
                                    handleFileChange("identitas", file)
                                }
                            />
                        </FieldGroup>

                        {/* Input untuk Surat Permohonan */}
                        <FieldGroup
                            label="Surat Permohonan"
                            name="surat_permohonan"
                            error={
                                formErrors.surat_permohonan ||
                                errors.surat_permohonan
                            }
                        >
                            <FileInput
                                name="surat_permohonan"
                                error={
                                    formErrors.surat_permohonan ||
                                    errors.surat_permohonan
                                }
                                onFileChange={(file) =>
                                    handleFileChange("surat_permohonan", file)
                                }
                            />
                        </FieldGroup>
                    </div>

                    {/* Tabel Koleksi */}
                    <div className="p-8">
                        <h3 className="mb-4 text-xl font-semibold">Koleksi</h3>
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
                                            value={koleksiItem.jumlah_dipinjam}
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

                    {/* Tombol Kirim */}
                    <div className="flex justify-end mt-8">
                        <LoadingButton
                            loading={processing}
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-500 rounded"
                        >
                            Kirim
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

Create.layout = (page) => <MainLayout children={page} />;

export default Create;
