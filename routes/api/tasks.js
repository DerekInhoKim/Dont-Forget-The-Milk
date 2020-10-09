const express = require('express');
const db = require('../../db/models');
const {asyncHandler} = require('../utils')
const { Task } = db

const router = express.Router();



router.post('/:id/tasks/create-task', asyncHandler( async (req, res) => {

  const { newTask, listId } = req.body;
  const task = await Task.create({
    taskName: newTask,
    listId: listId
  })
  console.log(task)
  res.json({ task })
}))


module.exports = router;
