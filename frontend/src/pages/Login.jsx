import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      console.log(res.data);
      setSuccess('Login successful!');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Check server.');
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 to-gray-100 space-y-6">
      <h2 className="font-sevillana text-3xl text-white">
        Employee Management System
      </h2>
      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
            <input
              type="email"
              className="w-full px-3 py-3 border"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password:
            </label>
            <input
              type="password"
              className="w-full px-3 py-3 border"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="w-full bg-teal-600 text-white py-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
