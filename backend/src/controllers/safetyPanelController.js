const SafetyTip = require('../models/SafetyTip');
const EmergencyNumber = require('../models/EmergencyNumber');
const EmergencyPhrase = require('../models/EmergencyPhrase');
const seedData = require('../data/seedData');

const CATEGORY_LIST = [
  'All',
  'Emergency & Helplines',
  'Solo Female Safety',
  'Transport & Scams',
  'Health & Food',
  'Culture & Laws',
];

// @desc    Get everything the SafetyPanel component needs in one payload
// @route   GET /api/safety-panel
// @access  Public
const getSafetyPanelData = async (req, res) => {
  try {
    let safetyTips = [];
    let emergencyNumbers = [];
    let emergencyPhrases = [];

    // Attempt MongoDB query if connected
    try {
      [safetyTips, emergencyNumbers, emergencyPhrases] = await Promise.all([
        SafetyTip.find().sort({ createdAt: 1 }),
        EmergencyNumber.find().sort({ priorityOrder: 1 }),
        EmergencyPhrase.find().sort({ order: 1 }),
      ]);
    } catch (dbErr) {
      console.log('Serving seed fallback data due to DB query state.');
    }

    // Fallback to seedData if database collections are empty
    if (!emergencyNumbers || emergencyNumbers.length === 0) {
      emergencyNumbers = seedData.emergencyNumbers;
    } else {
      emergencyNumbers = emergencyNumbers.map((n) => ({
        id: n.numberId,
        name: n.name,
        number: n.number,
        displayNumber: n.displayNumber,
        tel: n.tel,
        description: n.description,
        category: n.category,
        badge: n.badge,
        color: n.color,
      }));
    }

    if (!safetyTips || safetyTips.length === 0) {
      safetyTips = seedData.safetyTips.map((t) => ({
        id: t.tipId,
        title: t.title,
        category: t.category,
        riskLevel: t.riskLevel,
        summary: t.summary,
        details: t.details,
        tags: t.tags,
        icon: t.icon,
      }));
    } else {
      safetyTips = safetyTips.map((t) => ({
        id: t.tipId,
        title: t.title,
        category: t.category,
        riskLevel: t.riskLevel,
        summary: t.summary,
        details: t.details,
        tags: t.tags,
        icon: t.icon,
      }));
    }

    if (!emergencyPhrases || emergencyPhrases.length === 0) {
      emergencyPhrases = seedData.emergencyPhrases;
    } else {
      emergencyPhrases = emergencyPhrases.map((p) => ({
        sinhala: p.sinhala,
        tamil: p.tamil,
        english: p.english,
        pronunciation: p.pronunciation,
      }));
    }

    res.status(200).json({
      success: true,
      source: 'express_backend',
      data: {
        emergencyNumbers,
        categories: CATEGORY_LIST,
        safetyTips,
        emergencyPhrases,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getSafetyPanelData };
