import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function Profile() {
  const [form, setForm] = useState({ username: '', email: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await apiClient.get('/profile');
      setForm({ username: res.data.username, email: res.data.email });
    } catch (err) {
      console.error('Profile fetch error', err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await apiClient.put('/profile', form);
      alert('Profile updated successfully');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || 'Update failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">My Profile</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="input"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          className="input"
          required
        />
        <button type="submit" className="btn">Save</button>
      </form>
    </div>
  );
}

export default Profile;
