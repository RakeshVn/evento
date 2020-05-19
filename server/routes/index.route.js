const express = require('express');
const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// router.use('/auth', authRoutes);
// router.use('/user', userRoutes);
router.use('/event', require('../controllers/event'));
router.use('/auth', require('../controllers/user'));

module.exports = router;
