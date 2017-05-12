 /*jshint esversion: 6*/
const express = require('express');
const cards = express.Router();
const { Card, User } = require('../../models');

cards.route('/')
  .get((req,res) => {
    Card.findAll({
      include: [
        {
          model: User,
          as: 'Creator',
          attributes: ['username', 'firstname', 'lastname']
        },
        {
          model: User,
          as: 'Assigned',
          attributes: ['username', 'firstname', 'lastname']
        }
      ]
    })
      .then( cards => {
        res.json(cards);
      })
      .catch(err => {
        res.send(err);
      });
  })
  .post((req, res) => {
    Card.create (req.body)
      .then (res.json.bind(res))
      .catch (res.json.bind(res));
  });

  module.exports = cards;