const express = require("express");
const morgan = require('morgan');
const { environment } = require('./config');

const app = express();
const searchRouter = require('./routes/search');

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the express-sequelize-starter!");
});


// Router for search feature
app.use('/search', searchRouter);

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.status = 404;
  next(err);
});

// Generic error handler.
app.use((err, req, res, next) => {
  // console.log('error -------------------------------')
  res.status(err.status || 500);
  const isProduction = environment === "production";
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app
