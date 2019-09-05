const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuoteSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  dateOfQuote: {
    type: String
  },
  bodyOfWork: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ]
})

module.exports = Quote = mongoose.model('quote', QuoteSchema)