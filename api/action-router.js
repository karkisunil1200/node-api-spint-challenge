const express = require('express');
const db = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
  db.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({message: 'Error while reteriving the info'});
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  db.get(id)
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({message: 'The post with that ID does not exist'});
      }
    })
    .catch(err => {
      res.status(500).json({message: 'Action information could not be retrieved'});
    });
});

router.post('/', (req, res) => {
  const post = req.body;

  db.insert(post)
    .then(action => {
      if (action) {
        res.status(201).json(action);
      } else {
        res.status(400).json({message: 'You are missing either project_id, description or notes'});
      }
    })
    .catch(err => {
      res.status(500).json({message: 'Could not post information', error: err.message});
    });
});

router.put('/:id', (req, res) => {
  const {id} = req.params;
  const changes = req.body;

  db.update(id, changes)
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else if (!id) {
        res.status(404).json({message: 'The provided ID does not match'});
      } else {
        res.status(400).json({message: 'You are missing either project_id, description or notes'});
      }
    })
    .catch(err => {
      res.status(500).json({message: 'the infomation could not be changed'});
    });
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;

  db.remove(id)
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({message: 'The ID you does not exist'});
      }
    })
    .catch(err => {
      res.status(500).json({message: 'The information could not be deleted'});
    });
});

module.exports = router;
