const mongoose = require('mongoose')
const validator = require('validator')
// const Schema = mongoose.Schema

const QuoteSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  author: {
    type: String,
    required: true,
    validate(value){
      if(value.length < 1){
        throw new Error('Author is required. Use Unknown if necessary')
      }
    }
  },
  text: {
    type: String,
    required: true,
    validate(value){
      if(value.length < 1){
        throw new Error('Must fill out text to submit')
      }
    }
  },
  dateOfQuote: {
    type: String
  },
  bodyOfWork: {
    type: String
  }
}, {
  timestamps: true
})

module.exports = Quote = mongoose.model('quote', QuoteSchema)

// user: {
//   type: Schema.Types.ObjectId,
//   ref: 'users'
// },