const Bill = require('../models/Bill')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError, UnauthenticatedError } = require('../errors')
//get all jobs of user by userid (for admin)
//{{URL}}/bills?limit
const getAllBills = async (req, res) => {
    const userCheck = await User.findOne({ _id: req.user.userId });
    if (userCheck.typeOf === 'admin') {
        const { limit } = req.query;
        const bills = await Bill.find({}).sort('createdAt')
        let sortedBills = [...bills];
        if (limit) {
            sortedBills = sortedBills.slice(0, Number(limit));
        }
        if (sortedBills.length < 1) {
            return res.status(StatusCodes.OK).json({ msg: "No bills match your search" });
        }
        res.status(StatusCodes.OK).json({ sortedBills, count: sortedBills.length });
    }
    else {
        // throw new UnauthenticatedError(`User ${userCheck._id} have no permission`)
        throw new UnauthenticatedError(`User have no permission`)
    }
}
//get bills by userId (for admin)
//{{URL}}/bills/user/:id
const getBillbyUserId = async (req, res) => {
    const userCheck = await User.findOne({ _id: req.user.userId });
    if (userCheck.typeOf === 'admin') {
        const bills = await Bill.find({ createdBy: req.params.id }).sort('createdAt')
        res.status(StatusCodes.OK).json({ bills, count: bills.length });
    }
    else {
        throw new UnauthenticatedError(`User have no permission`)
    }
}
//get bill by bill id (admin)
//{{URL}}/bills/:id
const getBill = async (req, res) => {
    const userCheck = await User.findOne({ _id: req.user.userId });
    if (userCheck.typeOf === 'admin') {
        const { params: { id: billId } } = req; // req.user.userId, req.params.id

        const bill = await Bill.findOne({
            _id: billId,
        })
        if (!bill) {
            throw new NotFoundError(`No bill with id ${billId}`)
        }
        res.status(StatusCodes.OK).json({ bill })
    }
    else {
        throw new UnauthenticatedError(`User have no permission`)

    }
}
// get bills of account (logged in) (customer or admin)
//{{URL}}/bills/user
const getUserBills = async (req, res) => {
    const bills = await Bill.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ bills, count: bills.length });
}
//{{URL}}/bills
const createBill = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId })

    console.log(user)
    if (!!user.orderList) {
        req.body.createdBy = req.user.userId;
        req.body.orderList = user.orderList;
        req.body.total = user.orderPrice;

        const bill = await Bill.create(req.body);

        req.body.orderList.splice(0);
        const userCart = await User.findOneAndUpdate(
            {
                _id: user._id,
            },
            req.body,
            { new: true, runValidators: true }
        );

        res.status(StatusCodes.CREATED).json({
            bill
        })
    }
    else {
        throw new NotFoundError(`No food in cart`)
    }
}
//{{URL}}/bills/:id
const updateBill = async (req, res) => {
    const userCheck = await User.findOne({ _id: req.user.userId });
    if (userCheck.typeOf === 'admin') {
        const {
            body: { status },
            user: { userId },
            params: { id: billId },
        } = req;

        if (status === '') {
            throw new BadRequestError('status fields cannot be empty');
        }

        const bill = await Bill.findByIdAndUpdate(
            {
                _id: billId,
                status: status,
                createdBy: userId
            },
            req.body,
            { new: true, runValidators: true }
        )

        if (status === 'delivered') {
            const billFind = await Bill.findOne({ _id: billId });
            req.body.total = Math.round(billFind.total / 10);
            const user = await User.findOneAndUpdate(
                {
                    _id: billFind.createdBy
                },
                { bonus: req.body.total },
                { new: true, runValidators: true }
            )
        }
        if (!bill) {
            throw new NotFoundError(`No bill with id ${billId}`)
        }
        res.status(StatusCodes.OK).json({ bill })
    }
    else {
        throw new UnauthenticatedError(`User have no permission`)

    }
}
//{{URL}}/bills/:id
const deleteBill = async (req, res) => {
    const userCheck = await User.findOne({ _id: req.user.userId });
    if (userCheck.typeOf === 'admin') {
        const {
            user: { userId },
            params: { id: billId },
        } = req;

        const bill = await Bill.findByIdAndRemove({
            _id: billId,
            createdBy: userId,
        })

        if (!bill) {
            throw new NotFoundError(`No bill with id ${billId}`)
        }
        res.status(StatusCodes.OK).json({ msg: `Delete bill ID: ${billId} successfully ` })
    }
    else {
        throw new UnauthenticatedError(`User have no permission`)

    }
}
module.exports = {
    getAllBills,
    getBill,
    getUserBills,
    getBillbyUserId,
    createBill,
    updateBill,
    deleteBill,
}
/* main flow:
Khi createBill thì sẽ check xem người đó có thêm item trong cart chưa nếu rồi thì sẽ thêm giá và orderList vô model Bill
cuối cùng sau khi tạo bill thì orderList sẽ bị xoá.
Khi getAllBills (chỉ admin) thì sẽ lấy toàn bộ bills đã đc tạo
Khi getBill (chỉ admin) lấy bill có id bill được nhập
Khi getUserBills (account đang login) lấy bills của user
Khi getBillbyUserId (chỉ admin) lấy bills của id user được nhập
Khi updateBill thì sẽ chỉnh sửa trạng thái của đơn hàng thì sẽ cập nhật điểm thưởng cho người dùng theo giá trị 1/10
*/