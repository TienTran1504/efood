import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Images from '~/assets/images';
import classes from './Login.module.scss';

export default function LoginPage() {
    const [gmail, setGmail] = useState('');
    const [pass, setPass] = useState('');
    const [checkGmailValid, setCheckGmailValid] = useState(false);
    const [checkPassValid, setCheckPassValid] = useState(false);
    const gmailInput = useRef();
    const passInput = useRef();

    function handleSubmit(e) {
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const checkGmail = mailFormat.test(gmail);
        if (pass === '') {
            passInput.current.classList.add(classes.required);
            passInput.current.focus();
            setCheckPassValid(true);
            e.preventDefault();
        }

        if (!checkGmail) {
            gmailInput.current.classList.add(classes.required);
            gmailInput.current.focus();
            setCheckGmailValid(true);
            setGmail('');
            setPass('');
            e.preventDefault();
        } else {
            gmailInput.current.classList.remove(classes.required);
            setCheckGmailValid(false);
        }
    }
    return (
        <div className={classes.wrapper}>
            <div className={classes.wrapper__logo}>
                <img src={Images.logoImage} alt="none" />
            </div>
            <div className={classes.wrapper__form}>
                <h2>Đăng nhập</h2>
                <form action="/">
                    <p>
                        <input
                            type="text"
                            name="first__name"
                            placeholder="Nhập gmail của bạn"
                            ref={gmailInput}
                            value={gmail}
                            onChange={(e) => setGmail(e.target.value)}
                        />
                        <br />
                        <text>
                            {checkGmailValid ? (
                                <div>
                                    <FontAwesomeIcon icon={faExclamationCircle} />
                                    Gmail không hợp lệ.
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
                            placeholder="Nhập mật khẩu của bạn"
                            ref={passInput}
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                        />
                        <text>
                            {checkPassValid ? (
                                <div style={{ marginLeft: '4rem' }}>
                                    <FontAwesomeIcon icon={faExclamationCircle} />
                                    Bạn chưa nhập mật khẩu.
                                </div>
                            ) : (
                                ''
                            )}
                        </text>
                        <br />
                        <Link to="/forgot">
                            <label className="right-label">Quên mật khẩu?</label>
                        </Link>
                    </p>
                    <p>
                        <button id={classes.sub__btn} type="submit" onClick={handleSubmit}>
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
