const express = require('express');
const router = express.Router();
const controller = require('./event.controller')

router.post('/', controller.create);
router.post('/upload/:id', controller.upload);

module.exports = router;
