import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Images from '~/assets/images';
import classes from '../Login/Login.module.scss';

export default function ForgotPassword() {
    const [pass, setPass] = useState('');
    const [rewritePass, setRewritePass] = useState('');
    const passInput = useRef();
    const rewritePassInput = useRef();

    function handleSubmit(e) {
        if (pass === '') alert('Bạn chưa nhập mật khẩu mới!');
        else if (pass !== rewritePass) alert('Mật khẩu của bạn không trùng khớp!');
        else alert('Thay đổi mật khẩu thành công!\nHãy quay về đăng nhập.');
        setPass('');
        setRewritePass('');
        e.preventDefault();
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.wrapper__logo}>
                <img src={Images.logoImage} alt="none" />
            </div>
            <div className={classes.wrapper__form}>
                <h2>Thay đổi mật khẩu</h2>
                <form action="/home">
                    <p>
                        <input
                            type="password"
                            name="first__name"
                            placeholder="Nhập mật khẩu mới"
                            ref={passInput}
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                        />
                    </p>
                    <p>
                        <input
                            type="password"
                            name="first__name"
                            placeholder="Xác nhận mật khẩu"
                            ref={rewritePassInput}
                            value={rewritePass}
                            onChange={(e) => setRewritePass(e.target.value)}
                        />
                    </p>
                    <p>
                        <button id={classes.sub__btn} type="submit" onClick={handleSubmit}>
                            Thay đổi
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
