const express = require('express');
const db = require('../../db/models');
const {asyncHandler} = require('../utils')
const { Task } = db

const router = express.Router();



router.put('/:id/update-task', asyncHandler( async (req, res) => {

  const {taskName, dueDate, description, taskId} = req.body;
  console.log(req.body)
  const task = await Task.findOne({
    where: {
      id: Number(taskId)
    }
  });


 await task.update({
    taskName: taskName,
    dueDate: dueDate,
    description: description,
    where: {id: taskId}
  });
  console.log(task)
  res.json({ task })
}));


module.exports = router;
