import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Images from '~/assets/images';
import classes from '../Login/Login.module.scss';

export default function ForgotPassword() {
    const [gmail, setGmail] = useState('');
    const gmailInput = useRef();

    function handleSubmit(e) {
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const checkGmail = mailFormat.test(gmail);
        if (!checkGmail) {
            e.preventDefault();
            alert('Lỗi!\nGmail của bạn không hợp lệ.');
        }
    }
    return (
        <div className={classes.wrapper}>
            <div className={classes.wrapper__logo}>
                <img src={Images.logoImage} alt="none" />
            </div>
            <div className={classes.wrapper__form}>
                <h2>Quên mật khẩu</h2>
                <form action="/changePass">
                    <p>
                        <input
                            type="text"
                            name="first__name"
                            placeholder="Nhập gmail của bạn"
                            ref={gmailInput}
                            value={gmail}
                            onChange={(e) => setGmail(e.target.value)}
                        />
                    </p>
                    <p>
                        <button id={classes.sub__btn} type="submit" onClick={handleSubmit}>
                            Gửi mã về gmail
                        </button>
                    </p>
                </form>
                <footer>
                    <p>
                        <Link to="/login">Trở lại đăng nhập</Link>
                    </p>
                </footer>
            </div>
        </div>
    );
}
