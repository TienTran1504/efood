const express = require('express')
const router = express.Router()

const { getAllBills, getBill, getBillbyUserId, getUserBills, updateBill, createBill, deleteBill, feedbackBill, } = require('../controllers/bills')

router.route('/').post(createBill).get(getAllBills)
router.route('/user').get(getUserBills)
router.route('/:id').get(getBill).delete(deleteBill).patch(updateBill)
router.route('/feedback/:id').patch(feedbackBill)
router.route('/user/:id').get(getBillbyUserId)
module.exports = router