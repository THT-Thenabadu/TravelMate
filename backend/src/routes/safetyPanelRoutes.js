const express = require('express');
const router = express.Router();
const { getSafetyPanelData } = require('../controllers/safetyPanelController');

router.get('/', getSafetyPanelData);

module.exports = router;
