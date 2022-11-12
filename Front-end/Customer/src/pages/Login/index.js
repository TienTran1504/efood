import React from 'react';
import { Link } from 'react-router-dom';
import Images from '~/assets/images';
import classes from './Login.module.scss';

export default function LoginPage() {
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
                        <br /> <br />
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
