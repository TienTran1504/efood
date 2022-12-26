import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';

import request from '~/utils/request';
import Images from '~/assets/images';
import classes from './Login.module.scss';
import Swal from 'sweetalert2';

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);

    const loginNavigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [currentUser, setCurrentUser] = useState(() => {
        const storageUserState = JSON.parse(localStorage.getItem('user-state'));
        return storageUserState;
    });

    useEffect(() => {
        if (currentUser) loginNavigate('/');
    }, [currentUser]);

    async function handleSubmit(e) {
        e.preventDefault();
        // make axios post
        var objLogin = {
            email: email,
            password: pass,
        };

        setIsLoading(true);
        // make axios post
        await request
            .post('auth/login', objLogin)
            .then(async (res) => {
                var profile;

                await request
                    .get('customer', { headers: { Authorization: 'Bearer ' + res.data.token } })
                    .then((res) => (profile = { image: res.data.image, bonus: res.data.bonus }))
                    .catch((res) => console.log(res));

                console.log(profile);
                console.log(res.data);
                localStorage.setItem('user-state', true);
                localStorage.setItem('userId', res.data.user.id);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('profile2', JSON.stringify(profile));

                setCurrentUser(true);
                Swal.fire({
                    title: 'Đăng nhập thành công!',
                    icon: 'success',
                    confirmButtonText: 'Hoàn tất',
                    width: '50rem',
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Email hoặc mật khẩu của bạn không đúng!',
                    width: '50rem',
                });
            });
        setIsLoading(false);
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.wrapper__logo}>
                <img src={Images.logoImage} alt="none" />
            </div>
            <div className={classes.wrapper__form}>
                <h2>Đăng nhập</h2>
                <form action="/" onSubmit={handleSubmit}>
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
                        <button id={classes.sub__btn} type="submit">
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
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
