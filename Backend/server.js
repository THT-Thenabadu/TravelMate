const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const preferenceRoutes = require('./src/routes/preferenceRoutes');
const destinationRoutes = require('./src/routes/destinations');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route — confirms the server is alive
app.get('/', (req, res) => {
  res.json({ message: 'TravelMate backend is running' });
});

// --- Routes ---
app.use('/api/preferences', preferenceRoutes);
app.use('/api/destinations', destinationRoutes);

// --- Basic error handling for unmatched routes ---
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// --- Generic error handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();