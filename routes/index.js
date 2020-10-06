const express = require('express');
const db = require('../db/models');
const {asyncHandler} = require('../utils')
const { Task } = db

const router = express.Router();


router.get('/', asyncHandler(async (req, res) => {

  res.render('test-list')

}))

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const listId = parseInt(req.params.id, 10)
  const tasks = await Task.findAll({

    where: { listId }
  })

  res.render('test-tasks', {tasks})

}))




module.exports = router;
