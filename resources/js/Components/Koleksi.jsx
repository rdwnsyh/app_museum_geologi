// src/Components/Koleksi.jsx
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import Table from 'Table/Table'; // Pastikan path ini sesuai

const dummyKoleksi = [
    { nomor_koleksi: '001', nama_koleksi: 'Koleksi A', tipe_koleksi: 'Batuan', lokasi_storage: 'Ruang 1' },
    { nomor_koleksi: '002', nama_koleksi: 'Koleksi B', tipe_koleksi: 'Batuan', lokasi_storage: 'Ruang 2' },
    // Tambahkan data dummy lainnya jika perlu
];

const Koleksi = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [tipeKoleksi, setTipeKoleksi] = useState('Batuan');
    
    // Gantikan data sebenarnya dengan data dummy
    const koleksi = dummyKoleksi;

    const filteredKoleksi = koleksi.filter((item) => {
        if (searchTerm.trim() === '') {
            return true;
        }
        return item.nama_koleksi.toLowerCase().includes(searchTerm.toLowerCase()) && item.tipe_koleksi === tipeKoleksi;
    });

    // Columns untuk komponen Table
    const columns = [
        { label: 'Nomor Koleksi', name: 'nomor_koleksi' },
        { label: 'Nama Koleksi', name: 'nama_koleksi' },
        { label: 'Tipe Koleksi', name: 'tipe_koleksi' },
        { label: 'Lokasi Storage', name: 'lokasi_storage' },
        { label: 'Aksi', name: 'actions', renderCell: (row) => (
            <div className="flex space-x-2">
                <Link href={`/koleksi/${row.nomor_koleksi}`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                    Info Lengkap
                </Link>
                <Link href={`/koleksi/${row.nomor_koleksi}/edit`} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">
                    Edit
                </Link>
            </div>
        ) },
    ];

    // URL detail row
    const getRowDetailsUrl = (row) => `/koleksi/${row.nomor_koleksi}`;

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                    <label htmlFor="tipeKoleksi" className="mr-2">
                        Pilih Tipe Koleksi:
                    </label>
                    <select
                        id="tipeKoleksi"
                        className="border rounded px-2 py-1"
                        value={tipeKoleksi}
                        onChange={(e) => setTipeKoleksi(e.target.value)}
                    >
                        <option value="Batuan">Batuan</option>
                        {/* Add more options for other types of koleksi */}
                    </select>
                </div>
                <div className="flex items-center">
                    <input
                        type="text"
                        className="border rounded px-2 py-1 mr-2"
                        placeholder="Cari Koleksi..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                        Cari
                    </button>
                </div>
            </div>

            {filteredKoleksi.length === 0 ? (
                <p>No data found.</p>
            ) : (
                <Table
                    columns={columns}
                    rows={filteredKoleksi}
                    getRowDetailsUrl={getRowDetailsUrl}
                />
            )}

            <div className="flex justify-end mt-4">
                <Link href="/koleksi/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                    + Tambah
                </Link>
            </div>
        </div>
    );
};

export default Koleksi;
