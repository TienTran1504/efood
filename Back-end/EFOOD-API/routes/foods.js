const express = require('express')
const router = express.Router()

const {
    // getAllFoods,
    // getFood, 
    // getFoodsByType,
    // getFoodsByPrice,
    updateFood,
    createFood,
    deleteFood,
    ratingFood,
} = require('../controllers/foods')

// router.route('/').post(createFood).get(getAllFoods)
// router.route('/type').get(getFoodsByType)
// router.route('/price').get(getFoodsByPrice)
router.route('/:id').delete(deleteFood).patch(updateFood)//.get(getFood)
router.route('/rating/:id').patch(ratingFood)

module.exports = router