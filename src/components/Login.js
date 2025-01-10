import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Both email and password are required!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        setError('');
        navigate('/korban');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || 'Login failed. Please check your credentials.');
      } else {
        setError('Login failed. Please try again later.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Login
            </button>
            <a
              href="/register"
              className="text-sm text-blue-500 hover:underline"
            >
              Belum punya akun?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
