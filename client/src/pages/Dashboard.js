import React, { useEffect, useState, useCallback } from 'react';
import apiClient from '../api/apiClient';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import { FiEdit2, FiTrash2, FiUser, FiLogOut, FiSearch } from 'react-icons/fi';

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', id: null });
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    try {
      let res;
      if (search.trim()) {
        res = await apiClient.get(`/notes/search/${encodeURIComponent(search.trim())}`);
      } else {
        res = await apiClient.get('/notes');
      }
      setNotes(res.data);
    } catch (err) {
      console.error('Error fetching notes', err);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      if (form.id) {
        await apiClient.put(`/notes/${form.id}`, {
          title: form.title,
          content: form.content
        });
      } else {
        await apiClient.post('/notes', {
          title: form.title,
          content: form.content
        });
      }
      setForm({ title: '', content: '', id: null });
      fetchNotes();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || 'Error saving note');
    }
  };

  const handleEdit = note => {
    setForm({ title: note.title, content: note.content, id: note._id });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to form on edit
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await apiClient.delete(`/notes/${id}`);
      fetchNotes();
    } catch (err) {
      console.error('Delete error', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-indigo-700 tracking-wide">My Notes</h1>
        <div className="flex space-x-4 items-center">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 transition"
            title="Profile"
          >
            <FiUser />
            <span className="hidden sm:inline">Profile</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 text-red-600 hover:text-red-800 transition"
            title="Logout"
          >
            <FiLogOut />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="relative mb-6">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search notes..."
          className="input pl-10 pr-4"
          aria-label="Search notes"
        />
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-white p-6 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
        aria-label="Add or update note form"
      >
        {error && <p className="text-red-500 mb-3 font-semibold">{error}</p>}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="input font-semibold text-indigo-900"
          required
          maxLength={100}
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Content"
          className="input h-32 resize-y"
          required
          maxLength={1000}
        />
        <button type="submit" className="btn btn-indigo w-full mt-2 font-semibold text-lg">
          {form.id ? 'Update Note' : 'Add Note'}
        </button>
      </form>

      <section aria-live="polite" aria-busy={loading}>
        {loading ? (
          <p className="text-center text-gray-500">Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="text-center text-gray-400 italic">No notes found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {notes.map(note => (
              <article
                key={note._id}
                className="p-4 bg-gradient-to-br from-white via-indigo-50 to-white rounded-xl shadow-md hover:shadow-2xl transition-shadow cursor-pointer"
                onClick={() => handleEdit(note)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleEdit(note);
                }}
                aria-label={`Note titled ${note.title}`}
              >
                <h2 className="text-xl font-semibold mb-2 text-indigo-700">{note.title}</h2>
                <p className="text-gray-700 mb-4 whitespace-pre-line max-h-32 overflow-y-auto">{note.content}</p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(note);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 flex items-center space-x-1"
                    aria-label={`Edit note ${note.title}`}
                  >
                    <FiEdit2 />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(note._id);
                    }}
                    className="text-red-600 hover:text-red-900 flex items-center space-x-1"
                    aria-label={`Delete note ${note.title}`}
                  >
                    <FiTrash2 />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
