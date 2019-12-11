const express = require('express');
const db = require('./userDb')
const dbPosts = require('../posts/postDb')

const router = express.Router();

router.post('/', validateUser(), (req, res) => {
 db.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      next(error)
    })
});

  // if (!req.body.name) {
  //   res.status(400).json({
  //     message: 'Provide a name of hobbit, elf, wizard, dwarf'
  //   })
  // } else {
  //   db.insert(req.body)
  //     .then(post => {
  //       res.status(201).json(post)
  //     })
  //     .catch(err => {
  //       res.status(500).json({
  //         error: "Could not save"
  //       })
  //     })
  // }

router.post('/:id/posts', validateUserId(), validatePost(), (req, res) => {
  // do your magic!
    dbPosts.insert({ user_id: req.user.id, ...req.body })
      .then(post => res.status(201).json(post))
      .catch(error =>
        errorMessage(res, 500, `error adding post to the database`, error)
      );
  })

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

router.get('/:id', validateUserId(), (req, res) => {
res.json(req.user)
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

router.delete('/:id', validateUserId(), (req, res) => {
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

router.put('/:id', validateUser(), (req, res) => {
  // if (!req.body.name) {
  //   return res.status(400).json({message: "Missing Name"})
  // }
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

function validateUserId() {
  return (req, res, next) => {
    db.getById(req.params.id)
      .then(user => {
        if (user) {
          req.user = user
          next()
        } else {
          res.status(404).json({
            message: 'No hobbit, dwarf, elf, or wizard found'
          }) 
        }
      })
          .catch(error => {
            console.log(error)
            res.status(500).json({
              message: 'Error retrieving hobbit, dwarf, elf, or wizard'
            })
          })
        }
  }


function validateUser(req, res, next) {
  return (req, res, next) => {
    if (!req.body.name) {
      return res.status(400).json({
        message: 'Need a name!'
      })
    }
    next()
  }
}

function validatePost() {
  return (req, res, next) => {
    if (!req.body.text) {
      return res.status(400).json({ message: "Missing post data."})
    } 
    next()
  }
}

module.exports = router;
