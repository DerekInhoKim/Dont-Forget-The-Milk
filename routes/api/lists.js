const express = require('express');
const {check} = require('express-validator');
const {handleValidationErrors, asyncHandler} = require('../utils');
// const {requireAuth} = require('../../auth');
const router = express.Router();
const db = require('../../db/models');

const { User, List, Task} = db;

// { model: User, as: 'user', attributes: ['username'] },

// router.use(requireAuth);

// router.get('/:id', asyncHandler(async(req,res) => {
//   const userId = parseInt(req.params.id, 10);
//   const lists = await List.findAll({
//     where: {
//       userId
//     },
//     // include: [{ model: Task,as:"task",attributes: ['taskName'] } ],
//     order: [['createdAt', 'DESC']],
//   });
//   res.json({lists});
// }));

const validateList = [
  check('listName')
    .exists({checkFalsy: true})
    .withMessage("List name can't be undefined."),
  check('listName')
    .isLength({max: 50})
    .withMessage("List can't be longet than 50 characters."),
  handleValidationErrors,
];


const listNotFoundError = (id) => {
  const err = Error('List not found');
  err.errors = [`List with the id of ${id} could not be found`];
  err.title = 'List not found';
  err.status = 404;
  return err;
};

// router.get('/:id', asyncHandler(async(req,res,next) => {
//   const list = await List.findOne({
//     where: {
//       id: req.params.id
//     }
//   });
//   if(list) {
//     res.json({list});
//   } else {
//     next(listNotFoundError(req.params.id));
//   }
// }));

// router.post('/:id/lists',validateList, asyncHandler(async(req,res,next) => {
//   const userId = req.params.id;
//   const {listName} = req.body;
//   console.log(req.params);
//   const list = await List.create({listName,userId});
//   res.json({list});
// }));

router.put('/:id', validateList, asyncHandler(async(req,res,next)=> {
  const list = await List.findOne({
    where: {
      id: req.params.id
    }
  });
  if(req.params.id !== list.userId) {
    const err = new Error('Unauthorized');
    err.status = 401;
    err.message = 'You are not authorized to edit this List';
    err.title = 'Unauthorized';
    throw err;
  }
  if(list) {
    await list.update({listName: req.body.listName});
    res.json({list});
  } else {
    next(listNotFoundError(req.params.id));
  }
}));

router.delete('/:id', asyncHandler(async(req,res,next) => {
  const list = await List.findOne({
    where: {
      id: req.params.id
    }
  });
  // if(req.params.id !== list.userId) {
  //   const err = new Error('Unauthorized');
  //   err.status = 401;
  //   err.message = 'You are not authorized to edit this List';
  //   err.title = 'Unauthorized';
  //   throw err;
  // }

  if(list) {
    await list.destroy();
    res.json({message:`Deleted list with id of ${req.params.id}!`});
  } else {
    next(listNotFoundError(req.params.id));
  }
}));

module.exports = router;
