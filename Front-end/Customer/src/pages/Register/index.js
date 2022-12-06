import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import request from '~/utils/request';
import Images from '~/assets/images';
import classes from '../Login/Login.module.scss';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [rewritePass, setRewritePass] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [validPass, setValidPass] = useState(false);
    const [validReWritePass, setValidRewritePass] = useState(false);

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
            alert('Lỗi đăng ký!!!');
            return;
        }
        var objResgister = {
            email: email,
            password: pass,
        };

        // make axios post
        await request
            .post('auth/register', objResgister)
            .then((res) => {
                console.log(res.data);
                setEmail('');
                setPass('');
                setRewritePass('');
                alert('Tài khoản hợp lệ!\nBạn đã đăng ký thàng công. Hãy quay về đăng nhập.');
            })
            .catch((error) => alert(error.response.data.msg));
        // setSuccess(true);
    }

    // useEffect(() => {}, [success]);

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
                            // ref={emailInput}
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
                    <p>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="Nhập mật khẩu của bạn"
                            // ref={passInput}
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
                            // ref={rewritePassInput}
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
                        <button id={classes.sub__btn} type="submit">
                            Đăng ký
                        </button>
                    </p>
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
