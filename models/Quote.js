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
    type: Number
    // type: Number,
    // validate(value){
    //   if(value.length !== 4){
    //     throw new Error('Year must be 4 digits long')
    //   }
    // }
  },
  bodyOfWork: {
    type: String
    // validate(value){
    //   if(value.length < 1){
    //     throw new Error('Must fill out text to submit')
    //   }
    // }
  }
}, {
  timestamps: true
})

module.exports = Quote = mongoose.model('quote', QuoteSchema)

// user: {
//   type: Schema.Types.ObjectId,
//   ref: 'users'
// },