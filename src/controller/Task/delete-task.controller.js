const Task = require('../../model/task.model');
const asyncHandler = require('../../utils/asyncHandler');
const sendApiResponse = require('../../utils/responseUtils');

const deleteTasks = asyncHandler(async (req, res) => {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return sendApiResponse(res, 400, 'Invalid request. Please provide an array of tasks IDs.');
    }

    const deleteTask = await Task.deleteMany({ _id: { $in: ids }});
    if (deleteTask.deletedCount === 0) {
        return sendApiResponse(res, 404, 'No tasks found to delete.');
    }

    return sendApiResponse(res, 200, 'Tasks deleted successfully.', {
        deletedCount: deleteTask.deletedCount,
    });
}); 

module.exports = deleteTasks;