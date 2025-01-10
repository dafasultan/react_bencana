import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/action';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await dispatch(registerUser(formData));
    navigate('/login'); // Redirect to login page after successful registration
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-center mb-6">Registrasi User</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nama</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Masukkan nama Anda"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Masukkan email Anda"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Masukkan password Anda"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Daftar
            </button>
          </div>
        </form>
        <div className="mt-4 text-sm text-center">
          Sudah punya akun?{' '}
          <a
            href="/login"
            className="text-blue-500 hover:underline"
          >
            Masuk
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
