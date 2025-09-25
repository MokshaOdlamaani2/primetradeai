// server.js (corrected)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const notesRoutes = require('./routes/notes'); // ✅ Include this

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Optional debug logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} -- Body:`, req.body);
  next();
});

// ✅ Route handlers
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/notes', notesRoutes); // ✅ Mount the /notes routes

// Health check
app.get('/', (req, res) => {
  res.send('API is running.');
});

// Connect DB and start server
const PORT = process.env.PORT || 5000;

 mongoose.connect(process.env.MONGO_URI)

  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Connection error', err.message);
  });
