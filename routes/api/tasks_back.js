const express = require('express');
const db = require('../../db/models');
const {asyncHandler} = require('../utils')
const { Task } = db

const router = express.Router();

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const listId = parseInt(req.params.id, 10)
  const tasks = await Task.findAll({

    where: { listId }
  })
  res.json({tasks})
}))




module.exports = router;
