const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
  res.render("index");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/sign-in", (req, res) => {
  res.render("sign-in");
});

module.exports = router;
