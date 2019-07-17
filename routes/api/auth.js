const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const keys = require('../../config/keys')
const { check, validationResult } = require('express-validator/check')

const User = require('../../models/User')