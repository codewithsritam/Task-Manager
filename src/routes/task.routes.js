const express = require('express');
const router = express.Router();
const addTask = require('../controller/Task/add-task.controller');
const verifyToken = require('../middleware/verify-token');
const { listOfTasks, getTask } = require('../controller/Task/list-of-tasks.controller');
const editTask = require('../controller/Task/edit-task.controller');
const deleteTasks = require('../controller/Task/delete-task.controller');

router.post('/', verifyToken, addTask);
router.get('/', verifyToken, listOfTasks);
router.get('/:taskId', verifyToken, getTask);
router.put('/:taskId', verifyToken, editTask);
router.delete('/', verifyToken, deleteTasks);

module.exports = router;