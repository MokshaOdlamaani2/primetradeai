import React, { useState } from 'react';
import apiClient from '../api/apiClient';
import { useNavigate, Link } from 'react-router-dom';
import '../index.css';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (form.username.trim().length < 2) {
      setError('Username must be at least 2 characters');
      return;
    }

    const emailTrim = form.email.trim();
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(emailTrim)) {
      setError('Invalid email format');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const payload = {
        username: form.username.trim(),
        email: emailTrim.toLowerCase(),
        password: form.password,
      };
      const res = await apiClient.post('/auth/register', payload);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Register error in frontend:', err.response || err);
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="input"
          required
        />
        <button type="submit" className="btn">Register</button>

        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
