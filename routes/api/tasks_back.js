const express = require('express');
const db = require('../../db/models');
const {asyncHandler} = require('../utils')
const { Task } = db

const router = express.Router();

router.get('/:id/tasks', asyncHandler(async (req, res) => {
  console.log(req.params.id)
  const listId = parseInt(req.params.id, 10)
  const tasks = await Task.findAll({

    where: { listId }
  })
  res.json({tasks})
}))

router.get('/:id/tasks/:id')

// api/lists/userId/tasks/taskId
// returns all tasks
//




module.exports = router;
