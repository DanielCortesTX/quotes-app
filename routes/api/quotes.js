const express = require('express')
const auth = require('../../middleware/auth')
const router = express.Router()
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const { check, validationResult } = require('express-validator/check')

const Quote = require('../../models/Quote')
const User = require('../../models/User')
const Author = require('../../models/Author')

// @route POST api/quotes
// @desc Create a quote
// @access Private
router.post('/', auth, async (req, res) => {
  const quote = new Quote({
    ...req.body,
    owner: req.user._id
  })
  // const { text, author, dateOfQuote, bodyOfWork } = req.body

  try {
    // const user = await User.findById(req.user.id).select('-password')
    // const authorSearch = await Author.find({ name: author })
    await quote.save()
    res.status(201).send(quote)
  } catch (e) {
    console.error(e)
    res.status(400).send(e)
  }
})

router.get('/mine', auth, async (req, res) => {
  const match = {}
  const sort = {}

  try {
    const quotes = await Quote.find({ owner: req.user._id})
    res.send(quotes)  
  } catch (e) {
    res.status(400).send(e)
  }
  
})

// @route GET api/quotes/authors
// @desc get all authors
// @access Public
router.get('/authors', async (req,res) => {

  Quote.find().then(quotes => {
    let gather = quotes.map(quote => quote.author)
    let filtered = gather.filter((item, index) => gather.indexOf(item) === index)
    
    res.json(filtered)
  })
})

// @route POST api/quotes/like/:id
// @desc like/unlike post
// @access Private
router.post('/like/:id', [ auth ], 
async (req, res) => {
  try {
    Quote.findById(req.params.id)
      .then(quote => {
        if(quote.likes.filter(like => like.user.toString() === req.user.id).length > 0){

          // remove user from likes array
          const removeIndex = quote.likes.map(like => like.user.toString()).indexOf(req.user.id)

          quote.likes.splice(removeIndex, 1)
          quote.save().then(quote => res.json(quote))
        } else {
          // add user to likes array
          quote.likes.push({ user: req.user.id })

          quote.save().then(quote => res.json(quote))
        }
      })
  } catch (err) {
    console.error(err.message)
    res.status(404).json({ nopostfound: 'No quote found'})
  }
})

// @route GET api/quotes
// @desc get all quotes
// @access Public
router.get('/', async (req, res) => {
  Quote.find()
    .sort({ date: -1})
    .then(quotes => res.json(quotes))
    .catch(err => res.status(404).json({ nopostfound: 'No quotes found'}))
})

// @route  GET api/quotes/:author
// @desc   Gets all quotes by a specific author
// @access Public
router.get('/:author', (req, res) => {
  Quote.find({ author: req.params.author })
    .then(quotes => res.json(quotes))
    .catch(err => res.status(404).json({ quotes: 'No quotes found'}))
})

// @route  GET api/quotes/:user
// @desc   Gets all quotes by a specific user
// @access Public
router.get('/:user', (req, res) => {
  Quote.find({ user: req.params.user })
    .then(quotes => res.json(quotes))
    .catch(err => res.status(404).json({ quotes: 'No quotes found'}))
})

module.exports = router