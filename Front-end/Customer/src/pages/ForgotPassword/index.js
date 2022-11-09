import React from 'react';
import { Link } from 'react-router-dom';
import Images from '~/assets/images';
import classes from '../Login/Login.module.scss';

export default function ForgotPassword() {
    return (
        <div className={classes.wrapper}>
            <div className={classes.wrapper__logo}>
                <img src={Images.logoImage} alt="none" />
            </div>
            <div className={classes.wrapper__form}>
                <h2>Quên mật khẩu</h2>
                <form action="/home">
                    <p>
                        <input type="text" name="first__name" placeholder="Nhập gmail của bạn" />
                    </p>
                </form>
                <footer>
                    <p>
                        <Link to="/login">Trở lại đăng nhập</Link>.
                    </p>
                </footer>
            </div>
        </div>
    );
}
