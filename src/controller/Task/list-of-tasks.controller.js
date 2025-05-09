const Task = require('../../model/task.model');
const asyncHandler = require("../../utils/asyncHandler");
const sendApiResponse = require("../../utils/responseUtils");
const mongoose = require('mongoose');


// List all tasks for a user
const listOfTasks = asyncHandler(async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    let tasks = await Task.aggregate([
        { $match: { createdBy: userId } },

        {
            $group: {
                _id: "$dueDate",
                tasks: {
                    $push: {
                        title: "$title",
                        description: "$description",
                        status: "$status",
                        priority: "$priority",
                    }
                }
            }
        },

        {
            $addFields: {
                weekday: {
                    $cond: [
                        { $ifNull: ["$_id", false] },
                        { $dayOfWeek: "$_id" }, // returns 1 (Sunday) to 7 (Saturday)
                        null
                    ]
                },
                date: {
                    $cond: [
                        { $ifNull: ["$_id", false] },
                        { $dateToString: { format: "%d %B %Y", date: "$_id" } },
                        "No Due Date"
                    ]
                }
            }
        },

        {
            $project: {
                _id: 0,
                weekday: 1,
                date: 1,
                tasks: 1
            }
        },

        {
            $sort: {
                date: 1
            }
        }
    ]);

    // Map numeric weekday to full name in JS
    const daysMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    tasks = tasks.map(task => ({
        day: typeof task.weekday === 'number' ? daysMap[(task.weekday - 1)] : "No Day",
        date: task.date,
        tasks: task.tasks
    }));

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