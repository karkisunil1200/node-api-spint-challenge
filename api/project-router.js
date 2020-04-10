const express = require('express');
const db = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
  db.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({message: 'Could not retrieve any projects', err: err.message});
    });
});

router.get('/:id', (req, res) => {
  const {id} = req.params;

  db.get(id)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({message: 'The project with that ID does not exist'});
      }
    })
    .catch(err => {
      res.status(500).json({message: 'Could not fetch project for that ID'});
    });
});

router.post('/', (req, res) => {
  const data = req.body;

  db.insert(data)
    .then(project => {
      if (project) {
        res.status(201).json(project);
      } else {
        res.status(404).json({message: 'please provide name or description'});
      }
    })
    .catch(err => {
      res.status(500).json({message: 'Project could not be posted'});
    });
});

module.exports = router;
