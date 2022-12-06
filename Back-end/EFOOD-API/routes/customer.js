const express = require('express')
const router = express.Router()


const { getAllItems, updateItem, deleteItem, createItem, getUserInfor, updateUserProfile, updatePassword } = require('../controllers/customer')
router.route('/').get(getUserInfor)
router.route('/updatepassword').patch(updatePassword)
router.route('/profile').patch(updateUserProfile)
router.route('/cart').get(getAllItems)
router.route('/cart/:foodId').delete(deleteItem).patch(updateItem).post(createItem)
router.route('/cart/delete/:foodId').patch(deleteItem)


module.exports = router