const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    //required: name, typeOf, price
    title: {
        type: String,
        required: [true, 'Please provide title'],
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
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'Please provide content'],
        maxlength: 255,
        trim: true,
    }
}, { timestamps: true }) // timestamps -> key createdAt, updatedAt

module.exports = mongoose.model('Contact', ContactSchema);