const express = require('express');
const router = express.Router();

const user = require('../app/api/user');
const auth = require('../app/api/auth');
const animal = require('../app/api/animal');

router.use('/user', user);
router.use('/auth', auth);
router.use('/animal', animal);

module.exports = router;