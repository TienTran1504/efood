const User = require('../models/User')
const Food = require('../models/Food')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors')
// {{URL}}/customer/cart
const getAllItems = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId }); // lấy ra đúng user đang login
    if (user.typeOf === 'customer') {
        res.status(StatusCodes.OK).json({ userName: user.name, orderList: user.orderList, orderPrice: user.orderPrice })
    }
    else {
        // throw new UnauthenticatedError(`User ${userCheck._id} have no permission`)
        throw new UnauthenticatedError(`User have no permission`)
    }
}

// {{URL}}/customer/cart/:foodId
const createItem = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });
    if (user.typeOf === 'customer') {
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
    else {
        throw new UnauthenticatedError(`User have no permission`)
    }
}

// {{URL}}/customer/cart/delete/:foodId
const deleteItem = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });
    if (user.typeOf === 'customer') {
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
        res.status(StatusCodes.OK).json({ msg: `Delete ${foodId} successfully`, name: userUpdate.name, orderList: userUpdate.orderList, orderLength: userUpdate.orderList.length, orderPrice: userUpdate.orderPrice })
    }
    else {
        throw new UnauthenticatedError(`User have no permission`)
    }

}

// {{URL}}/customer/cart/:foodId
const updateItem = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });
    if (user.typeOf === 'customer') {
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
    else {
        throw new UnauthenticatedError(`User have no permission`)

    }
}
module.exports = {
    getAllItems,
    updateItem,
    deleteItem,
    createItem,
}
/*main flow:
Khi create một item vào trong cart thì nó sẽ kiểm tra food có tồn tại chưa -> kiểm tra food item đó có nằm trong cart chưa
Khi getAllItems sẽ lấy toàn bộ item trong cart,
Khi updateItem sẽ update quantity của sản phẩm và tổng giá của sản phẩm và của giỏ hàng
Khi deleteItem sẽ update lại giỏ hàng mà xoá đi item được chọn
*/