const Task = require('../../model/task.model');
const asyncHandler = require("../../utils/asyncHandler");
const sendApiResponse = require("../../utils/responseUtils");

// List all tasks for a user
const listOfTasks = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const tasks = await Task.find({createdBy: userId})
        .populate('createdBy', 'name email')
        .sort({ createdAt: -1 })
        .lean();

    if (!tasks) {
        return sendApiResponse(res, 404, "No tasks found");
    }

    return sendApiResponse(res, 200, "Tasks retrieved successfully", {
        tasks: tasks
    });
});

// each task
const getTask = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const taskId = req.params.taskId;
    const task = await Task.findOne({ _id: taskId, createdBy: userId })
        .populate('createdBy', 'name email')
        .lean();    

    if (!task) {
        return sendApiResponse(res, 404, "No tasks found");
    }

    return sendApiResponse(res, 200, "Task retrieved successfully", {
        task: task
    });
});

module.exports = {
    listOfTasks,
    getTask
};