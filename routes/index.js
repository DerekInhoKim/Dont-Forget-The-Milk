const express = require('express');
const router = express.Router();


router.get('/lists', async (req, res) => {

  res.render('test-list')
});

// router.get('/lists/:id(\\d+)/tasks', async (req, res) => {

//   res.render('test-tasks')
// });

router.get('/lists/:id/tasks', async (req, res) => {

  res.render('test-list')
});


module.exports = router;
