const mongoose = require('mongoose')
// const Schema = mongoose.Schema

const AuthorSchema = new mongoose.Schema ({
  name: {
    type: String
  }
})

module.exports = Author = mongoose.Schema('author', AuthorSchema)