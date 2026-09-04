const express = require('express');
const cors = require('cors');
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
// Uncomment and create these files as your team builds them out:
// const destinationRoutes = require('./routes/destinations');
// const itineraryRoutes = require('./routes/itinerary');
// const transportRoutes = require('./routes/transport');

// app.use('/api/destinations', destinationRoutes);
// app.use('/api/itinerary', itineraryRoutes);
// app.use('/api/transport', transportRoutes);

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});