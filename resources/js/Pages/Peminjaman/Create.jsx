import React, { useState } from 'react';

const Create = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    tanggal_pinjam: '',
    tanggal_jatuh_tempo: '',
    status: '',
    identitas: null,
    surat_permohonan: null,
  });

  const [tableData, setTableData] = useState([]);

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
    const submissionData = new FormData();
    for (const key in formData) {
      submissionData.append(key, formData[key]);
    }
    onSubmit(submissionData);
  };

  const addRowToTable = () => {
    const newRow = {
      tanggal_pinjam: formData.tanggal_pinjam,
      tanggal_jatuh_tempo: formData.tanggal_jatuh_tempo,
      status: formData.status,
    };
    setTableData([...tableData, newRow]);
    setFormData({ ...formData, tanggal_pinjam: '', tanggal_jatuh_tempo: '', status: '' });
  };

  return (
    <div className="p-4 overflow-hidden"> {/* Tambahkan padding dan sembunyikan overflow */}
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

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Data Peminjaman</h2>
          <table className="min-w-full mt-2 border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Tanggal Pinjam</th>
                <th className="border border-gray-300 px-4 py-2">Tanggal Jatuh Tempo</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{row.tanggal_pinjam}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.tanggal_jatuh_tempo}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <button 
            type="button"
            onClick={addRowToTable}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Tambah Baris
          </button>
          <button 
            type="submit" 
            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded ml-2"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
