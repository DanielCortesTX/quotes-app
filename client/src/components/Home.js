import React, { useEffect} from 'react'
import { getQuotes } from '../actions/quotes'

const Home = () => {
  useEffect(() => {
    getQuotes()
  })
  return (
    <div>
      <h1>Quote me on it!!!!</h1>
      <p>Welcome to "Quote me on it!" And app built to help you ot down meaningfull expressions and such.</p>
    </div>
  )
}

export default Home
