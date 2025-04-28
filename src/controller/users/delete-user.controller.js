const User = require('../../model/user.model');
const asyncHandler = require('../../utils/asyncHandler');
const sendApiResponse = require('../../utils/responseUtils');

const deleteUsers = asyncHandler(async (req, res) => {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return sendApiResponse(res, 400, 'Invalid request. Please provide an array of user IDs.');
    }

    const deleteUsers = await User.deleteMany({ _id: { $in: ids }});
    if (deleteUsers.deletedCount === 0) {
        return sendApiResponse(res, 404, 'No users found to delete.');
    }

    return sendApiResponse(res, 200, 'Users deleted successfully.', {
        deletedCount: deleteUsers.deletedCount,
    });
}); 

module.exports = deleteUsers;