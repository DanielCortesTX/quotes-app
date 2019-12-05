const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/User')
const secret = require('../config/keys').secretOrKey

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')

    // ensure token is valid
    const decoded = jwt.verify(token, secret)

    const user = await User.findOne({ _id: decoded._id, 'tokens.token' : token})
  
    if(!user){
      throw new Error()
    }

    req.token = token
    req.user = user
    next()
  } catch (e) {
    res.status(401).send({ errors: 'Please Authenticate'})
  }
}

module.exports = auth
// module.exports = function(req, res, next) {
//   // Ge token from header

//   const token = req.header('x-auth-token')

//   // Check if no token
//   if(!token) {
//     return res.status(401).json({ msg: 'No token, authorization failed'})
//   }

//   // Verify token
//   try {
//     const decoded = jwt.verify(token, keys.secret)

//     req.user = decoded.user
//     next()
//   } catch (err) {
//     res.status(401).json({ msg: 'Token is not valid'})
//   }
// }