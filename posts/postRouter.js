const express = require('express');
const dbPosts = require('./postDb')

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validateUserId(req, res, next) {
 return (req, res, next) => {
   dbPosts.getById(req.params.id)
    .then(post => {
      if (post) {
        req.post = post
        next()
      } else {
        res.status(404).json({
           message: "Post not found!"
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Error retrieving Post"
      })
    })
    next()
 }
}

module.exports = router;
