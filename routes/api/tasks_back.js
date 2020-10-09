const express = require('express');
const db = require('../../db/models');
const {asyncHandler} = require('../utils')
const { Task } = db

const router = express.Router();

//Functionality to display all tasks for a list will be found under lists


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




module.exports = router;
