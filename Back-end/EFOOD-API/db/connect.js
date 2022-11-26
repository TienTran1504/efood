const mongoose = require('mongoose')


const connectDB = (url) => {
    return mongoose.connect(url, {
        // để huỷ warning khi connect mongodb
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
}
module.exports = connectDB;
