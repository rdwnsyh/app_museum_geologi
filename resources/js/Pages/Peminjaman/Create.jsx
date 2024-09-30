// PeminjamanForm.js
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const PeminjamanForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    peminjam: '',
    keperluan: '',
    tanggalPinjam: '',
    suratPermohonan: null,
    ktp: null,
    koleksi: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleKoleksiChange = (index, field, value) => {
    const updatedKoleksi = [...formData.koleksi];
    updatedKoleksi[index][field] = value;
    setFormData({ ...formData, koleksi: updatedKoleksi });
  };

  const addKoleksi = () => {
    setFormData({
      ...formData,
      koleksi: [...formData.koleksi, { namaKoleksi: '', lamaPinjam: '' }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('peminjam', formData.peminjam);
    data.append('keperluan', formData.keperluan);
    data.append('tanggalPinjam', formData.tanggalPinjam);
    data.append('suratPermohonan', formData.suratPermohonan);
    data.append('ktp', formData.ktp);
    formData.koleksi.forEach((item, index) => {
      data.append(`koleksi[${index}][namaKoleksi]`, item.namaKoleksi);
      data.append(`koleksi[${index}][lamaPinjam]`, item.lamaPinjam);
    });

    Inertia.post('/peminjaman', data);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Peminjaman</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="peminjam"
              className="block text-sm font-medium text-gray-700"
            >
              Peminjam
            </label>
            <select
              id="peminjam"
              name="peminjam"
              value={formData.peminjam}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Pilih Peminjam</option>
              {/* Add options for peminjam */}
            </select>
          </div>

          <div>
            <label
              htmlFor="keperluan"
              className="block text-sm font-medium text-gray-700"
            >
              Keperluan
            </label>
            <select
              id="keperluan"
              name="keperluan"
              value={formData.keperluan}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Pilih Keperluan</option>
              {/* Add options for keperluan */}
            </select>
          </div>

          <div>
            <label
              htmlFor="tanggalPinjam"
              className="block text-sm font-medium text-gray-700"
            >
              Tanggal Pinjam
            </label>
            <input
              type="date"
              id="tanggalPinjam"
              name="tanggalPinjam"
              value={formData.tanggalPinjam}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="suratPermohonan"
              className="block text-sm font-medium text-gray-700"
            >
              Surat Permohonan
            </label>
            <input
              type="file"
              id="suratPermohonan"
              name="suratPermohonan"
              onChange={handleFileChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="ktp"
              className="block text-sm font-medium text-gray-700"
            >
              KTP
            </label>
            <input
              type="file"
              id="ktp"
              name="ktp"
              onChange={handleFileChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="koleksi"
              className="block text-sm font-medium text-gray-700"
            >
              Koleksi
            </label>
            {formData.koleksi.map((item, index) => (
              <div key={index} className="flex flex-col mb-4">
                <input
                  type="text"
                  id={`namaKoleksi-${index}`}
                  name="namaKoleksi"
                  value={item.namaKoleksi}
                  onChange={(e) =>
                    handleKoleksiChange(index, 'namaKoleksi', e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Nama Koleksi"
                />
                <input
                  type="number"
                  id={`lamaPinjam-${index}`}
                  name="lamaPinjam"
                  value={item.lamaPinjam}
                  onChange={(e) =>
                    handleKoleksiChange(index, 'lamaPinjam', e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Lama Pinjam"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addKoleksi}
              className="text-gray-500 hover:text-gray-700"
            >
              Tambah Koleksi
            </button>
          </div>

          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default PeminjamanForm;
