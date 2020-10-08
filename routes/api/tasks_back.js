const express = require('express');
const db = require('../../db/models');
const {asyncHandler} = require('../utils')
const { Task } = db

const router = express.Router();

// find all the tasks so that they can be displayed

router.get('/:id/tasks', asyncHandler(async (req, res) => {
  const listId = parseInt(req.params.id, 10)
  const tasks = await Task.findAll({

    where: { listId }
  })

  res.json({tasks})
}))

// create a new task and store it in the database

router.post('/:id/tasks/create-task', asyncHandler( async (req, res) => {

  const { newTask, listId } = req.body;
  const task = await Task.create({
    taskName: newTask,
    listId: listId
  })
  console.log(task)
  res.json({ task })
}))

// delete task and update the database

router.delete('/:id/tasks/delete-task', asyncHandler(async (req, res) => {

  const {taskId} = req.body;
  console.log('req.body:', req.body)
  console.log('taskId:', taskId)
  const deleteTask = await Task.destroy({
    where: {
      id: Number(taskId) }
  })

  res.json({response})
}))


module.exports = router;
