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
      <p>People cite quotes for all manner of reasons. Inspiration, information, wisdom, utility and so on. I've made it nice and easy for you to jot down and readily access your favorite quotes!</p>
      <h2>How it works</h2>
      <p>First thing to do is sign up. DOn't worry, we don't ask for you email or anything like that. Signing up sets up your account. From there you can add quotes to your account and access them when you log in.</p>
      <h2>Adding quotes</h2>
      <p>All quotes have two main parts: The quote (text) and the person who said it (author). These are required for every quote (if you don't know who said it, just put Unknown). Now to get more specific, you can also add the year it was added or the body of work it is a part of (1776, Declaration of independence).</p>
      </div>
  )
}

export default Home
