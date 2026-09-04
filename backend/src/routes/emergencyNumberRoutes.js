const express = require('express');
const router = express.Router();
const {
  getEmergencyNumbers,
  createEmergencyNumber,
  updateEmergencyNumber,
  deleteEmergencyNumber,
} = require('../controllers/emergencyNumberController');

router.route('/').get(getEmergencyNumbers).post(createEmergencyNumber);
router.route('/:numberId').put(updateEmergencyNumber).delete(deleteEmergencyNumber);

module.exports = router;
