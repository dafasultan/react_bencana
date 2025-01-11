import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGunung, removeGunung, editGunung, createGunung } from '../redux/action';
import { Link } from 'react-router-dom';

const GunungTable = () => {
  const dispatch = useDispatch();
  const gunung = useSelector((state) => state.gunung);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGunung, setCurrentGunung] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false);

  useEffect(() => {
    dispatch(fetchGunung());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(removeGunung(id));
  };

  const openAddModal = () => {
    setCurrentGunung({ name: '', ketinggian: '', lokasi: '' }); // Empty fields for new entry
    setIsAddMode(true);
    setIsModalOpen(true);
  };

  const openEditModal = (gunung) => {
    setCurrentGunung(gunung);
    setIsAddMode(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentGunung(null);
    setIsAddMode(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (isAddMode) {
      // Add new gunung
      await dispatch(createGunung(currentGunung));
    } else {
      // Edit existing gunung
      await dispatch(editGunung(currentGunung));
    }
    dispatch(fetchGunung());
    closeModal();
  };

  const handleInputChange = (event) => {
    setCurrentGunung({
      ...currentGunung,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="relative overflow-x-auto shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4 bg-gray-100 p-4 rounded-t-lg">
        <h2 className="text-2xl font-bold text-gray-700">Daftar Gunung</h2>
        <div className="space-x-2">
          <button
            onClick={openAddModal}
            className="text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded-lg shadow-md transition duration-300"
          >
            Add Gunung
          </button>
          <Link to="/korban" className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md transition duration-300">
            Daftar Korban
          </Link>
        </div>
      </div>

      <table className="w-full text-sm text-left text-gray-500 bg-white border border-gray-300">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Nama Gunung</th>
            <th scope="col" className="px-6 py-3">Ketinggian (m)</th>
            <th scope="col" className="px-6 py-3">Lokasi</th>
            <th scope="col" className="px-6 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {gunung.length > 0 ? (
            gunung.map((g) => (
              <tr key={g.id} className="bg-white border-b">
                <td className="px-6 py-4 font-medium text-gray-900">{g.name}</td>
                <td className="px-6 py-4">{g.ketinggian}</td>
                <td className="px-6 py-4">{g.lokasi}</td>
                <td className="px-6 py-4 flex space-x-4">
                  <button
                    onClick={() => openEditModal(g)}
                    className="text-yellow-500 hover:text-orange-700 font-semibold transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(g.id)}
                    className="text-red-500 hover:text-red-700 font-semibold transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center text-gray-500 italic">
                Tidak ada data gunung
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">{isAddMode ? 'Add Gunung' : 'Edit Gunung'}</h3>
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
                  {isAddMode ? 'Tambah' : 'Simpan'}
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
