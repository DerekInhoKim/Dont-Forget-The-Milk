const express = require("express");
const router = express.Router();

// Define a route.
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/sign-in", (req, res) => {
  res.render("sign-in");
});

// router.get("/lists", (req, res) => {
//   res.render("lists")
// });


module.exports = router;
