const express = require('express');

const db = require('../data/db');

const router = express.Router();

// ================== GET

router.get('/', (req, res) => {
    db
    .find()
    .then(posts => {
        res.status(200).json({ posts });
      })
    .catch(err => {
        res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    })
  })

  router.get('/:id', (req, res) => {
    const id = req.params.id;

    db.findById(id)
    .then(posts => {
      if (posts.length) {
        res.status(200).json({ posts });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

// ========================= POST

    router.post('/', (req, res) => {
        const post = req.body;
        if (!post.title || !post.contents) {
            return res.status(400).json({
              errorMessage: "Please provide title and contents for the post."
            });
          }
        
          db.insert(post)
            .then(result => {
              db.findById(result.id)
                .then(post => res.status(201).json(post))
                .catch(err =>
                  res.status(500).json({
                    message: "There was an error while saving the post to the database"
                  })
                );
            })
            .catch(err =>
              res.status(500).json({
                error: "There was an error while saving the post to the database"
              })
            );
        });

    // ====================== PUT

router.put("/:id", (req, res) => {
    const {title, contents } = req.body;
    if (title == undefined || contents == undefined) {
      res.status(404)
        .json({ errorMessage: "Please provide title and contents for the post." });
    } else {
      db
      .insert({ title, contents })
        .then(posts => {
          res.status(200).json({ posts })
        })
        .catch(() =>
          res
            .status(500)
            .json({ error: "There was an error while saving the post to the database" })
        );
    }
  });
  
  // ====================== DELETE 

  

module.exports = router; 