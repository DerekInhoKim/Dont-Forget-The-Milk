const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");


const { asyncHandler, handleValidationErrors } = require("../utils");
const { getUserToken } = require("../../auth");
const { User, List, Task } = require("../../db/models");

const router = express.Router();

const signupValidations = [
  check("userName")
    .exists({ checkFalsy: true })
    .withMessage("A username is required.")
    .isLength({ min: 3, max: 50 })
    .withMessage("A username must be between 3 and 50 characters."),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("A first name is required.")
    .isLength({ min: 1, max: 50 })
    .withMessage("A first name must be between 1 and 50 characters."),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("A last name is required.")
    .isLength({ min: 1, max: 50 })
    .withMessage("A last name must be between 1 and 50 characters."),
];

const sharedAuthValidations = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("A valid email address is required")
    .isLength({ max: 100 })
    .withMessage("Email address must be less than 100 characters"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("User password is required"),
];

//sign up
router.post("/",
  signupValidations,
  sharedAuthValidations,
  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please confirm your password")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Confirm Password field does not match password."),
  handleValidationErrors,
  asyncHandler(async(req, res) => {
    const {
      userName,
      firstName,
      lastName,
      email,
      password,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create(
      {
       firstName,
       lastName,
       userName,
       email,
       hashedPassword
      }
    );

    const token = await getUserToken(user);

    res.status(201).json({
      user: { id: user.id },
      token
    });
  })
);


// sign in
router.post("/token", sharedAuthValidations,
  asyncHandler(async(req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne(
      {
        where: { email }
      }
    );

    if (!user || !user.validatePassword(password)) {
      const error = new Error("Invalid credentials");
      error.status = 401;
      error.title = "Invalid credentials";
      error.errors = ["Unable to authenticate provided information. Please check user name and/or password."];
      return next(error);
    }

    const token = getUserToken(user);
    res.json({ token, user: { id: user.id }});
  })
);

// /api/users/userId/lists
// Display all lists for a specific user
router.get('/:userId(\\d+)/lists', asyncHandler(async(req,res) => {
  const lists = await List.findAll({
    where: {
      userId: req.params.userId
    },
    include: [{ model: Task, as:"task" } ],
    order: [['createdAt', 'DESC']],
  });

  res.json({lists});

}));

const validateList = [
  check('listName')
    .exists({checkFalsy: true})
    .withMessage("List name can't be undefined."),
  check('listName')
    .isLength({max: 50})
    .withMessage("List can't be longer than 50 characters."),
  handleValidationErrors,
];

// /api/users/userId/lists
// Add a new list to a user
router.post('/:userId(\\d+)/lists', validateList, asyncHandler(async(req,res,next) => {
  const userId = req.params.userId
  const {listName} = req.body;

  const list = await List.create({listName, userId});
  res.json({list});

}));





///gettin all the lists for specific user
router.get('/:id/lists', asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  console.log(userId);
  const lists = await List.findAll({
    where: {
      userId
    },
    // include: [{ model: Task,as:"task",attributes: ['taskName'] } ],
    order: [['createdAt', 'DESC']],
  });
  res.json({ lists });
}));

///validate list
// const validateList = [
//   check('listName')
//     .exists({ checkFalsy: true })
//     .withMessage("List name can't be undefined."),
//   check('listName')
//     .isLength({ max: 50 })
//     .withMessage("List can't be longet than 50 characters."),
//   handleValidationErrors,
// ];

//creating a new list for specific user

router.post('/:id/lists', validateList, asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const { listName } = req.body;
  console.log(req.params);
  const list = await List.create({ listName, userId });
  res.json({ list });
}));
module.exports = router;
