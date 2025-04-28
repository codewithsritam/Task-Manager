const exprerss = require('express');
const router = exprerss.Router();
const addUser = require('../controller/users/add-user.controller');
const listOfUsers = require('../controller/users/list-of-users.controller');

router.post('/', addUser);
router.get('/', listOfUsers);

module.exports = router;