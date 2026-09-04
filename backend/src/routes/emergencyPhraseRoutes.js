const express = require('express');
const router = express.Router();
const {
  getEmergencyPhrases,
  createEmergencyPhrase,
} = require('../controllers/emergencyPhraseController');

router.route('/').get(getEmergencyPhrases).post(createEmergencyPhrase);

module.exports = router;
