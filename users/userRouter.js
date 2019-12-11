const express = require('express');
const db = require('./userDb')

const router = express.Router();

router.post('/', (req, res) => {
  if (!req.body.name) {
    res.status(400).json({
      message: 'Provide a name of hobbit, elf, wizard, dwarf'
    })
  } else {
    db.insert(req.body)
      .then(post => {
        res.status(201).json(post)
      })
      .catch(err => {
        res.status(500).json({
          error: "Could not save"
        })
      })
  }
});

router.post('/:id/posts', (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "please provide some Elvish"
    })
  }
   const commentInfo = {text: req.body.text,
   sender: req.body.sender};
    db.getUserPosts(req.params.id, commentInfo)
      .then(post => {
        if (post) {
        res.status(201).json({...post, ...req.body})
        } else {
          res.status(404).json({
            message: 'The ID does not exisit'
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          error: "Could not save"
        })
      })
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
  db.remove(req.params.id)
    .then(count => {
        if (count > 0) {
          res.status(200).json({ message: "BYE FOREVER"}) 
        } else {
          res.status(204).json({
            message: "Could not delete"
          })
        }
    })
    .catch (err => {
        console.log(error)
        res.status(500).json({
          message: "Error"
        })
    })
});

router.put('/:id', (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({message: "Missing Name"})
  }
    db.update(req.params.id, req.body)
      .then(change => {
        if (change) {
          res.status(200).json(change)
        } else {
          res.status(404).json({ message: "Nothing can be found"})
        }
      })
      .catch(err => {
        res.status(500).json({
          message: "Error Updating"
        })
      })
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
