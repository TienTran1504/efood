import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import request from '~/utils/request';
import Images from '~/assets/images';
import classes from '../Login/Login.module.scss';
import Swal from 'sweetalert2';

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [pass, setPass] = useState('');
    const [validPass, setValidPass] = useState(false);

    const [rewritePass, setRewritePass] = useState('');
    const [validReWritePass, setValidRewritePass] = useState(false);

    const [otp, setOtp] = useState('');
    const [otpVerify, setOtpVerify] = useState('');
    const [confirmEmail, setConfirmEmail] = useState(false);

    async function handleSentOtp() {
        await request
            .post('auth/otp', { email: email })
            .then((res) => {
                setConfirmEmail(true);
                setOtpVerify(res.data.otpVerify);
                Swal.fire({
                    title: 'OPT đã được gửi tới email!',
                    text: 'Bạn hãy điền thông tin đăng ký và nhập mã OTP',
                    icon: 'success',
                    confirmButtonText: 'Hoàn tất',
                    width: '50rem',
                });
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Email của bạn không đúng!',
                    width: '50rem',
                });
            });
    }

    function handleEmailCheck() {
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const checkEmail = mailFormat.test(email);

        if (!checkEmail) setValidEmail(true);
        else setValidEmail(false);
    }

    function handlePasswordCheck() {
        const passFormat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        const checkPass = passFormat.test(pass);
        if (!checkPass) setValidPass(true);
        else setValidPass(false);
    }

    function handleRewritePassCheck() {
        if (rewritePass !== pass && !validPass) setValidRewritePass(true);
        else setValidRewritePass(false);
        console.log(validEmail, pass, rewritePass);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (validEmail || validPass || validReWritePass) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Thông tin của bạn không đúng!',
                width: '50rem',
            });
            return;
        }
        var objResgister = {
            name: 'Long dep trai',
            email: email,
            password: pass,
            otp: otp,
            otpVerify: otpVerify,
        };

        // make axios post
        await request
            .post('auth/register', objResgister)
            .then((res) => {
                setEmail('');
                setPass('');
                setRewritePass('');
                setOtp('');
                setConfirmEmail(false);
                Swal.fire({
                    title: 'Đăng kí thành công!',
                    text: 'Tài khoản hợp lệ. Hãy quay về đăng nhập',
                    icon: 'success',
                    confirmButtonText: 'Hoàn tất',
                    width: '50rem',
                });
            })
            .catch((error) => {
                if (
                    error.response.data.msg === 'Duplicate value entered for email field, please choose another value'
                ) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: 'Đã có tài khoản với email này!',
                        width: '50rem',
                    });
                    setEmail('');
                    setPass('');
                    setRewritePass('');
                    setOtp('');
                    setConfirmEmail(false);
                } else if (error.response.data.msg === 'Incorrect OTP') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: 'Mã OTP không đúng!',
                        width: '50rem',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: error.response.data.msg,
                        width: '50rem',
                    });
                }
            });
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.wrapper__logo}>
                <img src={Images.logoImage} alt="none" />
            </div>
            <div className={classes.wrapper__form}>
                <h2>Đăng Ký</h2>
                <form onSubmit={handleSubmit}>
                    <p>
                        <input
                            type="text"
                            name="first__name"
                            required
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={handleEmailCheck}
                        />
                        <text>
                            {validEmail ? (
                                <div>
                                    <FontAwesomeIcon icon={faExclamationCircle} />
                                    Email không hợp lệ.
                                </div>
                            ) : (
                                ''
                            )}
                        </text>
                    </p>
                    {!confirmEmail ? (
                        <p>
                            <button type="button" value="OTP" id={classes.sub__btn} onClick={handleSentOtp}>
                                Gửi OTP
                            </button>
                        </p>
                    ) : (
                        <>
                            <p>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    placeholder="Nhập mật khẩu của bạn"
                                    value={pass}
                                    onChange={(e) => setPass(e.target.value)}
                                    onBlur={handlePasswordCheck}
                                />
                                <text>
                                    {validPass ? (
                                        <div className={classes.error__password}>
                                            <FontAwesomeIcon icon={faExclamationCircle} />
                                            Tối thiểu 6 ký tự, ít nhất một chữ cái và một số.
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </text>
                            </p>
                            <p>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    placeholder="Xác nhận mật khẩu"
                                    value={rewritePass}
                                    onChange={(e) => setRewritePass(e.target.value)}
                                    onBlur={handleRewritePassCheck}
                                />
                                <text>
                                    {validReWritePass ? (
                                        <div className={classes.error__rewrite__password}>
                                            <FontAwesomeIcon icon={faExclamationCircle} />
                                            Mật khẩu không trùng khớp.
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </text>
                            </p>
                            <p>
                                <input
                                    type="text"
                                    name="OTP"
                                    required
                                    placeholder="Nhập mã OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </p>
                            <p>
                                <button id={classes.sub__btn} type="submit">
                                    Đăng ký
                                </button>
                            </p>
                        </>
                    )}
                </form>
                <footer>
                    <p>
                        Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                    </p>
                </footer>
            </div>
        </div>
    );
}
