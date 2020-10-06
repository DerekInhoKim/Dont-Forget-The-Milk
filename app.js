//external requires

const express = require("express");
const morgan = require("morgan");
const { ValidationError } = require("sequelize");
const path = require("path");

// internal requires

const { environment } = require("./config");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

app.set("view engine", "pug");

//external use statements
app.use(morgan("dev"));
app.use(express.json());


//internal use statements
app.use("/", indexRouter);
app.use('/users', usersRouter);
// app.use("/api/list", listsRouter);
app.use(express.static(path.join(__dirname, "public")));


//TODO: error handlers
// unhandled requests
  app.use((req, res, next) => {
    const error = new Error("Resource could not be found.");
    error.errors = ["Resource could not be found."];
    error.status = 404;
    next(error);
  });

//sequelize errors
app.use((error, req, res, next) => {
  if(error instanceof ValidationError) {
    error.errors = error.errors.map((err) => err.message);
    error.title = "Sequelize Error";
  };
  next(error);
});

//general error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  const isProduction = environment === "production";
  res.json({
    title: error.title || "Server Error",
    errors: error.errors,
    stack: isProduction ? null : error.stack
  });
});


const express = require("express");
const morgan = require("morgan");
const { ValidationError } = require("sequelize");
const indexRouter = require("./routes/index");
const { environment } = require("./config");
const path = require("path");

const app = express();
// Set the pug view engine.
app.set("view engine", "pug");
app.use(morgan("dev"));
app.use(express.json());

app.use("/", indexRouter);

// app.use("/api/list", listsRouter);

app.use(express.static(path.join(__dirname, "public")));


module.exports = app;
