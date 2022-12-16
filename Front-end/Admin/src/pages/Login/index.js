import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import request from '~/utils/request';
import Images from '~/assets/images';
import classes from './Login.module.scss';
import Swal from 'sweetalert2';

export default function LoginPage() {
    const loginNavigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [currentUser, setCurrentUser] = useState(() => {
        const storageUserState = JSON.parse(localStorage.getItem('user-state'));
        return storageUserState;
    });

    useEffect(() => {
        if (currentUser) {
            loginNavigate('/dashboard');
        }
    }, [currentUser]);

    async function handleSubmit(e) {
        e.preventDefault();
        var objLogin = {
            email: email,
            password: pass,
        };

        await request
            .post('auth/login', objLogin)
            .then(async (res) => {
                console.log(res.data);
                localStorage.setItem('user-state', true);
                localStorage.setItem('userId', res.data.user.id);
                localStorage.setItem('token', res.data.token);
                let timerInterval;
                Swal.fire({
                    title: 'Đang tải...',
                    html: 'Vui lòng bạn hãy đợi một chút',
                    timer: 20000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    },
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log('I was closed by the timer');
                    }
                });

                await request
                    .get('bills', { headers: { Authorization: 'Bearer ' + res.data.token } })
                    .then((res) => {
                        var newBills = [];
                        res.data.sortedBills.forEach((value, index) => {
                            var newbill = {
                                orderId: value._id,
                                payMethod: value.method,
                                date: value.createdAt,
                                status: value.status,
                                total: value.total,
                            };
                            newBills = [...newBills, newbill];
                        });
                        localStorage.setItem('bills', JSON.stringify(newBills));
                    })
                    .catch((err) => console.log(err));

                await request
                    .get('foods', { headers: { Authorization: 'Bearer ' + res.data.token } })
                    .then((res) => {
                        var newFoods = [];
                        res.data.sortedFoods.forEach((value, index) => {
                            var newFood = {
                                id: value._id,
                                name: value.name,
                                typeOf: value.typeOf,
                                price: value.price,
                                image: value.image,
                            };
                            newFoods = [...newFoods, newFood];
                        });
                        localStorage.setItem('products', JSON.stringify(newFoods));
                    })
                    .catch((err) => console.log(err));

                await request
                    .get('admin', { headers: { Authorization: 'Bearer ' + res.data.token } })
                    .then((res) => {
                        var newUsers = [];
                        res.data.sortedUsers.forEach((value, index) => {
                            var newUser = {
                                id: value._id,
                                name: value.name,
                                email: value.email,
                                gender: value.gender,
                                typeOf: value.typeOf,
                                image: value.image,
                            };
                            newUsers = [...newUsers, newUser];
                        });
                        localStorage.setItem('users', JSON.stringify(newUsers));
                    })
                    .catch((err) => console.log(err));
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
    }
    return (
        <div className={classes.wrapper}>
            <div className={classes.wrapper__logo}>
                <img src={Images.logoImage} alt="none" />
            </div>
            <div className={classes.wrapper__form}>
                <h2>Đăng nhập</h2>
                <form onSubmit={handleSubmit} className={classes.form__container}>
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
        </div>
    );
}
