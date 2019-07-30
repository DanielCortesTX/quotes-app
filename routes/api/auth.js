const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const { check, validationResult } = require('express-validator/check')

const User = require('../../models/User')

// @route POST api/auth
// @desc Authenticate user and get token
// @access Public
router.post('/', [
  check('username', 'Username is Required')
    .not()
    .isEmpty(),
  check('password', 'Please enter a password with 6 or more characters').isLength({
    min: 6
  })  
], async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }
  const { username, password } = req.body

  try {
    // See if user is registered
    let user = await User.findOne({ username })

    if(!user) {
      return res.status(400).json({ errors: [ { msg: 'User does not exist'}]})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid password'}]})
    }

    // Return jsonwebtoken

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(
      payload,
      keys.secret,
      { expiresIn: 360000},
      (err, token) => {
        if(err) throw err
        res.json({ token})
      })
  
  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router