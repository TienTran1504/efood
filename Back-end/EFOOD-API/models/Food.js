const mongoose = require('mongoose')

const FoodSchema = new mongoose.Schema({
    //required: name, typeOf, price
    name: {
        type: String,
        required: [true, 'Please provide food name'],
        maxlength: 50,
        trim: true,
        unique: true
    },
    image: {
        type: String,
        default: "./default.png",
    },
    typeOf: {
        type: String,
        required: [true, 'Please provide type of food'],
        enum: ['Món nước', 'Cơm', 'Đồ uống', 'Tráng miệng', 'Ăn vặt'],
    },
    ratingList: {
        type: Array,
        default: [],
    },
    rating: {
        type: Number,
        default: 0,
        min: [0, 'Rating must be above 0.0'],
        max: [5, 'Rating must be below 5.0'],
        set: val => Math.round(val * 10) / 10,
    },
    price: {
        type: Number,
        required: [true, 'Please provide price of food'],
        match: [(/^\d+(\.\d{2})?$/), 'Please provide valid price'],
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    }
}, { timestamps: true }) // timestamps -> key createdAt, updatedAt

module.exports = mongoose.model('Food', FoodSchema);