const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors')
// {{URL}}/auth/register
const register = async (req, res) => {

    // if (!name || !email || !password) {
    //     throw new BadRequestError('Please provide name,email and password')
    // }
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    // console.log(user);
    res.status(StatusCodes.CREATED).json({
        user: { userId: user._id, name: user.name, gender: user.gender, typeOf: user.typeOf },
        token
    });
}
// {{URL}}/auth/login
const login = async (req, res) => {
    const { email, password } = req.body;
    //check email, password insert
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }

    const user = await User.findOne({ email })

    //check exists email
    if (!user) {
        throw new UnauthenticatedError("Invalid email credentials");
    }
    //compare password
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Invalid password credentials");
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
        user: { name: user.name, typeOf: user.typeOf, msg: "Login successfully" },
        token
    });

}
module.exports = {
    register,
    login,
}

//flow
/* 
B1: tạo tài khoản -> req.body sẽ yêu cầu tạo tài khoản -> tạo ra một token riêng cho tài khoản đó
B2: đăng nhập tài khoản -> check người dùng đã nhập tài khoản, password -> tìm tài khoản có email trùng với email đã nhập
    -> check password email đó nhập đúng chưa -> nếu đăng nhập thành công sẽ tạo token riêng để quản lý tài khoản đăng nhập lúc đó
*/