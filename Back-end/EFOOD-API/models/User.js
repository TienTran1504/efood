const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    //required: name, email, password
    // register: name, email, password
    // login: email, password
    name: {
        type: String,
        // required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide valid emai',
        ],
        unique: true,
        trim: true,

    },
    phone: {
        type: String,
        // required: [true, 'Please provide phone number'],
        match: [/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Please provide valid phone number"],
        // console.log(regexPhoneNumber('840988888888')) // true
        // console.log(regexPhoneNumber('84988888888')) // false
        // console.log(regexPhoneNumber('8409888888881')) // false
        unique: true,
        trim: true,

    },
    address: {
        type: String,
        minlength: 6,
        maxlength: 60,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
        trim: true,
    },
    gender: {
        type: String,
        enum: ['nam', 'nữ'],
        default: 'nam',
    },
    typeOf: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer',
    },
    bonus: {
        type: Number,
        min: [0, "Bonus point can not be a negative number"],
        default: 0,
    },
    orderList: {
        type: Array,
        default: [],
    },
    orderPrice: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
        default: "./default.png",
    },
    birthday: {
        type: Date
    }
})

//Hashing password
UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

// create json web token
UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
}

// compare password to login
UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
}
module.exports = mongoose.model('User', UserSchema)