const User = require('../../model/user.model');
const asyncHandler = require('../../utils/asyncHandler');
const sendApiResponse = require('../../utils/responseUtils');

const listOfUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}, { __v: 0, password: 0 }).lean();
    if (!users || users.length === 0) {
        return sendApiResponse(res, 404, 'No users found');
    }

    return sendApiResponse(res, 200, 'List of users', users);
}); 

module.exports = listOfUsers;