const express = require('express');
const router = express.Router();


// router.get('/lists', async (req, res) => {

//   res.render('test-list')
// });

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/lists", (req, res) => {
  res.render("index");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/sign-in", (req, res) => {
  res.render("sign-in");
});

module.exports = router;
