const express = require('express')
const router = express.Router()
const { User, List, Task } = require("../../db/models");
const { asyncHandler } = require('../utils');
const { Op } = require("sequelize");

router.get('/', asyncHandler(async (req, res) => {
  const allLists = await List.findAll({
    include: Task

  });


  res.json({ allLists });

}));

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const listId = req.params.id
  const list = await List.findByPk(listId, {
    include: Task

  });


  res.json({ list });

}));

module.exports = router;
