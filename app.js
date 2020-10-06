const express = require("express");
const { environment } = require('./config');
const app = express();
const tasks_frontend_router = require('./routes/index');


const path = require("path");
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// FRONT END
app.use('/lists', tasks_frontend_router)




module.exports = app;
