require('dotenv').config();
const User = require('../models/User')
const Contact = require('../models/Contact')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors')
const nodemailer = require('nodemailer');
const sendMail = require('../service/sendMail');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const createContact = async (req, res) => {
    const { title, email, content } = req.body;
    if (!title || !email || !content) {
        throw new BadRequestError('Please provide title, email, content of contact')
    }
    const contact = await Contact.create({ ...req.body });
    res.status(StatusCodes.CREATED).json({ msg: "Create contact successfully", contact })
}
//{{URL}}/auth/updatepassword
const forgotPassword = async (req, res) => {
    const { email, password, repassword, otp, otpVerify } = req.body;
    if (otpVerify) {
        if (!email || !password || !repassword || !otp) {
            throw new BadRequestError('Please provide name,email, password and otp')
        }
        else if (password !== repassword) {
            throw new BadRequestError('Password and Repassword must be same')
        }
        else {
            //Hashing password
            const salt = await bcrypt.genSalt(10);
            const passwordHashed = await bcrypt.hash(password, salt)
            const updatePassword = {
                password: passwordHashed,
            };
            const OTP_verify = jwt.verify(otpVerify, process.env.JWT_SECRET);
            if (OTP_verify.OTP === otp) {
                const user = await User.findOneAndUpdate(
                    { email: email },
                    updatePassword,
                    { new: true, runValidators: true })
                res.status(StatusCodes.ACCEPTED).json({ user });
            }
            else {
                res.status(StatusCodes.OK).json({ msg: "Incorrect OTP" });
            }
        }
    }
    else {
        throw new BadRequestError('OTP does not exist');
    }
}
// {{URL}}/auth/otp
const createOTP = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide an email" });
    }
    else {
        const OTP = await sendMail(7, email);
        if (!OTP) {
            res.status(StatusCodes.BAD_REQUEST).json({ msg: "Sending gmail fail!!!" })
        }
        else {
            OTP_token = jwt.sign({ OTP }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
            res.status(StatusCodes.CREATED).json({ otpVerify: OTP_token });
        }
    }
}



// {{URL}}/auth/register
const register = async (req, res) => {
    const { name, email, password, otp, otpVerify } = req.body;
    if (otpVerify) {
        if (!name || !email || !password || !otp) {
            throw new BadRequestError('Please provide name,email, password and otp')
        }
        else {
            const OTP_verify = jwt.verify(otpVerify, process.env.JWT_SECRET);
            if (OTP_verify.OTP === otp) {
                const user = await User.create({ ...req.body });
                // const token = user.createJWT();
                res.status(StatusCodes.CREATED).json({
                    user: { userId: user._id, email: user.email, name: user.name, gender: user.gender, typeOf: user.typeOf }
                });
            }
            else {
                res.status(StatusCodes.OK).json({ msg: "Incorrect OTP" });
            }
        }
    }
    else {
        throw new BadRequestError('OTP does not exist');
    }
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
        user: { id: user.id, name: user.name, typeOf: user.typeOf, msg: "Login successfully" },
        token
    });
}
module.exports = {
    createContact,
    forgotPassword,
    createOTP,
    register,
    login,
}


//flow
/* 
B1: tạo tài khoản -> req.body sẽ yêu cầu tạo tài khoản -> tạo ra một token riêng cho tài khoản đó
B2: đăng nhập tài khoản -> check người dùng đã nhập tài khoản, password -> tìm tài khoản có email trùng với email đã nhập
    -> check password email đó nhập đúng chưa -> nếu đăng nhập thành công sẽ tạo token riêng để quản lý tài khoản đăng nhập lúc đó

    */

/*flow
B1: tạo tài khoản -> tạo mã OTP -> nhập thông tin cần thiết , thông tin OTP.
B2: đăng nhập tài khoản -> check người dùng đã nhập tài khoản, password -> tìm tài khoản có email trùng với email đã nhập
    -> check password email đó nhập đúng chưa -> nếu đăng nhập thành công sẽ tạo token riêng để quản lý tài khoản đăng nhập lúc đó
B3: Nếu quên mật khẩu thì sẽ phải updatePassword. Nhập email cần thiết và bấm gửi OTP -> nhập OTP sau đó nhập password, repassword
    Nếu email tồn tại thì sẽ update lại password của tài khoản đó. Nếu không tồn tại thì nó sẽ báo lỗi.
*/