const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator/check')

const User = require('../../models/User')

// @route POST api/users
// @desc Register user
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
    // See if username is taken
    let user = await User.findOne({ username })

    if(user) {
      return res.status(400).json({ errors: [ { msg: 'Username is taken'}]})
    }

    user = new User({
      username,
      password
    })

    // Encrypt password

    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(password, salt)

    await user.save()

    // Return jsonwebtoken

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(
      payload,
      config.get('secret'),
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