const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const Schema = mongoose.Schema
const secret = require('../config/keys').secretOrKey

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    validate(value){
      if(value.toLowerCase().includes('password')){
        throw new Error('password cannot contain password')
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
})

// Virtual Property. Relationship to Quotes. For express
UserSchema.virtual('quotes', {
  ref: 'Quote',
  localField: '_id',
  foreignField: 'owner'
})

// Don't return this stuff
UserSchema.methods.toJSON = function (){
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens
  return userObject
}

UserSchema.methods.generateAuthToken = async function (){
  const user = this
  const token = jwt.sign({ _id: user._id.toString()}, secret)

  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

UserSchema.statics.findByCredentials = async (username, password) => {
  let user = await User.findOne({ username })

  if(!user){
    // console.log(new Error('No user'), '777777')
    throw new Error('No user')
    // return res.status(400).json('No User')
    // let errors = ['No User']
    // return errors
  }
  const isMatch = await bcrypt.compare(password, user.password)

  if(!isMatch){
    throw new Error("password doesn't match")
  }
  return user
}

UserSchema.statics.checkRegister = async (username, password) => {
  if(password === ''){
    throw new Error('Password cannot be blank')
  } else if (password.length < 6){
    throw new Error('Password must be at least 6 characters')
  }
}

// run before user is saved, hash password before saving
UserSchema.pre('save', async function (next) {
  const user = this

  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

module.exports = User = mongoose.model('user', UserSchema)