const express = require('express');
const router = express.Router();
const User = require('./user.routes');
const Task = require('./task.routes');

router.use('/users', User);
router.use('/tasks', Task);

module.exports = router;