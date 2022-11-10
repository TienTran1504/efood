import React from 'react';
import { Link } from 'react-router-dom';
import Images from '~/assets/images';
import classes from '../Login/Login.module.scss';

export default function SignUpPage() {
    return (
        <div className={classes.wrapper}>
            <div className={classes.wrapper__logo}>
                <img src={Images.logoImage} alt="none" />
            </div>
            <div className={classes.wrapper__form}>
                <h2>Đăng nhập</h2>
                <form action="/home">
                    <p>
                        <input type="text" name="first__name" placeholder="Nhập gmail của bạn" />
                    </p>
                    <p>
                        <input type="text" name="password" placeholder="Nhập mật khẩu của bạn" />
                    </p>
                    <p>
                        <input type="text" name="password" placeholder="Xác nhận mật khẩu" />
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
