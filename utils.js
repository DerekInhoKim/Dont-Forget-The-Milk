const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);



const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req)
    console.log("validation errors:", validationErrors)
    if(!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map((error) => error.msg)
        const err = Error("Bad request.");
        err.errors = errors;
        err.status = 400;
        err.title = "Bad request.";
       return next(err);
    } else {
        next();
    }
}


module.exports = {asyncHandler, handleValidationErrors}
