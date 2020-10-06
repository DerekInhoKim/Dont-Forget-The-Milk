const express = require("express");
const router = express.Router();
const { User, List, Task } = require("../../db/models");
const { asyncHandler } = require('../../utils');
const { Op } = require("sequelize");

router.get('/:searchStr(\\w+)', asyncHandler(async (req, res) => {
  let testArr = [
    "hello",
    "this",
    "is a",
    "test"
  ]
  
  // const matchStr = req.params.searchStr.match(/^[\w\-]+[^\?]+$/);
  // console.log("MATCH STRING!!!!!:   ", matchStr);
  // console.log('URL CHECK: ', req.originalUrl);
  console.log('URL CHECK: ',req.params.searchStr);

  // const { searchString } = req.body;
    const searchString = req.params.searchStr;

  // Find matching tasks ======================================================
  const matchingTasks = await Task.findAll({
    where: {
      taskName: {
        [Op.iLike]: `%${searchString}%`,
      }
    }
  });

  // Find matching lists ======================================================
  const matchingLists = await List.findAll({
    where: {
      listName: {
        [Op.iLike]: `%${searchString}%`,
      }
    }
  });


  if(matchingTasks.length === 0) {
    console.log("No Matches Found For TASKS");
  } else {
    matchingTasks.forEach(task => {
      console.log(`MATCHING TASKS: ${task.taskName}`);
    })
  }
  
  if (matchingLists.length === 0) {
    console.log("No Matches Found For LISTS");
  } else {
    matchingLists.forEach(list => {
      console.log(`MATCHING LISTS: ${list.listName}`);
    })
  }
  // res.send(`RESULTS: ${matchingTasks[0].taskName}`);
  // console.log("FIRST TASK: ", searchMatchList[0].taskName);
  res.send('DONE')

}));

module.exports = router;