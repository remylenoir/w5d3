const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Room = require('../models/room');

const authenticationCheck = (req, res, next) => {
  if (req.isAuthenticated()) next();
  else res.render('error', { errorMessage: 'This is a protected route' });
};

const rolesCheck = role => {
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.render('error', { errorMessage: 'This is a protected route' });
    } else if (req.user.role !== role) {
      res.render('error', {
        errorMessage: 'You do not have sufficient privileges'
      });
    } else {
      next();
    }
  };
};

router.get('/secret', authenticationCheck, (req, res, next) => {
  res.render('protected/secret');
});

router.get('/rooms', authenticationCheck, (req, res, next) => {
  //   let queryObj = {};
  //   if (req.user.role !== 'admin') queryObj.owner = req.user._id;
  //   Room.find(queryObj);
  Room.find({ owner: req.user._id })
    .then(rooms => {
      res.render('protected/rooms', { rooms });
    })
    .catch(err => {
      console.error('Error while getting the rooms', err);
    });
});

router.get('/roomsAll', rolesCheck('admin'), (req, res, next) => {
  Room.find({})
    .then(rooms => {
      res.render('protected/rooms', { rooms });
    })
    .catch(err => {
      console.error('Error while getting the rooms', err);
    });
});

router.get('/rooms/add', authenticationCheck, (req, res, next) => {
  res.render('protected/room-create');
});

router.post('/rooms/add', authenticationCheck, (req, res, next) => {
  const { location, price, description } = req.body;
  console.log(req.user._id);
  Room.create({ location, price, description, owner: req.user._id })
    .then(room => {
      res.redirect('/rooms');
    })
    .catch(err => {
      console.error('Error while adding a new room', err);
    });
});

module.exports = router;
