const mongoose = require('mongoose');

const emergencyPhraseSchema = new mongoose.Schema(
  {
    english: {
      type: String,
      required: true,
    },
    sinhala: {
      type: String,
      required: true,
    },
    tamil: {
      type: String,
      required: true,
    },
    pronunciation: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('EmergencyPhrase', emergencyPhraseSchema);
