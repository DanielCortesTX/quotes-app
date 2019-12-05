const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const User = require('../../models/User')
// const { check, validationResult } = require('express-validator/check')

// @route POST api/users
// @desc Register user
// @access Public
router.post('/', async (req, res) => {
  const user = new User(req.body)
  const { username } = user

  try {
    // See if username is taken
    let check = await User.findOne({ username })

    if(check) {
      return res.status(400).json({ errors: [ { msg: 'Username is taken'}]})
    }

    await user.save()

    // Return jsonwebtoken
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  
  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route POST api/users
// @desc Login a user
// @access Public
router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.username, req.body.password)
    const token = await user.generateAuthToken()

    res.send({
      user, token
    })
  } catch (e) {
    console.log(e)
    res.status(400).send()
  }
})


module.exports = router



// @route POST api/users
// @desc Register user
// @access Public
// router.post('/', [
//   check('username', 'Username is Required')
//     .not()
//     .isEmpty(),
//   check('password', 'Please enter a password with 5 or more characters').isLength({
//     min: 6
//   })  
// ], async (req, res) => {
//   const errors = validationResult(req)
//   if(!errors.isEmpty()){
//     return res.status(400).json({ errors: errors.array() })
//   }
//   const { username, password } = req.body

//   try {
//     // See if username is taken
//     let user = await User.findOne({ username })

//     if(user) {
//       return res.status(400).json({ errors: [ { msg: 'Username is taken'}]})
//     }

//     user = new User({
//       username,
//       password
//     })

//     // Encrypt password

//     const salt = await bcrypt.genSalt(10)

//     user.password = await bcrypt.hash(password, salt)

//     await user.save()

//     // Return jsonwebtoken

//     const payload = {
//       user: {
//         id: user.id
//       }
//     }

//     jwt.sign(
//       payload,
//       keys.secret,
//       { expiresIn: 360000},
//       (err, token) => {
//         if(err) throw err
//         res.json({ token})
//       })
  
//   } catch(err) {
//     console.error(err.message)
//     res.status(500).send('Server error')
//   }
// })