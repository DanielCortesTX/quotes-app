const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const { check, validationResult } = require('express-validator/check')
const User = require('../../models/User')
// const { check, validationResult } = require('express-validator/check')

// @route POST api/users
// @desc Register user
// @access Public
router.post('/', async (req, res) => {
  const user = new User(req.body)
  const { username, password } = req.body

  try {
    const checkInput = await User.checkRegister(user)

    // See if username is taken
    let checkUsername = await User.findOne({ username })

    if(checkUsername) {
      return res.status(401).json({ errors: [ { message: 'Username is taken'}]})
    }

    await checkInput.save()

    // Return jsonwebtoken
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  
  } catch(err) {
    console.error(err, '55555')
    res.status(502).json({ errors: [{ message: `${err.message}`}]})
  }
})

// @route POST api/users
// @desc Login a user
// @access Public
router.post('/login', async (req, res) => {
  
  const { username, password } = req.body
  // console.log(username, password)

  try {
    const user = await User.findByCredentials(username, password)

    const token = await user.generateAuthToken()
  
    res.send({
      user, token
    })
    
  } catch (err) {
    console.log(err.message, 'noooooo')
    res.status(401).json({ errors: [{ message: `${err.message}`}]})
  }
})

// @route GET api/users/me
// @desc Get logged in user
// @access Private
router.get('/me', auth, async (req, res) => {
  res.send(req.user)
})

// @route POST api/users/logout
// @desc Logout user
// @access Private
router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()

    res.send()
  } catch (e) {
    console.log(e)
    res.status(500).send()
  }
})

// @route DELETE api/users/me
// @desc Delete logged in user
// @access Private
router.delete('/me', auth, async (req, res) => {
  try {
    await req.user.remove()

    res.send(req.user)
  } catch (e) {
    res.status(500).send()
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