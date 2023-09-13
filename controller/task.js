const Task = require('../model/task');
const asyncWrapper = require('../middleware/asyncWrapper');
const {createCustomError} = require("../error/customError")


// get all tasks
const getAllTasks = asyncWrapper( async (req, res, next) => {
    const tasks = await Task.find({})
    res.status(200).json({tasks: tasks})
})

// create a new task
const createTask = asyncWrapper( async (req, res, next) => {
    const task = await Task.create(req.body)
    res.status(201).json({task: task})
})

// get one task
const getTask = asyncWrapper( async (req, res, next) => {
    const { id: TaskId } = req.params;
    const task = await Task.findOne({ _id:TaskId });
    
    if (!task) {
        return next(createCustomError(404, 'No task with id ' + TaskId));
    }
    res.status(200).json({ task: task })
})

// update task
const updateTask = asyncWrapper( async (req, res, next) => { 
    const { id: taskId } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, { new: true, runValidators: true })
    
    if (!task) {
        return next(createCustomError(404, "No task with id " + taskId))
    }
    res.status(200).json({ task: task })
})

// delete task
const deleteTask = asyncWrapper( async (req, res, next) => { 
    const { id: taskId } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskId })

    if (!task) {
        return next(createCustomError(404, "No task with id " + taskId))
    }
    res.status(200).json({ task: task })
})


module.exports = {
    createTask,
    getAllTasks,
    getTask,
    updateTask,
    deleteTask
}