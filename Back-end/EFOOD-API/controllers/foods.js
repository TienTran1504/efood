const Food = require('../models/Food')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError, UnauthenticatedError } = require('../errors')
//get all jobs of user by userid
// {{URL}}/foods
const getAllFoods = async (req, res) => {
    const { search, limit } = req.query;
    const foods = await Food.find({}).sort('createdAt')
    let sortedFoods = [...foods];
    if (search) {
        sortedFoods = sortedFoods.filter((food) => {
            return food.name.startsWith(search);
        })
    }
    if (limit) {
        sortedFoods = sortedFoods.slice(0, Number(limit));
    }
    if (sortedFoods.length < 1) {
        return res.status(StatusCodes.OK).json({ msg: "No foods match your search" });
    }
    res.status(StatusCodes.OK).json({ sortedFoods, count: sortedFoods.length });
}
// {{URL}}/foods/:id
const getFood = async (req, res) => {
    const { params: { id: foodId } } = req; // req.user.userId, req.params.id

    const food = await Food.findOne({
        _id: foodId,
    })
    if (!food) {
        throw new NotFoundError(`No food with id ${foodId}`)
    }
    res.status(StatusCodes.OK).json({ food })
}
// {{URL}}/foods
const createFood = async (req, res) => {
    const userCheck = await User.findOne({ _id: req.user.userId });
    if (userCheck.typeOf === 'admin') {
        req.body.createdBy = req.user.userId;
        const food = await Food.create({ ...req.body });
        res.status(StatusCodes.CREATED).json({
            food
        })
    }
    else {
        throw new UnauthenticatedError(`User have no permission`)
    }
}
// {{URL}}/foods/:id
const updateFood = async (req, res) => {
    const userCheck = await User.findOne({ _id: req.user.userId });
    if (userCheck.typeOf === 'admin') {
        const {
            user: { userId },
            params: { id: foodId },
        } = req;

        const food = await Food.findByIdAndUpdate(
            {
                _id: foodId,
                createdBy: userId
            },
            req.body,
            { new: true, runValidators: true }
        )

        if (!food) {
            throw new NotFoundError(`No food with id ${foodId}`)
        }
        res.status(StatusCodes.OK).json({ food })
    }
    else {
        throw new UnauthenticatedError(`User have no permission`)
    }
}
// {{URL}}/foods/rating/:id
const ratingFood = async (req, res) => {
    const {
        body: { rating },
        user: { userId },
        params: { id: foodId },
    } = req;

    if (rating === '' || rating < 1 || rating > 5) {
        throw new BadRequestError('Rating fields can not be empty or invalid');
    }
    const foodCheck = await Food.findOne(
        {
            _id: foodId
        }
    )
    foodCheck.ratingList.push(rating);
    req.body.ratingList = foodCheck.ratingList;
    let avg = (req.body.ratingList.reduce((total, currentValue) => { return total + currentValue }, 0)) / foodCheck.ratingList.length;
    req.body.rating = avg;
    const food = await Food.findByIdAndUpdate(
        {
            _id: foodId,
            rating: rating,
            createdBy: userId
        },
        req.body,
        { new: true, runValidators: true }
    )

    if (!food) {
        throw new NotFoundError(`No food with id ${foodId}`)
    }
    res.status(StatusCodes.OK).json({ food })
}
// {{URL}}/foods/:id
const deleteFood = async (req, res) => {
    const userCheck = await User.findOne({ _id: req.user.userId });
    if (userCheck.typeOf === 'admin') {
        const {
            user: { userId },
            params: { id: foodId },
        } = req;

        const food = await Food.findByIdAndRemove({
            _id: foodId,
            createdBy: userId,
        })

        if (!food) {
            throw new NotFoundError(`No food with id ${foodId}`)
        }
        res.status(StatusCodes.OK).json({ msg: `Delete food ID: ${foodId} successfully ` })
    }
    else {
        throw new UnauthenticatedError(`User have no permission`)
    }
}
module.exports = {
    getAllFoods,
    getFood,
    createFood,
    updateFood,
    deleteFood,
    ratingFood,
}

/* 
main flow:
Khi getAllFoods để lấy toàn bộ thức ăn sau này để render ra menu hay product list
Khi getFood để lấy ra một food dựa trên id của nó.
Khi createFood (admin) để tạo ra một món ăn mới
Khi updateFood (admin) để chỉnh sửa một món ăn sau này dùng để edit trong product list
Khi deleteFood (admin) để xoá một món ăn trong product list
Khi ratingFood để đánh giá món ăn.
*/