import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import LoadingButton from "@/Components/Button/LoadingButton";
import TextInput from "@/Components/Form/TextInput";
import SelectInput from "@/Components/Form/SelectInput";
import FieldGroup from "@/Components/Form/FieldGroup";
import FileInput from "@/Components/Form/FileInput";
import RadioButton from "@/Components/Form/Radiobutton";
import TextArea from "@/Components/Form/Textarea";

const Create = () => {
    const { data, setData, errors, post, processing, setError } = useForm({
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
    });

    const [step, setStep] = useState(1);
    

    function handleSubmit(e) {
        e.preventDefault();
        if (step === 4) {
            post(route("kelolakoleksibatuan.store"));
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

    // Fungsi untuk menangani perubahan pada radio button
    const handleRuangPenyimpananChange = (e) => setData("ruang_penyimpanan", e.target.value);
    const handleDitemukanChange = (e) => setData("ditemukan", e.target.value);
    const handlePetaChange = (e) => setData("peta", e.target.value);

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
                    <div className="grid gap-10 p-10 lg:grid-cols-2">
                        {step === 1 && (
                            <>
                                <FieldGroup
                                    label="Kategori BMN"
                                    name="kategori_bmn"
                                    error={errors.kategori_bmn}
                                >
                                    <TextInput
                                        type ="text"
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
                                        type ="text"
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
                                        type ="text"
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
                                        type ="text"
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
                                    <SelectInput
                                        type ="text"
                                        name="satuan"
                                        error={errors.satuan}
                                        value={data.satuan}
                                        onChange={(e) =>
                                            setData("satuan", e.target.value)
                                        }
                                        options={[
                                            { value: "", label: "" },
                                            { value: "BU", label: "Buah" },
                                            { value: "UN", label: "Unit" },
                                            { value: "SE", label: "Set" },
                                        ]}
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Kelompok Koleksi"
                                    name="kelompok_koleksi"
                                    error={errors.kelompok_koleksi}
                                >
                                    <TextInput
                                        type ="text"
                                        name="kelompok_koleksi"
                                        error={errors.kelompok_koleksi}
                                        value={data.kelompok_koleksi}
                                        onChange={(e) =>
                                            setData(
                                                "kelompok_koleksi",
                                                e.target.value
                                            )
                                        }
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
                                            { value: "BE", label: "Beku" },
                                            { value: "IM", label: "Impaktit" },
                                            { value: "MI", label: "Mineral" },
                                            { value: "MF", label: "Metamorf" },
                                            { value: "MT", label: "Meteorit" },
                                            {
                                                value: "PK",
                                                label: "Piroklasktik",
                                            },
                                            {
                                                value: "TT",
                                                label: "Tidak Teridentifikasi",
                                            },
                                        ]}
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Ruang Penyimpanan"
                                    name="ruang_penyimpanan"
                                    error={errors.ruang_penyimpanan}
                                >
                                    <RadioButton
                                        name="ruang_penyimpanan"
                                        selectedValue={data.ruang_penyimpanan}
                                        onChange={handleRuangPenyimpananChange}
                                        error={errors.ruang_penyimpanan}
                                        options={[
                                            { value: "ST", label: "Storage" },
                                            {
                                                value: "NS",
                                                label: "Non Storage",
                                            },
                                        ]}
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Lokasi Penyimpanan"
                                    name="lokasi_penyimpanan"
                                    error={errors.lokasi_penyimpanan}
                                >
                                    <SelectInput
                                        name="lokasi_penyimpanan"
                                        error={errors.lokasi_penyimpanan}
                                        value={data.lokasi_penyimpanan}
                                        onChange={(e) =>
                                            setData(
                                                "lokasi_penyimpanan",
                                                e.target.value
                                            )
                                        }
                                        options={[
                                            { value: "", label: "" },
                                            { value: "S1", label: "Storage 1" },
                                            { value: "S2", label: "Storage 2" },
                                            { value: "S3", label: "Storage 3" },
                                            { value: "S4", label: "Storage 4" },
                                            { value: "S5", label: "Storage 5" },
                                            { value: "S6", label: "Storage 6" },
                                            { value: "S7", label: "Storage 7" },
                                            { value: "S8", label: "Storage 8" },
                                            { value: "S9", label: "Storage 9" },
                                            {
                                                value: "S10",
                                                label: "Storage 10",
                                            },
                                            {
                                                value: "S11",
                                                label: "Storage 11",
                                            },
                                        ]}
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Lantai"
                                    name="lantai"
                                    error={errors.lantai}
                                >
                                    <SelectInput
                                        name="lantai"
                                        error={errors.lantai}
                                        value={data.lantai}
                                        onChange={(e) =>
                                            setData("lantai", e.target.value)
                                        }
                                        options={[
                                            { value: "", label: "" },
                                            { value: "L1", label: "Lantai 1" },
                                            { value: "L2", label: "Lantai 2" },
                                            { value: "L3", label: "Lantai 3" },
                                        ]}
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Nomor Lajur"
                                    name="no_lajur"
                                    error={errors.no_lajur}
                                >
                                    <TextInput
                                        type ="number"
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
                                        type ="number"
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
                                        type ="number"
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
                                        type ="number"
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
                                    <SelectInput
                                        name="kondisi"
                                        error={errors.kondisi}
                                        value={data.kondisi}
                                        onChange={(e) =>
                                            setData("kondisi", e.target.value)
                                        }
                                        options={[
                                            { value: "", label: "" },
                                            { value: "B", label: "Baik" },
                                            {
                                                value: "RR",
                                                label: "Rusak Ringan",
                                            },
                                            {
                                                value: "RB",
                                                label: "Rusak berat",
                                            },
                                        ]}
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Nama Koleksi"
                                    name="nama_koleksi"
                                    error={errors.nama_koleksi}
                                >
                                    <TextInput
                                        type ="text"
                                        name="nama_koleksi"
                                        error={errors.nama_koleksi}
                                        value={data.nama_koleksi}
                                        onChange={(e) =>
                                            setData(
                                                "nama_koleksi",
                                                e.target.value
                                            )
                                        }
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Deskripsi Koleksi"
                                    name="deskripsi_koleksi"
                                    error={errors.deskripsi_koleksi}
                                >
                                    <TextArea
                                        type ="text"
                                        name="deskripsi_koleksi"
                                        value={data.deskripsi_koleksi}
                                        onChange={(e) =>
                                            setData(
                                                "deskripsi_koleksi",
                                                e.target.value
                                            )
                                        }
                                        error={errors.deskripsi_koleksi}
                                        placeholder="Masukkan Deskripsi di sini..."
                                        rows={6} // Adjust as needed
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Keterangan Koleksi"
                                    name="keterangan_koleksi"
                                    error={errors.keterangan_koleksi}
                                >
                                    <TextArea
                                        type ="text"
                                        name="keterangan_koleksi"
                                        value={data.keterangan_koleksi}
                                        onChange={(e) =>
                                            setData(
                                                "keterangan_koleksi",
                                                e.target.value
                                            )
                                        }
                                        error={errors.keterangan_koleksi}
                                        placeholder="Masukkan Keterangan Koleksi di sini..."
                                        rows={6} // Adjust as needed
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Umur Geologi"
                                    name="umur_geologi"
                                    error={errors.umur_geologi}
                                >
                                    <SelectInput
                                        name="umur_geologi"
                                        error={errors.umur_geologi}
                                        value={data.umur_geologi}
                                        onChange={(e) =>
                                            setData(
                                                "umur_geologi",
                                                e.target.value
                                            )
                                        }
                                        options={[
                                            { value: "", label: "" },
                                            {
                                                value: "PR",
                                                label: "Prakambrium",
                                            },
                                            {
                                                value: "PK",
                                                label: "Paleozoikum - Kambrium",
                                            },
                                            {
                                                value: "PO",
                                                label: "Paleozoikum - Ordovium",
                                            },
                                            {
                                                value: "PS",
                                                label: "Paleozoikum - Silur",
                                            },
                                            {
                                                value: "PD",
                                                label: "Paleozoikum - Devon",
                                            },
                                            {
                                                value: "PKR",
                                                label: "Paleozoikum - Karbo",
                                            },
                                            {
                                                value: "PP",
                                                label: "Paleozoikum - Perem",
                                            },
                                            {
                                                value: "MT",
                                                label: "Mesozoikum - Trias",
                                            },
                                            {
                                                value: "MJ",
                                                label: "Mesozoikum - Jura",
                                            },
                                            {
                                                value: "MK",
                                                label: "Mesozoikum - Kapur",
                                            },
                                            {
                                                value: "KP",
                                                label: "Kenozoikum - Paleogen",
                                            },
                                            {
                                                value: "KE",
                                                label: "Kenozoikum - Eosen",
                                            },
                                            {
                                                value: "KO",
                                                label: "Kenozoikum - Oligosen",
                                            },
                                            {
                                                value: "KM",
                                                label: "Kenozoikum - Miosen",
                                            },
                                            {
                                                value: "KP",
                                                label: "Kenozoikum - Pliosen",
                                            },
                                            {
                                                value: "KPT",
                                                label: "Kenozoikum - Plistosen",
                                            },
                                            {
                                                value: "KH",
                                                label: "Kenozoikum - Holosen",
                                            },
                                        ]}
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Nama Formasi"
                                    name="nama_formasi"
                                    error={errors.nama_formasi}
                                >
                                    <TextInput
                                        type ="text"
                                        name="nama_formasi"
                                        error={errors.nama_formasi}
                                        value={data.nama_formasi}
                                        onChange={(e) =>
                                            setData(
                                                "nama_formasi",
                                                e.target.value
                                            )
                                        }
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Ditemukan"
                                    name="ditemukan"
                                    error={errors.ditemukan}
                                >
                                    <RadioButton
                                        name="ditemukan"
                                        selectedValue={data.ditemukan}
                                        onChange={handleDitemukanChange}
                                        error={errors.ditemukan}
                                        options={[
                                            {
                                                value: "DL",
                                                label: "Dalam Negeri",
                                            },
                                            {
                                                value: "LN",
                                                label: "Luar Negeri",
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
                                        type ="text"
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
                                        type ="text"
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
                                    <TextInput
                                        type ="text"
                                        name="kota"
                                        error={errors.kota}
                                        value={data.kota}
                                        onChange={(e) =>
                                            setData("kota", e.target.value)
                                        }
                                    />
                                </FieldGroup>

                                <FieldGroup
                                    label="Alamat"
                                    name="alamat"
                                    error={errors.alamat}
                                >
                                    <TextArea
                                        type ="text"
                                        name="alamat"
                                        value={data.alamat}
                                        onChange={(e) =>
                                            setData("alamat", e.target.value)
                                        }
                                        error={errors.alamat}
                                        placeholder="Masukkan alamat di sini..."
                                        rows={6} // Adjust as needed
                                    />
                                </FieldGroup>

                                <FieldGroup
                                    label="Latitude"
                                    name="latitude"
                                    error={errors.latitude}
                                >
                                    <TextInput
                                        type ="text"
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
                                        type ="text"
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
                                    <TextInput
                                        name="elevasi"
                                        error={errors.elevasi}
                                        value={data.elevasi}
                                        onChange={(e) =>
                                            setData("elevasi", e.target.value)
                                        }
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Peta"
                                    name="peta"
                                    error={errors.peta}
                                >
                                    <RadioButton
                                        name="peta"
                                        selectedValue={data.peta}
                                        onChange={handlePetaChange}
                                        error={errors.peta}
                                        options={[
                                            { value: "RP", label: "Rupa Bumi" },
                                            { value: "BL", label: "Blad" },
                                            { value: "GO", label: "Geologi" },
                                            {
                                                value: "LU",
                                                label: "Luar Negeri",
                                            },
                                        ]}
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Skala"
                                    name="skala"
                                    error={errors.skala}
                                >
                                    <SelectInput
                                        name="skala"
                                        error={errors.skala}
                                        value={data.skala}
                                        onChange={(e) =>
                                            setData("skala", e.target.value)
                                        }
                                        options={[
                                            { value: "", label: "" },
                                            { value: "LI", label: "1:50.000" },
                                            { value: "RA", label: "1:100.000" },
                                            { value: "DU", label: "1:250.000" },
                                        ]}
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Lembar Peta"
                                    name="lembar_peta"
                                    error={errors.lembar_peta}
                                >
                                    <TextInput
                                        type ="text"
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
                                    <SelectInput
                                        name="cara_peroleh"
                                        error={errors.cara_peroleh}
                                        value={data.cara_peroleh}
                                        onChange={(e) =>
                                            setData(
                                                "cara_peroleh",
                                                e.target.value
                                            )
                                        }
                                        options={[
                                            { value: "", label: "" },
                                            { value: "PE", label: "Pembuatan" },
                                            { value: "PM", label: "Pembelian" },
                                            { value: "HI", label: "HIbah" },
                                            {
                                                value: "PG",
                                                label: "Penyelidikan Geologi",
                                            },
                                        ]}
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Tahun Peroleh"
                                    name="thn_peroleh"
                                    error={errors.thn_peroleh}
                                >
                                    <TextInput
                                        type ="year"
                                        name="thn_peroleh"
                                        error={errors.thn_peroleh}
                                        value={data.thn_peroleh}
                                        onChange={(e) =>
                                            setData(
                                                "thn_peroleh",
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
                                        type ="text"
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
                                        type ="text"
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
                                        type ="text"
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
                                    <TextArea
                                        type ="text"
                                        name="publikasi"
                                        value={data.publikasi}
                                        onChange={(e) =>
                                            setData("publikasi", e.target.value)
                                        }
                                        error={errors.publikasi}
                                        placeholder="Masukkan Publikasi di sini..."
                                        rows={6} // Adjust as needed
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    label="Url"
                                    name="url"
                                    error={errors.url}
                                >
                                    <TextInput
                                        type ="text"
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
                                        type ="text"
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
                                        type ="text"
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
                           className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-900 transition"
                       >
                           Back
                       </button>
                        )}
                       <LoadingButton
                           loading={processing}
                           type="submit"
                           className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-900 transition"
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
