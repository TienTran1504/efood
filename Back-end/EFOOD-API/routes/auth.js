const express = require('express')
const router = express.Router()


const { login, register, createOTP, forgotPassword } = require('../controllers/auth')
router.patch('/forgotpassword', forgotPassword)
router.post('/otp', createOTP)
router.post('/register', register)
router.post('/login', login)

module.exports = router