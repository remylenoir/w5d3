const express = require('express');
const router = express.Router();

router.get('/secret', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render('protected/secret');
  } else {
    res.render('error', { errorMessage: 'This is a protected route' });
  }
});

module.exports = router;
