// TESTING PURPOSES ONLY

const express = require('express')
const router = express.Router()
const { User, List, Task } = require("../../db/models");
const { asyncHandler } = require('../utils');
const { Op } = require("sequelize");

//Display all lists for a user
router.get('/', asyncHandler(async (req, res) => {
  const allLists = await List.findAll({
    include: Task

  });


  res.json({ allLists });

}));

//Display all tasks for a specific list.
router.get('/:id/tasks', asyncHandler(async (req, res) => {
  const listId = parseInt(req.params.id, 10)
  const tasks = await Task.findAll({

    where: { listId }
  })
  res.json({tasks})

}))

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const listId = req.params.id
  const list = await List.findByPk(listId, {
    include: Task

  });


  res.json({ list });

}));

module.exports = router;
