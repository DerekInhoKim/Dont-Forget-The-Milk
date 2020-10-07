const express = require("express");
const { environment } = require('./config');
const app = express();
const indexRouter = require('./routes/index');
const tasks_back_end = require('./routes/api/tasks_back')


const path = require("path");
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// FRONT END
app.use('/', indexRouter)

// BACK END
app.use('/api/lists', tasks_back_end)






module.exports = app;
