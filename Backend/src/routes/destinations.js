const express = require('express');
const Destination = require('../models/Destination');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const destinations = await Destination.find();
    return res.json(destinations);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/filter', async (req, res) => {
  try {
    const { interest } = req.query;
    const destinations = await Destination.find({ tags: interest });
    return res.json(destinations);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;