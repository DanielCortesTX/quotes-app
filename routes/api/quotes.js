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
    console.log(e.message)
    res.status(400).send(e)
    return res.status(401).json({ errors: [ { message: `${e.message}`}]})
  }
})

// @route GET api/quotes/mine
// @desc Get quotes by logged in user
// @access Private
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

// @route GET api/quotes/search
// @desc Execute search
// @access Private
router.get('/:filter/:search', auth, async (req, res) => {
  const { filter, search } = req.params

  try {
    if(filter === ''){
      throw new Error('Must pick a filter')
    } else if (search === ''){
      throw new Error('Must fill out Search')
    }

    const results = await Quote.find({ [filter]: [search], owner: req.user._id })

    res.send(results)
  } catch (err) {
    res.status(403).send(err)
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

// @route GET api/quotes
// @desc get all quotes
// @access Public
router.get('/', async (req, res) => {
  Quote.find()
    .sort({ date: -1})
    .then(quotes => res.json(quotes))
    .catch(err => res.status(404).json({ nopostfound: 'No quotes found'}))
})

// @route  GET api/quotes/author/:author
// @desc   Gets all quotes by a specific author
// @access Public
router.get('/author/:author', (req, res) => {
  Quote.find({ author: req.params.author })
    .then(quotes => res.json(quotes))
    .catch(err => res.status(404).json({ quotes: 'No quotes found'}))
})

// @route  GET api/quotes/:id
// @desc   Gets a specific quote by id
// @access Public
router.get('/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    // make sure logged in user made the Quote
    const quote = await Quote.findOne({ _id, owner: req.user._id})

    if(!quote){
      return res.status(404).send('Quote does not exist')
    }

    res.send(quote)
  } catch (e) {
    res.status(400).send(e)
  }
})

// @route  DELETE api/quotes/:id
// @desc   Delete a specific quote by id
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const quote = await Quote.findOneAndDelete({ _id: req.params.id, owner: req.user._id})

    const quotes = await Quote.find({ owner: req.user._id})
  
    if(!quote){
      return res.status(404).send()
    }

    res.send(quotes) 
    // res.send(quote)
  } catch (e) {
    es.status(400).send(e)
  }
})

// @route  PATCH api/quotes/:id
// @desc   Edit a specific quote by id
// @access Private
router.patch('/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['text', 'author', 'dateOfQuote', 'bodyOfWork']
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

  if(!isValidUpdate){
    return res.status(400).send({ error: "Invalid Update"})
  }

  try {
    const quote = await Quote.findOne({ _id: req.params.id, owner: req.user._id})

    if(!quote){
      return res.status(404).send()
    }

    updates.forEach((update) => quote[update] = req.body[update])
    await quote.save()
    res.send(quote)
  } catch (e) {
    res.status(401).send(e)
  }
})

module.exports = router