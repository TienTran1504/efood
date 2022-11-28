const express = require('express')
const router = express.Router()


const { getAllItems, updateItem, deleteItem, createItem } = require('../controllers/customer')

router.route('/cart').get(getAllItems)
router.route('/cart/:foodId').delete(deleteItem).patch(updateItem).post(createItem)
router.route('/cart/delete/:foodId').patch(deleteItem)


module.exports = router