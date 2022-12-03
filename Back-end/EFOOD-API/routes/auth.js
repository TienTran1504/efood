const express = require('express')
const router = express.Router()


const { login, register, createOTP } = require('../controllers/auth')

router.post('/otp', createOTP)
router.post('/register', register)
router.post('/login', login)


module.exports = router