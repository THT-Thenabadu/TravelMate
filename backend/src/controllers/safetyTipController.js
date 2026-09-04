const SafetyTip = require('../models/SafetyTip');

// @desc    Get all safety tips, optionally filtered by category, riskLevel, search query
// @route   GET /api/safety-tips?category=&riskLevel=&search=
// @access  Public
const getSafetyTips = async (req, res) => {
  try {
    const { category, riskLevel, search } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (riskLevel && riskLevel !== 'All') {
      filter.riskLevel = riskLevel;
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { title: regex },
        { summary: regex },
        { details: regex },
        { tags: regex },
      ];
    }

    const tips = await SafetyTip.find(filter).sort({ riskLevel: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      count: tips.length,
      data: tips,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single safety tip by tipId
// @route   GET /api/safety-tips/:tipId
// @access  Public
const getSafetyTipById = async (req, res) => {
  try {
    const tip = await SafetyTip.findOne({ tipId: req.params.tipId });
    if (!tip) {
      return res.status(404).json({ success: false, message: 'Safety tip not found' });
    }
    res.status(200).json({ success: true, data: tip });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get distinct categories present in the collection
// @route   GET /api/safety-tips/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await SafetyTip.distinct('category');
    res.status(200).json({ success: true, data: ['All', ...categories] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new safety tip
// @route   POST /api/safety-tips
// @access  Public (add auth middleware if needed later)
const createSafetyTip = async (req, res) => {
  try {
    const tip = await SafetyTip.create(req.body);
    res.status(201).json({ success: true, data: tip });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a safety tip
// @route   PUT /api/safety-tips/:tipId
// @access  Public
const updateSafetyTip = async (req, res) => {
  try {
    const tip = await SafetyTip.findOneAndUpdate(
      { tipId: req.params.tipId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!tip) {
      return res.status(404).json({ success: false, message: 'Safety tip not found' });
    }
    res.status(200).json({ success: true, data: tip });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a safety tip
// @route   DELETE /api/safety-tips/:tipId
// @access  Public
const deleteSafetyTip = async (req, res) => {
  try {
    const tip = await SafetyTip.findOneAndDelete({ tipId: req.params.tipId });
    if (!tip) {
      return res.status(404).json({ success: false, message: 'Safety tip not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getSafetyTips,
  getSafetyTipById,
  getCategories,
  createSafetyTip,
  updateSafetyTip,
  deleteSafetyTip,
};
