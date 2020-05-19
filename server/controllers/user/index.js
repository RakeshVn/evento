const express = require('express');
const router = express.Router();
const controller = require('./user.controller')
const passport = require('passport');

router.post('/signup', controller.signup);
router.post('/signin', passport.authenticate('local', { session: false }), controller.signin);

module.exports = router;
