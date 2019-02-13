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
        res.status(200).send('<div><h1>Contact</h1><input placeholder="email"/></div>');
        const { title, contents } = req.body;
            if (!title || !contents) {
            return res.status(400).json({
                errorMessage: "Please provide title and contents for the post."
            });
          } else {
        
          db.insert({ title, contents })
            .then(posts => {
                res.status(201).json(posts);
            })
            .catch(() => {
                res.status(500).json({
                  error: "There was an error while saving the post to the database"
                });
              });
          }
        });
        

    // ====================== PUT

    router.put("/:id", (req, res) => {
        const { id } = req.params;
        const { title, contents } = req.body;
        if (!title || !contents) {
          res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
          });
        } else {
          db.findById(id)
            .then(post => {
              if (post.length > 0) {
                db.update(id, { title, contents }).then(post => {
                  if (post === 1) {
                    db.findById(id).then(post => {
                      res.json(post);
                    });
                  } else {
                    res.status(404).json({ message: "failed to update post" });
                  }
                });
              } else {
                res.status(404).json({
                  message: "The post with the specified ID does not exist."
                });
              }
            })
      
            .catch(() => {
              res
                .status(500)
                .json({ error: "The post information could not be modified." });
            });
        }
      });
    
  
  // ====================== DELETE 

  router.delete("/:id", (req, res) => {
    const { id } = req.params;
  
    db.findById(id)
      .then(post => {
        if (post.length > 0) {
          db.remove(id)
            .then(() => {
              res.json(post);
            })
            .catch(() => {
              res.status(500).json({ message: "Failed to delete Post" });
            });
        } else {
          res
            .status(404)
            .json({ message: "The post with the specified ID does not exist." });
        }
      })
      .catch(() => {
        res.status(500).json({ error: "The post could not be removed" });
      });
  });

  

module.exports = router; 