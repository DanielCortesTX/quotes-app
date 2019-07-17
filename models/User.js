const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  quotesadded: [
    {
      quote: {
        type: Schema.Types.ObjectId,
        ref: 'quotes'
      }
    }
  ]
})

module.exports = User = mongoose.model('user', UserSchema)