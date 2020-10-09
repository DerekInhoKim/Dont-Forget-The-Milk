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
