const { createTask, getAllTasks, getTask, updateTask, deleteTask } = require('../controller/task');
const express = require('express');

const router = express.Router();

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;