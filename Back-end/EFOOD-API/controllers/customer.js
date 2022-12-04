const User = require('../models/User')
const Food = require('../models/Food')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors')
// {{URL}}/customer
const getUserInfor = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });
    res.status(StatusCodes.OK).json({
        id: user._id,
        userName: user.name,
        image: user.image,
        phone: user.phone,
        gender: user.gender,
        birthday: user.birthday,
        email: user.email,
        address: user.address,
        typeOf: user.typeOf,
        orderList: user.orderList,
        orderPrice: user.orderPrice
    })
}
// {{URL}}/customer/profile
const updateUserProfile = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });
    const { phone, gender, address, image, birthday } = req.body
    if (!phone && !gender && !address && !image && !birthday) {
        throw new BadRequestError("Please enter at least 1 fields to update user profile (phone, gender, address)")
    }
    else {
        const userUpdate = await User.findByIdAndUpdate(
            {
                _id: user._id,
            },
            req.body,
            { new: true, runValidators: true }
        )
        res.status(StatusCodes.OK).json({
            id: userUpdate._id,
            name: userUpdate.name,
            image: userUpdate.image,
            phone: userUpdate.phone,
            gender: userUpdate.gender,
            birthday: userUpdate.birthday,
            email: userUpdate.email,
            address: userUpdate.address,
            typeOf: userUpdate.typeOf
        });
    }

}
// {{URL}}/customer/cart
const getAllItems = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId }); // lấy ra đúng user đang login
    res.status(StatusCodes.OK).json({ userName: user.name, orderList: user.orderList, orderPrice: user.orderPrice })
}

// {{URL}}/customer/cart/:foodId
const createItem = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });

    const { quantity = 1 } = req.body;
    const { foodId } = req.params;
    const food = await Food.findOne({ _id: foodId });
    const checkFoodExist = user.orderList.some((order) => {
        return order.foodId === foodId;
    })
    if (food === null) {
        throw new NotFoundError(`Dont have food with id: ${foodId}`)
    }
    else if (checkFoodExist) {
        throw new BadRequestError(`Already have food with id ${foodId} in cart`)
    }
    else {
        const item = { foodId: foodId, name: food.name, totalPrice: food.price * quantity, image: food.image, quantity: quantity };
        user.orderList.push(item);
        req.body.orderList = user.orderList;
        req.body.orderPrice = req.body.orderList.reduce((total, order) => {
            return total + order.totalPrice;
        }, 0)
        const userUpdate = await User.findByIdAndUpdate(
            {
                _id: user._id,
            },
            req.body,
            { new: true, runValidators: true }
        )
        res.status(StatusCodes.OK).json({ msg: `Add ${foodId} successfully`, name: userUpdate.name, orderList: userUpdate.orderList, orderLength: userUpdate.orderList.length, orderPrice: userUpdate.orderPrice })

    }

}

// {{URL}}/customer/cart/delete/:foodId
const deleteItem = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });
    const { foodId } = req.params;
    const food = await Food.findOne({ _id: foodId });
    const checkFoodExist = user.orderList.some((order) => {
        return order.foodId === foodId;
    })
    if (!checkFoodExist) {
        throw new BadRequestError(`Dont exist food with id ${foodId} in cart`)
    }
    const indexDelete = user.orderList.map((order, index) => {
        if (order.foodId === foodId) {
            return index;
        }
    })
    for (let i = 0; i < indexDelete.length; i++) {
        if (indexDelete[i] || indexDelete[i] === 0) {
            let index = indexDelete[i];
            user.orderList.splice(index, 1);
        }
    }

    req.body.orderList = user.orderList;
    req.body.orderPrice = req.body.orderList.reduce((total, order) => {
        return total + order.totalPrice;
    }, 0)
    const userUpdate = await User.findByIdAndUpdate(
        {
            _id: user._id,
        },
        req.body,
        { new: true, runValidators: true }
    )
    res.status(StatusCodes.OK).json({ msg: `Delete food: ${foodId} successfully`, name: userUpdate.name, orderList: userUpdate.orderList, orderLength: userUpdate.orderList.length, orderPrice: userUpdate.orderPrice })

}

// {{URL}}/customer/cart/:foodId
const updateItem = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });
    const { quantity } = req.body;
    const { foodId } = req.params;
    const food = await Food.findOne({ _id: foodId });
    const checkFoodExist = user.orderList.some((order) => {
        return order.foodId === foodId;
    })
    if (!quantity) {
        throw new BadRequestError(`Quantity field can not be empty`)
    }
    else if (!checkFoodExist) {
        throw new BadRequestError(`Dont exist food with id ${foodId} in cart`)
    }
    else {
        newOrderList = user.orderList.map((order) => {
            if (order.foodId === foodId) {
                order.quantity = quantity;
                order.totalPrice = order.quantity * food.price;
            }
            return order;
        })
        req.body.orderList = newOrderList;
        req.body.orderPrice = newOrderList.reduce((total, order) => {
            return total + order.totalPrice;
        }, 0)
        const userUpdate = await User.findByIdAndUpdate(
            {
                _id: user._id,
            },
            req.body,
            { new: true, runValidators: true }
        )

        res.status(StatusCodes.OK).json({ msg: `Update quantity ${foodId} successfully`, name: userUpdate.name, orderList: userUpdate.orderList, orderLength: userUpdate.orderList.length, orderPrice: userUpdate.orderPrice })
    }
}
module.exports = {
    updateUserProfile,
    getUserInfor,
    getAllItems,
    updateItem,
    deleteItem,
    createItem,
}
/*main flow:
Khi create một item vào trong cart thì nó sẽ kiểm tra food có tồn tại chưa -> kiểm tra food item đó có nằm trong cart chưa
Khi getAllItems sẽ lấy toàn bộ item trong user's cart,
Khi updateItem sẽ update quantity của sản phẩm và tự động update tổng giá của sản phẩm và của giỏ hàng
Khi deleteItem sẽ update lại giỏ hàng mà xoá đi item được chọn
*/