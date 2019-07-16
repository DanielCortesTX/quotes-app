const mongoose = require('mongoose')

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
    type: Date
  },
  bodyOfWork: {
    type: String
  }
})

module.exports = Quote = mongoose.model('quote', QuoteSchema)