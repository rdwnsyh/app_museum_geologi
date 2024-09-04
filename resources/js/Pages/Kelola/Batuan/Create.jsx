import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import LoadingButton from "@/Components/Button/LoadingButton";
import TextInput from "@/Components/Form/TextInput";
import SelectInput from "@/Components/Form/SelectInput";
import FieldGroup from "@/Components/Form/FieldGroup";
import FileInput from "@/Components/Form/FileInput";

const Create = () => {
    
    const { data, setData, errors, post, processing } = useForm({
        // halaman 1 admin
        kategori_bmn: "",
        nup_bmn: "",
        tipe_bmn: "",
        no_awal: "",
        satuan: "",
        kelompok_koleksi: "",
        jenis_koleksi: "",
        ruang_penyimpanan: "",
        lokasi_penyimpanan: "",
        lantai: "",
        no_lajur: "",
        no_lemari: "",
        no_laci: "",
        no_slot: "",

        // halaman 2
        kondisi: "",
        nama_koleksi: "",
        deskripsi_koleksi: "",
        keterangan_koleksi: "",
        umur_geologi: "",
        nama_formasi: "",
        ditemukan: "",
        pulau: "",
        provinsi: "",
        kota: "",
        alamat: "",
        latitude: "",
        longitude: "",
        elevasi: "",
        peta: "",
        skala: "",
        lembar_peta: "",

        // halaman 3
        cara_peroleh: "",
        thn_peroleh: "",
        determinator: "",
        kolektor: "",
        kepemilikan_awal: "",
        publikasi: "",
        url: "",
        nilai_peroleh: "",
        nilai_buku: "",

        // halaman 4
        gambar_satu: "",
        gambar_dua: "",
        gambar_tiga: "",
        vidio: "",
        audio: "",
        photo: null,
    });

    const [step, setStep] = useState(1);

    function handleSubmit(e) {
        e.preventDefault();
        if (step === 4) {
            post(route("organizations.store"));
        } else {
            setStep(step + 1);
        }
    }

    function handleBack() {
        setStep(step - 1);
    }

    const handleFileChange = (e) => {
        setData({
            ...data,
            photo: e.target.files[0], // Ambil file yang dipilih
        });
    };

    
    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">
                <Link
                    href={route("kelolakoleksibatuan")}
                    className="text-indigo-600 hover:text-indigo-700"
                >
                    Kelola Koleksi
                </Link>
                <span className="font-medium text-indigo-600"> /</span> Create
            </h1>
            <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-8 p-8 lg:grid-cols">
                        {step === 1 && (
                            <>
                                <FieldGroup
                                    label="Kategori BMN"
                                    name="kategori_bmn"
                                    error={errors.kategori_bmn}
                                >
                                    <TextInput
                                        name="kategori_bmn"
                                        error={errors.kategori_bmn}
                                        value={data.kategori_bmn}
                                        onChange={(e) =>
                                            setData(
                                                "kategori_bmn",
                                                e.target.value
                                            )
                                        }
                                    />
                                </FieldGroup>
                            
                                <FieldGroup
                                    label="Nup BMN"
                                    error={errors.nup_bmn}
                                >
                                    <TextInput
                                        name="nup_bmn"
                                        error={errors.nup_bmn}
                                        value={data.nup_bmn}
                                        onChange={(e) =>
                                            setData("nup_bmn", e.target.value)
                                        }
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Tipe BMN"
                                    name="tipe_bmn"
                                    error={errors.tipe_bmn}
                                >
                                    <TextInput
                                        name="tipe_bmn"
                                        error={errors.tipe_bmn}
                                        value={data.tipe_bmn}
                                        onChange={(e) =>
                                            setData("tipe_bmn", e.target.value)
                                        }
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Nomor Awal"
                                    name="no_awal"
                                    error={errors.no_awal}
                                >
                                    <TextInput
                                        name="no_awal"
                                        error={errors.no_awal}
                                        value={data.no_awal}
                                        onChange={(e) =>
                                            setData("no_awal", e.target.value)
                                        }
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Satuan"
                                    name="satuan"
                                    error={errors.satuan}
                                >
                                    <TextInput
                                        name="satuan"
                                        error={errors.satuan}
                                        value={data.satuan}
                                        onChange={(e) =>
                                            setData("satuan", e.target.value)
                                        }
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Kelompok Koleksi"
                                    name="kelompok_koleksi"
                                    error={errors.kelompok_koleksi}
                                >
                                    <SelectInput
                                        name="kelompok_koleksi"
                                        error={errors.kelompok_koleksi}
                                        value={data.kelompok_koleksi}
                                        onChange={(e) =>
                                            setData(
                                                "kelompok_koleksi",
                                                e.target.value
                                            )
                                        }
                                        options={[
                                            { value: "", label: "" },
                                            { value: "BA", label: "Batuan" },
                                            { value: "FO", label: "Fosil" },
                                            {
                                                value: "SD",
                                                label: "Sumber Daya",
                                            },
                                        ]}
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Jenis Koleksi"
                                    name="jenis_koleksi"
                                    error={errors.jenis_koleksi}
                                >
                                    <SelectInput
                                        name="jenis_koleksi"
                                        error={errors.jenis_koleksi}
                                        value={data.jenis_koleksi}
                                        onChange={(e) =>
                                            setData(
                                                "jenis_koleksi",
                                                e.target.value
                                            )
                                        }
                                        options={[
                                            { value: "", label: "" },
                                            { value: "BA", label: "Batuan" },
                                            { value: "FO", label: "Fosil" },
                                            {
                                                value: "SD",
                                                label: "Sumber Daya",
                                            },
                                        ]}
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Ruang Penyimpanan"
                                    name="ruang_penyimpanan"
                                    error={errors.ruang_penyimpanan}
                                >
                                    <TextInput
                                        name="ruang_penyimpanan"
                                        error={errors.ruang_penyimpanan}
                                        value={data.ruang_penyimpanan}
                                        onChange={(e) =>
                                            setData(
                                                "ruang_penyimpanan",
                                                e.target.value
                                            )
                                        }
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Lokasi Penyimpanan"
                                    name="lokasi_penyimpanan"
                                    error={errors.lokasi_penyimpanan}
                                >
                                    <TextInput
                                        name="lokasi_penyimpanan"
                                        error={errors.lokasi_penyimpanan}
                                        value={data.lokasi_penyimpanan}
                                        onChange={(e) =>
                                            setData(
                                                "lokasi_penyimpanan",
                                                e.target.value
                                            )
                                        }
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Lantai"
                                    name="lantai"
                                    error={errors.lantai}
                                >
                                    <TextInput
                                        name="lantai"
                                        error={errors.lantai}
                                        value={data.lantai}
                                        onChange={(e) =>
                                            setData("lantai", e.target.value)
                                        }
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Nomor Lajur"
                                    name="no_lajur"
                                    error={errors.no_lajur}
                                >
                                    <TextInput
                                        name="no_lajur"
                                        error={errors.no_lajur}
                                        value={data.no_lajur}
                                        onChange={(e) =>
                                            setData("no_lajur", e.target.value)
                                        }
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Nomor Lemari"
                                    name="no_lemari"
                                    error={errors.no_lemari}
                                >
                                    <TextInput
                                        name="no_lemari"
                                        error={errors.no_lemari}
                                        value={data.no_lemari}
                                        onChange={(e) =>
                                            setData("no_lemari", e.target.value)
                                        }
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Nomor Laci"
                                    name="no_laci"
                                    error={errors.no_laci}
                                >
                                    <TextInput
                                        name="no_laci"
                                        error={errors.no_laci}
                                        value={data.no_laci}
                                        onChange={(e) =>
                                            setData("no_laci", e.target.value)
                                        }
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Nomor Slot"
                                    name="no_slot"
                                    error={errors.no_slot}
                                >
                                    <TextInput
                                        name="no_slot"
                                        error={errors.no_slot}
                                        value={data.no_slot}
                                        onChange={(e) =>
                                            setData("no_slot", e.target.value)
                                        }
                                    />
                                </FieldGroup>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <FieldGroup
                                    label="Kondisi"
                                    name="kondisi"
                                    error={errors.kondisi}
                                >
                                    <TextInput
                                        name="kondisi"
                                        error={errors.kondisi}
                                        value={data.kondisi}
                                        onChange={(e) =>
                                            setData("kondisi", e.target.value)
                                        }
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Nama Koleksi"
                                    name="nama_koleksi"
                                    error={errors.nama_koleksi}
                                >
                                    <SelectInput
                                        name="nama_koleksi"
                                        error={errors.nama_koleksi}
                                        value={data.nama_koleksi}
                                        onChange={(e) =>
                                            setData(
                                                "kelompok_koleksi",
                                                e.target.value
                                            )
                                        }
                                        options={[
                                            { value: "", label: "" },
                                            { value: "BA", label: "Batuan" },
                                            { value: "FO", label: "Fosil" },
                                            {
                                                value: "SD",
                                                label: "Sumber Daya",
                                            },
                                        ]}
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Deskripsi Koleksi"
                                    name="deskripsi_koleksi"
                                    error={errors.deskripsi_koleksi}
                                >
                                    <SelectInput
                                        name="deskripsi_koleksi"
                                        error={errors.deskripsi_koleksi}
                                        value={data.deskripsi_koleksi}
                                        onChange={(e) =>
                                            setData(
                                                "deskripsi_koleksi",
                                                e.target.value
                                            )
                                        }
                                        options={[
                                            { value: "", label: "" },
                                            { value: "BA", label: "Batuan" },
                                            { value: "FO", label: "Fosil" },
                                            {
                                                value: "SD",
                                                label: "Sumber Daya",
                                            },
                                        ]}
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Keterangan Koleksi"
                                    name="keterangan_koleksi"
                                    error={errors.keterangan_koleksi}
                                >
                                    <TextInput
                                        name="keterangan_koleksi"
                                        error={errors.keterangan_koleksi}
                                        value={data.keterangan_koleksi}
                                        onChange={(e) =>
                                            setData(
                                                "keterangan_koleksi",
                                                e.target.value
                                            )
                                        }
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Umur Geologi"
                                    name="umur_geologi"
                                    error={errors.umur_geologi}
                                >
                                    <TextInput
                                        name="umur_geologi"
                                        error={errors.umur_geologi}
                                        value={data.umur_geologi}
                                        onChange={(e) =>
                                            setData(
                                                "umur_geologi",
                                                e.target.value
                                            )
                                        }
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Nama Formasi"
                                    name="nama_formasi"
                                    error={errors.nama_formasi}
                                >
                                    <SelectInput
                                        name="nama_formasi"
                                        error={errors.nama_formasi}
                                        value={data.nama_formasi}
                                        onChange={(e) =>
                                            setData(
                                                "nama_formasi",
                                                e.target.value
                                            )
                                        }
                                        options={[
                                            { value: "", label: "" },
                                            { value: "BA", label: "Batuan" },
                                            { value: "FO", label: "Fosil" },
                                            {
                                                value: "SD",
                                                label: "Sumber Daya",
                                            },
                                        ]}
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Ditemukan"
                                    name="ditemukan"
                                    error={errors.ditemukan}
                                >
                                    <SelectInput
                                        name="ditemukan"
                                        error={errors.ditemukan}
                                        value={data.ditemukan}
                                        onChange={(e) =>
                                            setData("ditemukan", e.target.value)
                                        }
                                        options={[
                                            { value: "", label: "" },
                                            { value: "BA", label: "Batuan" },
                                            { value: "FO", label: "Fosil" },
                                            {
                                                value: "SD",
                                                label: "Sumber Daya",
                                            },
                                        ]}
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Pulau"
                                    name="pulau"
                                    error={errors.pulau}
                                >
                                    <TextInput
                                        name="pulau"
                                        error={errors.pulau}
                                        value={data.pulau}
                                        onChange={(e) =>
                                            setData("pulau", e.target.value)
                                        }
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Provinsi"
                                    name="provinsi"
                                    error={errors.provinsi}
                                >
                                    <TextInput
                                        name="provinsi"
                                        error={errors.provinsi}
                                        value={data.provinsi}
                                        onChange={(e) =>
                                            setData("provinsi", e.target.value)
                                        }
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Kota"
                                    name="kota"
                                    error={errors.kota}
                                >
                                    <SelectInput
                                        name="kota"
                                        error={errors.kota}
                                        value={data.kota}
                                        onChange={(e) =>
                                            setData("kota", e.target.value)
                                        }
                                        options={[
                                            { value: "", label: "" },
                                            { value: "BA", label: "Batuan" },
                                            { value: "FO", label: "Fosil" },
                                            {
                                                value: "SD",
                                                label: "Sumber Daya",
                                            },
                                        ]}
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Alamat"
                                    name="alamat"
                                    error={errors.alamat}
                                >
                                    <SelectInput
                                        name="alamat"
                                        error={errors.alamat}
                                        value={data.alamat}
                                        onChange={(e) =>
                                            setData("alamat", e.target.value)
                                        }
                                        options={[
                                            { value: "", label: "" },
                                            { value: "BA", label: "Batuan" },
                                            { value: "FO", label: "Fosil" },
                                            {
                                                value: "SD",
                                                label: "Sumber Daya",
                                            },
                                        ]}
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Latitude"
                                    name="latitude"
                                    error={errors.latitude}
                                >
                                    <TextInput
                                        name="latitude"
                                        error={errors.latitude}
                                        value={data.latitude}
                                        onChange={(e) =>
                                            setData("latitude", e.target.value)
                                        }
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Longitude"
                                    name="longitude"
                                    error={errors.longitude}
                                >
                                    <TextInput
                                        name="longitude"
                                        error={errors.longitude}
                                        value={data.longitude}
                                        onChange={(e) =>
                                            setData("longitude", e.target.value)
                                        }
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Elevasi"
                                    name="elevasi"
                                    error={errors.elevasi}
                                >
                                    <SelectInput
                                        name="elevasi"
                                        error={errors.elevasi}
                                        value={data.elevasi}
                                        onChange={(e) =>
                                            setData("elevasi", e.target.value)
                                        }
                                        options={[
                                            { value: "", label: "" },
                                            { value: "BA", label: "Batuan" },
                                            { value: "FO", label: "Fosil" },
                                            {
                                                value: "SD",
                                                label: "Sumber Daya",
                                            },
                                        ]}
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="peta"
                                    name="peta"
                                    error={errors.peta}
                                >
                                    <SelectInput
                                        name="peta"
                                        error={errors.peta}
                                        value={data.peta}
                                        onChange={(e) =>
                                            setData("peta", e.target.value)
                                        }
                                        options={[
                                            { value: "", label: "" },
                                            { value: "BA", label: "Batuan" },
                                            { value: "FO", label: "Fosil" },
                                            {
                                                value: "SD",
                                                label: "Sumber Daya",
                                            },
                                        ]}
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Skala"
                                    name="skala"
                                    error={errors.skala}
                                >
                                    <TextInput
                                        name="skala"
                                        error={errors.skala}
                                        value={data.skala}
                                        onChange={(e) =>
                                            setData("skala", e.target.value)
                                        }
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Lembar Peta"
                                    name="lembar_peta"
                                    error={errors.lembar_peta}
                                >
                                    <TextInput
                                        name="lembar_peta"
                                        error={errors.lembar_peta}
                                        value={data.lembar_peta}
                                        onChange={(e) =>
                                            setData(
                                                "lembar_peta",
                                                e.target.value
                                            )
                                        }
                                    />
                                </FieldGroup>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <FieldGroup
                                    label="Cara Peroleh"
                                    name="cara_peroleh"
                                    error={errors.cara_peroleh}
                                >
                                    <TextInput
                                        name="cara_peroleh"
                                        error={errors.cara_peroleh}
                                        value={data.cara_peroleh}
                                        onChange={(e) =>
                                            setData(
                                                "cara_peroleh",
                                                e.target.value
                                            )
                                        }
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Determinator"
                                    name="determinator"
                                    error={errors.determinator}
                                >
                                    <TextInput
                                        name="determinator"
                                        error={errors.determinator}
                                        value={data.determinator}
                                        onChange={(e) =>
                                            setData(
                                                "determinator",
                                                e.target.value
                                            )
                                        }
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Kolektor"
                                    name="kolektor"
                                    error={errors.kolektor}
                                >
                                    <TextInput
                                        name="kolektor"
                                        error={errors.kolektor}
                                        value={data.kolektor}
                                        onChange={(e) =>
                                            setData("kolektor", e.target.value)
                                        }
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Kepemilikan Awal"
                                    name="kepemilikan_awal"
                                    error={errors.kepemilikan_awal}
                                >
                                    <TextInput
                                        name="kepemilikan_awal"
                                        error={errors.kepemilikan_awal}
                                        value={data.kepemilikan_awal}
                                        onChange={(e) =>
                                            setData(
                                                "kepemilikan_awal",
                                                e.target.value
                                            )
                                        }
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Publikasi"
                                    name="publikasi"
                                    error={errors.publikasi}
                                >
                                    <TextInput
                                        name="publikasi"
                                        error={errors.publikasi}
                                        value={data.publikasi}
                                        onChange={(e) =>
                                            setData("publikasi", e.target.value)
                                        }
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Url"
                                    name="url"
                                    error={errors.url}
                                >
                                    <TextInput
                                        name="url"
                                        error={errors.url}
                                        value={data.url}
                                        onChange={(e) =>
                                            setData("url", e.target.value)
                                        }
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Nilai Peroleh"
                                    name="nilai_peroleh"
                                    error={errors.nilai_peroleh}
                                >
                                    <TextInput
                                        name="nilai_peroleh"
                                        error={errors.nilai_peroleh}
                                        value={data.nilai_peroleh}
                                        onChange={(e) =>
                                            setData(
                                                "nilai_peroleh",
                                                e.target.value
                                            )
                                        }
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Nilai Buku"
                                    name="nilai_buku"
                                    error={errors.nilai_buku}
                                >
                                    <TextInput
                                        name="nilai_buku"
                                        error={errors.nilai_buku}
                                        value={data.nilai_buku}
                                        onChange={(e) =>
                                            setData(
                                                "nilai_buku",
                                                e.target.value
                                            )
                                        }
                                    />
                                </FieldGroup>
                            </>
                        )}

                        {step === 4 && (
                            <>
                                
                                <FieldGroup
                                label="Gambar 1"
                                name="gambar_satu"
                                error={errors.gambar_satu}
                                >
                                    <FileInput
                                        type="file"
                                        name="gambar_satu"
                                        error={errors.gambar_satu}
                                        value={data.gambar_satu}
                                        onChange={handleFileChange}
                                    />
                                </FieldGroup>

                                <FieldGroup
                                label="Gambar 2"
                                name="gambar_dua"
                                error={errors.gambar_dua}
                                >
                                    <FileInput
                                        type="file"
                                        name="gambar_dua"
                                        onChange={handleFileChange}
                                    />
                                </FieldGroup>
                                <FieldGroup
                                label="Gambar 3"
                                name="gambar_tiga"
                                error={errors.gambar_tiga}
                                >
                                    <FileInput
                                        type="file"
                                        name="gambar_tiga"
                                        onChange={handleFileChange}
                                    />
                                </FieldGroup>
                                <FieldGroup
                                label="Vidio"
                                name="vidio"
                                error={errors.vidio}
                                >
                                    <FileInput
                                        type="file"
                                        name="vidio"
                                        onChange={handleFileChange}
                                    />
                                </FieldGroup>
                                <FieldGroup
                                label="Audio"
                                name="audio"
                                error={errors.audio}
                                >
                                    <FileInput
                                        type="file"
                                        name="audio"
                                        onChange={handleFileChange}
                                    />
                                </FieldGroup>

                            
                            </>
                        )}
                    </div>
                    <div className="flex items-center justify-between px-8 py-4 bg-gray-100 border-t border-gray-200">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="btn-indigo"
                            >
                                Back
                            </button>
                        )}
                        <LoadingButton
                            loading={processing}
                            type="submit"
                            className="btn-indigo"
                        >
                            {step === 4 ? "Tambah Data" : "Next"}
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

Create.layout = (page) => (
    <MainLayout title="Tambah Organization" children={page} />
);

export default Create;
