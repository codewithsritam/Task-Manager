const exprerss = require('express');
const router = exprerss.Router();
const addUser = require('../controller/users/add-user.controller');
const { listOfUsers, getUser } = require('../controller/users/list-of-users.controller');
const editUser = require('../controller/users/edit-user.controller');
const deleteUsers = require('../controller/users/delete-user.controller');
const verifyToken = require('../middleware/verify-token');
const loginUser = require('../controller/users/login-user.controller');

router.post('/', addUser);
router.post('/login', loginUser);
router.get('/lists', listOfUsers);
router.get('/', verifyToken, getUser);
router.put('/:id', editUser);
router.delete('/', deleteUsers);

module.exports = router;