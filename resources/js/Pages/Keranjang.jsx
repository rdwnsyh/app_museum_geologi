import { useState } from 'react';
import { Link } from '@inertiajs/react'; 
import Navbar from "@/Components/Navbar/Navbar";
import Modal from "@/Components/Modal/Modal"; 
import Tambah from "./Tambah";

const Keranjang = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Tray Table', color: 'Black', quantity: 2, checked: true, imageUrl: '/batu.png' },
    { id: 2, name: 'Tray Table', color: 'White', quantity: 2, checked: false, imageUrl: '/batu.png' },
    { id: 3, name: 'Tray Table', color: 'Red', quantity: 2, checked: true, imageUrl: '/batu.png' },
    { id: 4, name: 'Tray Table', color: 'Blue', quantity: 2, checked: false, imageUrl: '/batu.png' },
    { id: 5, name: 'Tray Table', color: 'Green', quantity: 2, checked: false, imageUrl: '/batu.png' },
    { id: 6, name: 'Tray Table', color: 'Yellow', quantity: 2, checked: true, imageUrl: '/batu.png' },
  ]);

  const handleCheck = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const [isOpen, setIsOpen] = useState(false);
  
  const handleOpenModal = (event) => {
    event.preventDefault(); 
    setIsOpen(true);
  };    

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleCreateSubmit = (formData) => {
    console.log('Form submitted:', formData);
    handleCloseModal();
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleQuantityChange = (id, value) => {
    if (value < 1) return; 
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: value } : item
      )
    );
  };

  const handleDelete = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const checkedItems = cartItems.filter((item) => item.checked);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="flex-grow container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Keranjang</h2>
        <div className="bg-white shadow rounded-md p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">
                    <input
                      type="checkbox"
                      onChange={() => {
                        const allChecked = checkedItems.length === cartItems.length;
                        setCartItems((prevItems) =>
                          prevItems.map((item) => ({ ...item, checked: !allChecked }))
                        );
                      }}
                      checked={checkedItems.length === cartItems.length}
                      aria-label="Select all items"
                    />
                  </th>
                  <th className="px-4 py-2 text-left">Gambar</th>
                  <th className="px-4 py-2 text-left">Koleksi</th>
                  <th className="px-4 py-2 text-left">Color</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2 text-left">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => handleCheck(item.id)}
                        aria-label={`Select ${item.name}`}
                      />
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover" />
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">{item.name}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{item.color}</td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        className="w-16 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white shadow rounded-md p-4 mt-4">
            <div className="mt-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Subtotal: {checkedItems.length} item terpilih</h3>
              <Link
                onClick={handleOpenModal}
                className="bg-yellow-500 text-black py-2 px-4 rounded-md ml-2"
              >
                Pinjam Sekarang
              </Link>
            </div>
          </div>
          
          <Modal isOpen={isOpen} onClose={handleCloseModal} title="Tambah Peminjaman">
            <Tambah onSubmit={handleCreateSubmit} />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Keranjang;
