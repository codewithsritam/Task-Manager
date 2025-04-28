const Task = require('../../model/task.model');
const asyncHandler = require("../../utils/asyncHandler");
const sendApiResponse = require("../../utils/responseUtils");

const editTask = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const taskId = req.params.taskId;
    const { title, description, status, dueDate, priority } = req.body;

    const task = await Task.findOne({ _id: taskId, createdBy: userId })
        
    if (!task) {
        return sendApiResponse(res, 404, "No tasks found");
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;

    await task.save();

    return sendApiResponse(res, 200, "Tasks updated successfully", {
        task: task
    });
});

module.exports = editTask;