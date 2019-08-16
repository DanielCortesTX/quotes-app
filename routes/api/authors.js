const express = require('express')
const router = express.Router()
const keys = require('../../config/keys')
const auth = require('../../middleware/auth')

const Author = require('../../models/Author')

// @route POST api/authors
// @desc Add an author
// @access Private
// router.post('/', [auth])