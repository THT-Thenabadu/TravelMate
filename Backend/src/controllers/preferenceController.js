const TripPreference = require('../models/TripPreference');

const createPreference = async (req, res, next) => {
  try {
    const { days, budget, startingLocation, interests, travelStyle } = req.body;

    if (!days || !budget || !startingLocation?.trim() || !Array.isArray(interests) || interests.length === 0 || !travelStyle) {
      return res.status(400).json({ error: 'All trip preference fields are required.' });
    }

    const preference = await TripPreference.create({
      days: Number(days),
      budget: Number(budget),
      startingLocation,
      interests,
      travelStyle,
    });

    return res.status(201).json({
      message: 'Trip preferences saved successfully.',
      preference,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    return next(error);
  }
};

module.exports = { createPreference };
