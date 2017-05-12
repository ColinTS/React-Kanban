 /*jshint esversion: 6*/
const express = require('express');
const users = express.Router();
const { Card, User } = require('../../models');

users.route('/')
.get((req, res) => {
    User.findAll({
      attributes: ['username', 'firstname', 'lastname']
    })
      .then( user => {
        res.json(user);
      })
      .catch(err => {
        res.send(err);
      });
  })
.post((req, res)=> {
  User.create (req.body)
    .then(res.json.bind(res))
    .catch(res.json.bind(res));
});

  module.exports = users;