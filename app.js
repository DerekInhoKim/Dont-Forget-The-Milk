const express = require("express");
const morgan = require('morgan');
const { environment } = require('./config');
const path = require("path");

const app = express();
const indexRouter = require('./routes/index');
const searchRouter = require('./routes/api/search');

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "pug");

// app.get("/", (req, res) => {
//   res.send("Welcome to the express-sequelize-starter!");
// });

// Router for INDEX : front end
app.use('/', indexRouter);

// Router for SEARCH FEATURE : API
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
