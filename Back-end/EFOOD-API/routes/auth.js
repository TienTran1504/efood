const express = require('express')
const router = express.Router()


const { login, register, createOTP, forgotPassword, createContact, getAllFoods, getFoodsByType, getFoodsByPrice, getFood, } = require('../controllers/auth')
router.route('/foods').get(getAllFoods)
router.route('/foods/type').get(getFoodsByType)
router.route('/foods/price').get(getFoodsByPrice)
router.route('/foods/:id').get(getFood)
router.patch('/forgotpassword', forgotPassword)
router.post('/otp', createOTP)
router.post('/register', register)
router.post('/login', login)
router.post('/contact', createContact)

module.exports = router