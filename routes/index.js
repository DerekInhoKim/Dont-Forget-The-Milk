const express = require("express");
const router = express.Router();

// Define a route.
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/lists", (req, res) => {
  res.render("lists")
});


module.exports = router;