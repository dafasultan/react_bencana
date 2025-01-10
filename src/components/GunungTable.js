import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGunung, removeGunung, editGunung } from '../redux/action';
import { Link } from 'react-router-dom';  // Import Link for navigation

const GunungTable = () => {
  const dispatch = useDispatch();
  const gunung = useSelector((state) => state.gunung); // Make sure this is correct
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGunung, setCurrentGunung] = useState(null);

  useEffect(() => {
    dispatch(fetchGunung());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(removeGunung(id));
  };

  const openModal = (gunung) => {
    setCurrentGunung(gunung);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentGunung(null);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    // Dispatch the editGunung action to update the gunung
    await dispatch(editGunung(currentGunung));
    
    // After the gunung is updated, fetch the latest gunung data
    dispatch(fetchGunung());
    
    // Close the modal
    closeModal();
  };

  const handleInputChange = (event) => {
    setCurrentGunung({
      ...currentGunung,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="relative overflow-x-auto">
      {/* Add the link to navigate to /korban */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Daftar Gunung</h2>
        <Link to="/korban" className="text-blue-500 hover:text-blue-700">
          Daftar Korban
        </Link>
      </div>

      <table className="w-full text-sm text-left text-gray-500 bg-white border border-gray-300">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nama Gunung
            </th>
            <th scope="col" className="px-6 py-3">
              Ketinggian (m)
            </th>
            <th scope="col" className="px-6 py-3">
              Lokasi
            </th>
            <th scope="col" className="px-6 py-3">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {gunung.length > 0 ? (
            gunung.map((g) => (
              <tr key={g.id} className="bg-white border-b">
                <td className="px-6 py-4">{g.name}</td>
                <td className="px-6 py-4">{g.ketinggian}</td>
                <td className="px-6 py-4">{g.lokasi}</td>
                <td className="px-6 py-4 flex space-x-4">
                  <button
                    onClick={() => openModal(g)}
                    className="text-yellow-500 hover:text-orange-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(g.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center">
                Tidak ada data gunung
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Gunung</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Nama Gunung</label>
                <input
                  type="text"
                  name="name"
                  value={currentGunung.name}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Ketinggian (m)</label>
                <input
                  type="number"
                  name="ketinggian"
                  value={currentGunung.ketinggian}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Lokasi</label>
                <input
                  type="text"
                  name="lokasi"
                  value={currentGunung.lokasi}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 rounded-md"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GunungTable;
