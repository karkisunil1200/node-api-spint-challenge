const express = require('express');
const db = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
  db.get()
    .then(projects => {
      res.status(201).json(projects);
    })
    .catch(err => {
      res.status(500).json({message: 'Could not retrieve any projects'});
    });
});

module.exports = router;
