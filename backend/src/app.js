const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const safetyTipRoutes = require('./routes/safetyTipRoutes');
const emergencyNumberRoutes = require('./routes/emergencyNumberRoutes');
const emergencyPhraseRoutes = require('./routes/emergencyPhraseRoutes');
const safetyPanelRoutes = require('./routes/safetyPanelRoutes');

const app = express();

// --- Core middleware ---
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || '*',
  })
);
app.use(express.json());
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// --- Health check ---
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'TravelMate Sri Lanka API is running' });
});

// --- Routes ---
// Single call that returns everything SafetyPanel.jsx currently pulls from safetyTips.json
app.use('/api/safety-panel', safetyPanelRoutes);

// Granular REST resources, for CRUD / admin use or finer-grained frontend queries
app.use('/api/safety-tips', safetyTipRoutes);
app.use('/api/emergency-numbers', emergencyNumberRoutes);
app.use('/api/emergency-phrases', emergencyPhraseRoutes);

// --- 404 handler ---
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// --- Central error handler ---
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
  });
});

module.exports = app;
