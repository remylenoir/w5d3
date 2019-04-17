const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/secret", (req, res, next) => {
  if (req.isAuthenticated()) {
    User.findOne({ _id: req.user._id })
      .then(user => {
        res.render("protected/secret", { user });
      })
      .catch(err => {
        console.error(err);
      });
  } else {
    res.render("error", { errorMessage: "This is a protected route" });
  }
});

module.exports = router;
