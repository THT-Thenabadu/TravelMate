const mongoose = require('mongoose');

const tripPreferenceSchema = new mongoose.Schema(
  {
    days: {
      type: Number,
      required: true,
      min: 1,
    },
    budget: {
      type: Number,
      required: true,
      min: 1,
    },
    startingLocation: {
      type: String,
      required: true,
      trim: true,
    },
    interests: {
      type: [String],
      required: true,
      validate: {
        validator: (interests) => interests.length > 0,
        message: 'Select at least one interest',
      },
    },
    travelStyle: {
      type: String,
      required: true,
      enum: ['Backpacker', 'Mid-range', 'Luxury'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TripPreference', tripPreferenceSchema);
