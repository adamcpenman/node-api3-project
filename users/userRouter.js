const express = require('express');
const db = require('./userDb')

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  db.get(req.params.id)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.status(500).json({
        message: "Could not get data"
      })
    })
});

router.get('/:id', (req, res) => {
  db.getById(req.params.id)
    .then(data => {
      if(data) {
        res.json(data)
      } else {
        res.status(404).json({
          message: "ID not found"
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Could not get ID "
      })
    })
});

router.get('/:id/posts', (req, res) => {
  db.getUserPosts(req.params.id)
    .then(data => {
      if (data) {
        res.json(data)
      } else {
        res.status(404).json({
          message: "ID Post not found"
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Info not found"
      })
    })
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
