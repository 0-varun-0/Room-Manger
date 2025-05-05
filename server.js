// server.js
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const rooms   = require('./routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static frontend
app.use(express.static(path.join(__dirname, 'public')));

// API
app.use('/api/rooms', rooms);

// 404 for unknown APIs
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
