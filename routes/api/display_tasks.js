// TESTING PURPOSES ONLY

const express = require('express');
const db = require('../../db/models');
const {asyncHandler} = require('../utils')
const { Task, List } = db

const router = express.Router();

const taskNotFoundError = (id) => {
  const err = Error("Task not found");
  err.errors = [`Task with id of ${id} could not be found.`];
  err.title = "Task not found.";
  err.status = 404;
  return err;
};

router.get('/', asyncHandler(async (req, res) => {
  const tasks = await Task.findAll({
    include: List

  })
  res.json({tasks})

}))

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const taskId = req.params.id
  const tasks = await Task.findOne({
    where: {
      id: taskId
    },
  })

  if(tasks) {
    res.json({tasks})

  } else {
    next(taskNotFoundError(taskId))
  }

}))




module.exports = router;
