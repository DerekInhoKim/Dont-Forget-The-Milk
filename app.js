//external requires
const express = require('express');
const morgan = require('moregan');


//internal requires



const app = express();

app.set('view engine', 'pug');

//external use statements
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

//internal use statements
app.use('/public', express.static(path.join(__dirname, 'public')));









module.exports = app;
