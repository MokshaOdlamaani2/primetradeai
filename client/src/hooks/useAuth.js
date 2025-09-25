// src/hooks/useAuth.js
import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await apiClient.get('/profile');
      setUser(res.data);
    } catch (err) {
      console.error('Failed to fetch profile', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { user, setUser, loading };
}
