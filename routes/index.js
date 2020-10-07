const express = require('express');
const router = express.Router();


router.get('/lists', async (req, res) => {

  res.render('test-list')
});

router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
