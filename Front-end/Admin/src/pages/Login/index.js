import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import request from '~/utils/request';
import Images from '~/assets/images';
import classes from './Login.module.scss';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [currentUser, setCurrentUser] = useState(() => {
        const storageUserState = JSON.parse(localStorage.getItem('user-state'));
        return storageUserState;
    });

    function handleLogin() {}
    async function handleSubmit(e) {
        e.preventDefault();
        // make axios post
        var objLogin = {
            email: email,
            password: pass,
        };
        console.log(objLogin.email, objLogin.password);
        // make axios post
        await request
            .post('auth/login', objLogin)
            .then((res) => {
                console.log(res.data.token);
                localStorage.setItem('user-state', true);
                localStorage.setItem('userId', res.data.user.id);
                localStorage.setItem('token', res.data.token);
                setCurrentUser(true);
            })
            .catch((error) => {
                console.log(error.response.data.msg);
            });
    }
    return (
        <div className={classes.wrapper}>
            <div className={classes.wrapper__logo}>
                <img src={Images.logoImage} alt="none" />
            </div>
            <div className={classes.wrapper__form}>
                <h2>Đăng nhập</h2>
                <form
                    action="/"
                    onSubmit={currentUser ? handleLogin : handleSubmit}
                    className={classes.form__container}
                >
                    <p>
                        <input
                            type="text"
                            name="first__name"
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </p>
                    <p>
                        <input
                            type="password"
                            name="password"
                            placeholder="Nhập mật khẩu của bạn"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                        />
                        <br />
                        <Link to="/forgot">
                            <label className="right-label">Quên mật khẩu?</label>
                        </Link>
                    </p>
                    <p>
                        <button id={classes.sub__btn} type="submit" onClick={handleLogin}>
                            Đăng nhập
                        </button>
                    </p>
                </form>
                <footer>
                    <p>
                        Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
                    </p>
                </footer>
            </div>
        </div>
    );
}
