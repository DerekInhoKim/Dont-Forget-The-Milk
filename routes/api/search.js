const express = require("express");
const router = express.Router();
const { User, List, Task } = require("../../db/models");
const { asyncHandler } = require('../../utils');
const { Op } = require("sequelize");

router.get('/:searchStr', asyncHandler(async (req, res) => {

  // const { searchString } = req.body;
  // const searchString = 'buy';
  // console.log("REQ BODY:", req.body)
    const searchString = req.params.searchStr;

  // Find matching tasks ======================================================
  const matchingTasks = await Task.findAll({
    where: {
      taskName: {
        [Op.iLike]: `%${searchString}%`,
      }
    }
  });

  if (matchingTasks.length === 0) {
    console.log("No Matches Found For LISTS");
  } else {
    matchingTasks.forEach(task => {
      console.log(`MATCHING LISTS: ${task.taskName}`);
    })
  }

  res.json({ matchingTasks });

}));

module.exports = router;