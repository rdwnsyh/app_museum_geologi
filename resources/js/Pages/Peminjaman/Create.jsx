import React, { useState } from 'react';

const Create = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    tanggal_pinjam: '',
    tanggal_jatuh_tempo: '',
    status: '',
    identitas: null,
    surat_permohonan: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Create a FormData object to handle file uploads
    const submissionData = new FormData();
    for (const key in formData) {
      submissionData.append(key, formData[key]);
    }
    onSubmit(submissionData); // Call the onSubmit prop to handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="tanggal_pinjam" className="block text-sm font-medium text-gray-700">
          Tanggal Pinjam
        </label>
        <input
          type="date"
          name="tanggal_pinjam"
          value={formData.tanggal_pinjam}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300"
        />
      </div>

      <div>
        <label htmlFor="tanggal_jatuh_tempo" className="block text-sm font-medium text-gray-700">
          Tanggal Jatuh Tempo
        </label>
        <input
          type="date"
          name="tanggal_jatuh_tempo"
          value={formData.tanggal_jatuh_tempo}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300"
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300"
        >
          <option value="">Pilih Status</option>
          <option value="baru">Pengajuan</option>
          <option value="aktif">Sedang di Pinjam</option>
          <option value="menunggu">Terlambat</option>
          <option value="ditolak">Ditolak</option>
          <option value="selesai">Selesai</option>
        </select>
      </div>

      <div>
        <label htmlFor="identitas" className="block text-sm font-medium text-gray-700">
          Identitas
        </label>
        <input
          type="file"
          name="identitas"
          onChange={handleFileChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300"
        />
      </div>

      <div>
        <label htmlFor="surat_permohonan" className="block text-sm font-medium text-gray-700">
          Surat Permohonan
        </label>
        <input
          type="file"
          name="surat_permohonan"
          onChange={handleFileChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300"
        />
      </div>

      <div className="flex justify-end">
        <button 
          type="submit" 
          className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          Simpan
        </button>
      </div>
    </form>
  );
};

export default Create;
