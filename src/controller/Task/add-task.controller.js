const Task = require("../../model/task.model");
const asyncHandler = require("../../utils/asyncHandler");
const sendApiResponse = require("../../utils/responseUtils");

const addTask = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const task = new Task({
        ...req.body,
        createdBy: userId
    });

    await task.save();

    return sendApiResponse(res, 200, 'Task added successfully', {
        task: task
    });
});

module.exports = addTask;