const express = require('express');
const db = require('../../db/models');
const {asyncHandler} = require('../utils')
const { Task } = db

const router = express.Router();

router.get('/:id/tasks', asyncHandler(async (req, res) => {
  const listId = parseInt(req.params.id, 10)
  const tasks = await Task.findAll({

    where: { listId }
  })

  res.json({tasks})
}))



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
