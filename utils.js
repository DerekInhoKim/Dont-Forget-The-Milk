<<<<<<< HEAD
const { validationResult } = require("express-validator");

// Async Handler function
=======
// Async Handler function

const { validationResult }= require('express-validator')
>>>>>>> master
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if(!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => error.msg)

    const err = new Error("Bad Request");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad Request";
    return next(err);
  }
  next();
<<<<<<< HEAD
} 
=======
}
>>>>>>> master

module.exports = {
  asyncHandler,
  handleValidationErrors
}
