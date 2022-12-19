const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const BillSchema = new mongoose.Schema({

    method: {
        type: String,
        required: [true, 'Please provide payment method'],
        enum: ['Thanh toán khi nhận hàng', 'Thanh toán trực tiếp'],
    },
    total: {
        type: Number,
        required: [true, 'Please provide total of bill'],
        match: [(/^\d+(\.\d{2})?$/), 'Please provide valid total'],
    },
    message: {
        type: String,
    },
    orderList: {
        type: Array,
        default: [],
    },
    status: {
        type: String,
        enum: ['Delivered', 'Shipping', 'Ordered', 'Canceled'],
        default: 'Ordered'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    }
}, { timestamps: true }) // timestamps -> key createdAt, updatedAt

// create json web token
BillSchema.methods.createJWT = function () {
    return jwt.sign({ billId: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
}

module.exports = mongoose.model('Bill', BillSchema);