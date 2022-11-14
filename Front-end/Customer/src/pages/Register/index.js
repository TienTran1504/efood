import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Images from '~/assets/images';
import classes from '../Login/Login.module.scss';

export default function SignUpPage() {
    const [gmail, setGmail] = useState('');
    const [pass, setPass] = useState('');
    const [rewritePass, setRewritePass] = useState('');
    const gmailInput = useRef();
    const passInput = useRef();
    const rewritePassInput = useRef();

    function handleSubmit(e) {
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const checkGmail = mailFormat.test(gmail);

        if (!checkGmail || pass === '' || pass !== rewritePass) {
            if (!checkGmail) alert('Lỗi!\nGmail của bạn không hợp lệ.');
            else if (pass === '') alert('Bạn chưa nhập mật khẩu!');
            else alert('Mật khẩu của bạn không trùng khớp!');
        } else alert('Tài khoản hợp lệ!\nBạn đã đăng ký thàng công. Hãy quay về đăng nhập.');

        setGmail('');
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
                <h2>Đăng Ký</h2>
                <form action="/home">
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
                        <input
                            type="password"
                            name="password"
                            placeholder="Nhập mật khẩu của bạn"
                            ref={passInput}
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                        />
                    </p>
                    <p>
                        <input
                            type="password"
                            name="password"
                            placeholder="Xác nhận mật khẩu"
                            ref={rewritePassInput}
                            value={rewritePass}
                            onChange={(e) => setRewritePass(e.target.value)}
                        />
                    </p>
                    <p>
                        <button id={classes.sub__btn} type="submit" onClick={handleSubmit}>
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
