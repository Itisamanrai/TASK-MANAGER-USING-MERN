const TaskModel = require("../Models/TaskModel");

const isValidTaskName = (value) => typeof value === 'string' && value.trim().length > 0;
const isValidIsDone = (value) => typeof value === 'boolean';

const createTask = async (req, res) => {
    const data = req.body || {};
    if (!isValidTaskName(data.taskName) || !isValidIsDone(data.isDone)) {
        return res.status(400).json({ message: 'Invalid payload', success: false });
    }

    try {
        const model = new TaskModel({
            taskName: data.taskName.trim(),
            isDone: data.isDone
        });
        await model.save();
        res.status(201)
            .json({ message: 'Task is created', success: true });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create task', success: false });
    }
}

const fetchAllTasks = async (req, res) => {
    try {
        const data = await TaskModel.find({});
        res.status(200)
            .json({ message: 'All Tasks', success: true, data });
    } catch (err) {
        res.status(500).json({ message: 'Failed to get all tasks', success: false });
    }
}


const updateTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body || {};
        if (!isValidTaskName(body.taskName) || !isValidIsDone(body.isDone)) {
            return res.status(400).json({ message: 'Invalid payload', success: false });
        }

        const obj = { $set: { ...body } };
        const updatedTask = await TaskModel.findByIdAndUpdate(id, obj);
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found', success: false });
        }
        res.status(200)
            .json({ message: 'Task Updated', success: true });
    } catch (err) {
        res.status(500).json({ message: 'Failed to updated task', success: false });
    }
}


const deleteTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedTask = await TaskModel.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found', success: false });
        }
        res.status(200)
            .json({ message: 'Task is deleted', success: true });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete task', success: false });
    }
}

module.exports = {
    createTask,
    fetchAllTasks,
    updateTaskById,
    deleteTaskById
}
