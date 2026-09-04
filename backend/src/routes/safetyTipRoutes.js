const express = require('express');
const router = express.Router();
const {
  getSafetyTips,
  getSafetyTipById,
  getCategories,
  createSafetyTip,
  updateSafetyTip,
  deleteSafetyTip,
} = require('../controllers/safetyTipController');

router.get('/categories', getCategories);
router.route('/').get(getSafetyTips).post(createSafetyTip);
router
  .route('/:tipId')
  .get(getSafetyTipById)
  .put(updateSafetyTip)
  .delete(deleteSafetyTip);

module.exports = router;
