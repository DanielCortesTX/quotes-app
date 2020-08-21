const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const db = require('./config/keys').mongoURI
const app = express()

// Database configuration
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })

    console.log('MongoDB connected')
  } catch (err) {
    console.error(err.message)
    // Exit process with failure
    process.exit(1)
  }
}

connectDB()

// Init Middleware
app.use(express.json({ extended: false }))



// API routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/quotes', require('./routes/api/quotes'))
// app.use('/api/authors', require('./routes/api/authors'))

// Serve Static assets in production
if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))