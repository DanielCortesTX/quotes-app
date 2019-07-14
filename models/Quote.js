const mongoose = require('mongoose')

const QuoteSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    unique: true
  },
  addedBy: {
    type: String,
    required: true,
    unique: true
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
    type: Date
  },
  bodyOfWork: {
    type: String
  }
})

module.exports = Quote = mongoose.model('quote', QuoteSchema)