const express = require('express');
const router = express.Router();
const User = require('./user.routes');

router.use('/users', User);

module.exports = router;