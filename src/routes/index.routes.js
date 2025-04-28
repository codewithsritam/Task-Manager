const express = require('express');
const router = express.Router();
const User = require('./user.routes');

router.use('/user', User);

module.exports = router;