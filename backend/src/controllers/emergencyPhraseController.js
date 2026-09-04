const EmergencyPhrase = require('../models/EmergencyPhrase');

// @desc    Get all emergency phrases, in display order
// @route   GET /api/emergency-phrases
// @access  Public
const getEmergencyPhrases = async (req, res) => {
  try {
    const phrases = await EmergencyPhrase.find().sort({ order: 1 });
    res.status(200).json({ success: true, count: phrases.length, data: phrases });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create an emergency phrase entry
// @route   POST /api/emergency-phrases
// @access  Public
const createEmergencyPhrase = async (req, res) => {
  try {
    const phrase = await EmergencyPhrase.create(req.body);
    res.status(201).json({ success: true, data: phrase });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getEmergencyPhrases,
  createEmergencyPhrase,
};
