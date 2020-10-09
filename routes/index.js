const express = require('express');
const router = express.Router();




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

router.get("/terms", (req, res) => {
  res.render("terms");
});

router.get("/privacy", (req, res) => {
  res.render("privacy");
});

router.get("/reset-request", (req, res) => {
  res.render("reset-request");
});

module.exports = router;
