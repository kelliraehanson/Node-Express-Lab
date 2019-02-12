const express = require('express');

const db = require('../data/db');

const router = express.Router();

router.get('/', (req, res) => {
    db.find()
    .then(posts => {
      if (posts){
      res.status(200).json({ posts })
    } else{
      res.status(500).json({ error: "The posts information could not be retrieved." })
    }
    }).catch( err => {
      res.send(err);
    });
  });

module.exports = router; 