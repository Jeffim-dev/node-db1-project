const express = require('express')

const db = require('../data/dbConfig.js')

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await db("accounts")
    res.json(posts)
  } catch(err) {
      next(err)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const post = await db.first().from("accounts").where("id", req.params.id)
    if (post) {
      res.json(post)
    } else {
      res.status(400).json({ message: "ID not found"})
    }
  } catch(err) {
      next(err)
  }
})

router.post('/', async (req, res, next) => {  
  const payload = {
    name: req.body.name,
    budget: req.body.budget
  }
  try {   
    // const post = await db("accounts").insert(payload)
    // res.status(201).json(post)
    const [id] = await db("accounts").insert(payload)
    const newPost = await db("accounts").where("id", id).first()
    res.json(newPost)
  } catch(err) {
      next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  const payload = {
    name: req.body.name,
    budget: req.body.budget
  }
  try {
    const count = await db("accounts").where("id", req.params.id).update(payload)
    if (count) {
      res.json({ updated: count})
    } else {
      res.status(400).json({ message: "Invalid ID" })
    }
  } catch(err) {
      next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const count = await db("accounts").where("id", req.params.id).del()
    count ? res.json({ deleted: count}) : res.status(404).json({ message: "Invalid ID"})
  } catch(err) {
      next(err)
  }
})

module.exports = router;