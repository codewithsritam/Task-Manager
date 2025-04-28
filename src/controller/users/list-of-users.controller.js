const User = require('../../model/user.model');
const asyncHandler = require('../../utils/asyncHandler');
const sendApiResponse = require('../../utils/responseUtils');
const bcrypt = require('bcrypt');

// List all users
const listOfUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}, { __v: 0, password: 0 }).lean();
    if (!users || users.length === 0) {
        return sendApiResponse(res, 404, 'No users found');
    }

    return sendApiResponse(res, 200, 'List of users', users);
}); 

// Individual user details
const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id, { __v: 0 }).lean();
    if (!user) {
        return sendApiResponse(res, 404, 'User not found');
    }

    // replace 
    
    

    return sendApiResponse(res, 200, 'User details', user);
})

module.exports = {
    listOfUsers,
    getUser,
};