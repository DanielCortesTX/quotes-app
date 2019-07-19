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

module.exports = router