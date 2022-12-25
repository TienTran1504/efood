const Bill = require('../models/Bill')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError, UnauthenticatedError } = require('../errors')
//{{URL}}/bills?limit
const getAllBills = async (req, res) => {
    const userCheck = await User.findOne({ _id: req.user.userId });
    if (userCheck.typeOf === 'Admin') {
        const { limit } = req.query;
        const bills = await Bill.find({}).sort('createdAt')
        let sortedBills = [...bills];
        if (limit) {
            sortedBills = sortedBills.slice(0, Number(limit));
        }
        if (sortedBills.length < 1) {
            return res.status(StatusCodes.OK).json({ msg: "Dont have any bills to show", length: sortedBills.length });
        }
        res.status(StatusCodes.OK).json({ sortedBills, count: sortedBills.length });
    }
    else {
        throw new UnauthenticatedError(`User have no permission`)
    }
}
//get bills by userId (for admin)
//{{URL}}/bills/user/:id
const getBillbyUserId = async (req, res) => {
    const userCheck = await User.findOne({ _id: req.user.userId });
    if (userCheck.typeOf === 'Admin') {
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
    if (userCheck.typeOf === 'Admin') {
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

    if (user.orderList.length > 0) {
        req.body.createdBy = req.user.userId;
        req.body.orderList = user.orderList;
        // req.body.total = user.orderPrice;
        req.body.orderPrice = 0;
        const bill = await Bill.create({ ...req.body });

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
const feedbackBill = async (req, res) => {
    const { feedback } = req.body;
    const { id } = req.params;
    const userCheck = await User.findOne({ _id: req.user.userId });
    const billCheck = await Bill.findOne({ _id: id });

    if (!userCheck) {
        throw new NotFoundError(`Dont find any user ${userCheck._id}`)
    }
    if (!billCheck) {
        throw new NotFoundError(`No bill with id ${id}`)
    }
    if (billCheck.status !== 'Delivered') {
        throw new BadRequestError(`The status bill is invalid (must be Delivered but it is ${billCheck.status})`)
    }
    if (billCheck.feedbackStatus === 'True') {
        throw new BadRequestError(`This bill has already feedbacked`);
    }
    const bill = await Bill.findByIdAndUpdate(
        {
            _id: id,
            createdBy: userCheck._id
        },
        {
            feedback: feedback,
            feedbackStatus: 'True',
        },
        { new: true, runValidators: true }
    )
    res.status(StatusCodes.OK).json({ bill })
}

//{{URL}}/bills/:id
const updateBill = async (req, res) => {
    const userCheck = await User.findOne({ _id: req.user.userId });
    if (userCheck.typeOf === 'Admin') {
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

        if (status === 'Delivered') {
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
    if (userCheck.typeOf === 'Admin') {
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
    feedbackBill,
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