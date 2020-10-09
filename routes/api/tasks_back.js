const express = require('express');
const db = require('../../db/models');
const {asyncHandler} = require('../utils')
const { Task } = db

const router = express.Router();

//Functionality to display all tasks for a list will be found under lists
// find all the tasks so that they can be displayed

// router.get('/:id/tasks', asyncHandler(async (req, res) => {
//   const listId = parseInt(req.params.id, 10)
//   const tasks = await Task.findAll({


// /api/tasks/id will return one task with the id of id
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  // console.log(req.params.id)
  const taskId = parseInt(req.params.id, 10)
  const tasks = await Task.findOne({
    where: {
      id: taskId
    }
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
  const deletedTask = await Task.destroy({
    where: {
      id: Number(taskId) }
  })

  res.json({deletedTask: taskId})
}))


module.exports = router;
