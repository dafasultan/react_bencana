import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGunung, removeGunung, editGunung, createGunung } from '../redux/action';
import { Link } from 'react-router-dom';

const GunungTable = () => {
  const dispatch = useDispatch();
  const gunung = useSelector((state) => state.gunung);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentGunung, setCurrentGunung] = useState(null);
  const [newGunung, setNewGunung] = useState({
    name: '',
    ketinggian: '',
    lokasi: '',
  });

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

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewGunung({
      name: '',
      ketinggian: '',
      lokasi: '',
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentGunung((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewInputChange = (event) => {
    const { name, value } = event.target;
    setNewGunung((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await dispatch(editGunung(currentGunung));
    dispatch(fetchGunung());
    closeModal();
  };

  const handleAddFormSubmit = async (event) => {
    event.preventDefault();
    await dispatch(createGunung(newGunung));
    dispatch(fetchGunung());
    closeAddModal();
  };

  return (
    <div className="relative overflow-x-auto shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4 bg-gray-100 p-4 rounded-t-lg">
        <h2 className="text-2xl font-bold text-gray-700">Daftar Gunung</h2>
        <div className="flex space-x-4">
          <Link
            to="/korban"
            className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md transition duration-300"
          >
            Daftar Korban
          </Link>
          <button
            onClick={openAddModal}
            className="text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded-lg shadow-md transition duration-300"
          >
            Add Data Gunung
          </button>
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
                    onClick={() => openModal(g)}
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

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Add Data Gunung</h3>
            <form onSubmit={handleAddFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Nama Gunung</label>
                <input
                  type="text"
                  name="name"
                  value={newGunung.name}
                  onChange={handleNewInputChange}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Ketinggian (m)</label>
                <input
                  type="number"
                  name="ketinggian"
                  value={newGunung.ketinggian}
                  onChange={handleNewInputChange}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Lokasi</label>
                <input
                  type="text"
                  name="lokasi"
                  value={newGunung.lokasi}
                  onChange={handleNewInputChange}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeAddModal}
                  className="px-4 py-2 bg-gray-200 rounded-md"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
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
