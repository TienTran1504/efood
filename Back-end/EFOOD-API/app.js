require('dotenv').config();
require('express-async-errors');

//extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const express = require('express');
const app = express();

//connectDB
const connectDB = require('./db/connect')

const authenticateUser = require('./middleware/authentication')
//routers

const authRouter = require('./routes/auth');// use for both admin, customer
const adminRouter = require('./routes/admin');// use for admin
const foodsRouter = require('./routes/foods');
const billsRouter = require('./routes/bills');

//parse form data
app.use(express.urlencoded({ extended: false }));
//parse json
app.use(express.json());


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15minutes
    max: 100 // limit each IP to 100 requests per windowMs
}));


app.use(express.json());
// extra packages
app.use(helmet());
app.use(cors());
app.use(xss());
// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/admin', authenticateUser, adminRouter);
app.use('/api/v1/foods', authenticateUser, foodsRouter);
app.use('/api/v1/bills', authenticateUser, billsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();