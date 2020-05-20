const express = require('express');
const router = express.Router();
const controller = require('./event.controller')

router.get('/', controller.get);
router.get('/dashboard', controller.dashboard);
router.post('/', controller.create);
router.post('/upload/:id', controller.upload);
router.put('/action/:id', controller.action);

module.exports = router;
