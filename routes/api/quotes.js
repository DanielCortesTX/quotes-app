const express = require('express')
const router = express.Router()
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const { check, validationResult } = require('express-validator/check')
const auth = require('../../middleware/auth')

const Quote = require('../../models/Quote')
const User = require('../../models/User')

// @route POST api/quotes
// @desc Create a post
// @access Private
router.post('/', [auth,[
  check('text', 'Text is required')
    .not()
    .isEmpty(),
  check('author', 'Author is required. Use Unknown if necessary')
    .not()
    .isEmpty()  
  ]
],
async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }

  const { text, author, dateOfQuote, bodyOfWork } = req.body

  try {
    const user = await User.findById(req.user.id).select('-password')

    const newQuote = new Quote({
      user: req.user.id,
      text,
      author,
      dateOfQuote,
      bodyOfWork 
    })

    const quote = await newQuote.save()

    res.json(quote)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
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