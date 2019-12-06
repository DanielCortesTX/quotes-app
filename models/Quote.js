const mongoose = require('mongoose')
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
    unique: true
  },
  text: {
    type: String,
    required: true
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