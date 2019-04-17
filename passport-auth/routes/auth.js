const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();
const zxcvbn = require('zxcvbn');
const passport = require('passport');

router.get('/register', (req, res, next) => {
  res.render('auth/register');
});

router.get('/login', (req, res, next) => {
  res.render('auth/login', {
    errorMessage: req.flash('error')
  });
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
    passReqToCallback: true
  })
);

router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const salt = bcrypt.genSaltSync();
  const hashPassword = bcrypt.hashSync(password, salt);

  if (username === '' || password === '') {
    res.render('auth/register', {
      errorMessage: 'You need a username and a password to register'
    });
    return;
  }
  const passwordStrength = zxcvbn(password);
  if (password.length < 6) {
    res.render('auth/register', {
      errorMessage: 'Your password needs 6 or more characters'
    });
    return;
  }
  if (passwordStrength.score === 0) {
    res.render('auth/register', {
      errorMessage: passwordStrength.feedback.warning
    });
    return;
  }

  User.findOne({ username })
    .then(user => {
      if (user) {
        res.render('auth/register', {
          errorMessage: 'There is already a registered user with this username'
        });
        return;
      }
      User.create({ username, password: hashPassword })
        .then(() => {
          res.redirect('/');
        })
        .catch(err => {
          console.error('Error while registering new user', err);
          next();
        });
    })
    .catch(err => {
      console.error('Error while looking for user', err);
    });
});

module.exports = router;
