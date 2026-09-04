const mongoose = require('mongoose');

const emergencyNumberSchema = new mongoose.Schema(
  {
    numberId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    displayNumber: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    badge: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'slate',
    },
    priorityOrder: {
      type: Number,
      default: 100,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('EmergencyNumber', emergencyNumberSchema);
