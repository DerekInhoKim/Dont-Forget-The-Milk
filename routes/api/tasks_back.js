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

router.get('/:id/list/task')

// api/lists/userId/tasks/taskId
// returns all tasks
// localStorage.getItem(userid)
// /api/lists/listId return info on one list
// /api/lists/listId/tasks/ return a list of all tasks assocaited with the list
// /api/lists/listId/tasks/id return info on one task


module.exports = router;
