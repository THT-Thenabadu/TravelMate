const EmergencyNumber = require('../models/EmergencyNumber');

// @desc    Get all emergency numbers, sorted by priority
// @route   GET /api/emergency-numbers
// @access  Public
const getEmergencyNumbers = async (req, res) => {
  try {
    const numbers = await EmergencyNumber.find().sort({ priorityOrder: 1 });
    res.status(200).json({ success: true, count: numbers.length, data: numbers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create an emergency number entry
// @route   POST /api/emergency-numbers
// @access  Public
const createEmergencyNumber = async (req, res) => {
  try {
    const number = await EmergencyNumber.create(req.body);
    res.status(201).json({ success: true, data: number });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update an emergency number entry
// @route   PUT /api/emergency-numbers/:numberId
// @access  Public
const updateEmergencyNumber = async (req, res) => {
  try {
    const number = await EmergencyNumber.findOneAndUpdate(
      { numberId: req.params.numberId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!number) {
      return res.status(404).json({ success: false, message: 'Emergency number not found' });
    }
    res.status(200).json({ success: true, data: number });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete an emergency number entry
// @route   DELETE /api/emergency-numbers/:numberId
// @access  Public
const deleteEmergencyNumber = async (req, res) => {
  try {
    const number = await EmergencyNumber.findOneAndDelete({ numberId: req.params.numberId });
    if (!number) {
      return res.status(404).json({ success: false, message: 'Emergency number not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getEmergencyNumbers,
  createEmergencyNumber,
  updateEmergencyNumber,
  deleteEmergencyNumber,
};
