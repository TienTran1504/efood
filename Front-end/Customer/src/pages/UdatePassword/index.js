import classes from './UpdatePassword.module.scss';
import Sidebar from '~/components/Layout/DefaultLayout/Sidebar';
import React, { useState, useRef, useEffect } from 'react';
import bgrImg from './userprofile-img/bgr2.jpg';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

function PassworkValid(password) {
    if (password.length >= 6) {
        return true;
    }
    return false;
}

function CheckPassEqual(password1, password2) {
    if (password2 !== password1) {
        return false;
    }
    return true;
}

function UpdatePassword() {
    const [name, setName] = useState('');
    const [CurrentPass, setCurrentPass] = useState('');
    const [NewPass, setNewPass] = useState('');
    const [AgainPass, setAgainPass] = useState('');
    const [imgURL, setimgURL] = useState('');
    const [checkCurrentPassValid, setCheckCurrentPassValid] = useState(false);
    const [checkNewPassValid, setCheckNewPassValid] = useState(false);
    const [checkAgainPassValid, setCheckAgainPassValid] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const CurrentPassInput = useRef();
    const NewPassInput = useRef();
    const AgainPassInput = useRef();
    const tokenAuth = 'Bearer ' + JSON.stringify(localStorage.getItem('token')).split('"').join('');
    const headers = {
        Authorization: tokenAuth,
    };

    function handleSubmit2(e) {
        console.log(CurrentPass + ' ' + NewPass + ' ' + AgainPass);
        e.preventDefault();

        if (CurrentPass === '' || NewPass === '' || AgainPass === '') {
            alert('Please fill all fields!')
            // setCheckCurrentPassValid(true);
            // setCheckNewPassValid(true);
            // setCheckAgainPassValid(true);
            e.preventDefault();
            return;
        }
        else {
            setCheckCurrentPassValid(false);
            setCheckNewPassValid(false);
            setCheckAgainPassValid(false);
        }

        if (!PassworkValid(CurrentPass)) {
            setCheckCurrentPassValid(true);
            setCurrentPass('');
            CurrentPassInput.current.focus();
            e.preventDefault();
            return;
        }
        else {
            setCheckCurrentPassValid(false);
        }

        if (!PassworkValid(NewPass)) {
            setCheckNewPassValid(true);
            setNewPass('');
            NewPassInput.current.focus();
            e.preventDefault();
            return;
        }
        else {
            setCheckNewPassValid(false);
        }

        if (!CheckPassEqual(NewPass, AgainPass)) {
            setCheckAgainPassValid(true);
            setAgainPass('');
            AgainPassInput.current.focus();
            e.preventDefault();
            return;
        }
        else {
            setCheckAgainPassValid(false);
        }

        if (CheckPassEqual(CurrentPass, NewPass)) {
            setCheckNewPassValid(true);
            setNewPass('');
            NewPassInput.current.focus();
            e.preventDefault();
            return;
        }
        else {
            setCheckNewPassValid(false);
        }

        if (!checkCurrentPassValid && !checkNewPassValid && !checkAgainPassValid) {
            const obj = {
                currentPassword: CurrentPass,
                newPassword: NewPass,
            };
            axios
                .patch(`http://localhost:3000/api/v1/customer/updatepassword`, obj, { headers: headers })
                .then((res) => {
                    console.log(res);
                    setSaveSuccess(true);
                })
                .catch((error) => {
                    console.log(error);
                    setCheckCurrentPassValid(true);
                    setCurrentPass('');
                });

            setTimeout(() => {
                setSaveSuccess(false);
            }, 3000)
        }
        else {
            setSaveSuccess(false);
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/customer`, { headers: headers }).then((res) => {
            setName(res.data.userName);
            setimgURL(res.data.image);
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <div>
            <div className={classes['main']}>
                <Sidebar />

                <div className={classes['contain__main']}>
                    <div className={classes['content']}>
                        <div className={classes['background__contain']}>
                            <img
                                src={bgrImg}
                                alt="Background Image"
                                className={classes['content__background']}
                            />
                        </div>
                        <div className={classes['content__information']}>
                            <div className={classes['content__information-label']}>
                                <h2>ĐỔI MẬT KHẨU</h2>
                            </div>
                            <form className={classes['content__form']}>
                                <div className={classes['content__form-text']}>
                                    <div className={classes['content__form-start']}>
                                        <label htmlFor="inputCrt"></label>
                                        Mật khẩu hiện tại
                                    </div>
                                    <input
                                        id="inputCrt"
                                        type="password"
                                        className={classes['content__form-input']}
                                        placeholder="Nhập mật khẩu hiện tại"
                                        ref={CurrentPassInput}
                                        value={CurrentPass}
                                        onChange={(e) => setCurrentPass(e.target.value)}
                                    />
                                    <text>
                                        {checkCurrentPassValid ? (
                                            <div className={classes['error__password']}>
                                                <FontAwesomeIcon icon={faExclamationCircle} style={{ paddingRight: '4px' }} />
                                                Mật khẩu không khớp
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                    </text>
                                </div>
                                <div className={classes['content__form-text']}>
                                    <div className={classes['content__form-start']}>
                                        <label htmlFor="inputnew"></label>
                                        Nhập mật khẩu mới
                                    </div>
                                    <input
                                        id="inputnew"
                                        type="password"
                                        className={classes['content__form-input']}
                                        placeholder="Nhập mật khẩu mới"
                                        ref={NewPassInput}
                                        value={NewPass}
                                        onChange={(e) => setNewPass(e.target.value)}
                                    />
                                    <text>
                                        {checkNewPassValid ? (
                                            <div className={classes['error__password']}>
                                                <FontAwesomeIcon icon={faExclamationCircle} style={{ paddingRight: '4px' }} />
                                                Mật khẩu mới không hợp lệ
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                    </text>
                                </div>
                                <div className={classes['content__form-text']}>
                                    <div className={classes['content__form-start']}>
                                        <label htmlFor="againnew"></label>
                                        Xác nhận mật khẩu mới
                                    </div>
                                    <input
                                        id="againnew"
                                        type="password"
                                        className={classes['content__form-input']}
                                        placeholder="Xác nhận mật khẩu mới"
                                        ref={AgainPassInput}
                                        value={AgainPass}
                                        onChange={(e) => setAgainPass(e.target.value)}
                                    />
                                    <text>
                                        {checkAgainPassValid ? (
                                            <div className={classes['error__password']}>
                                                <FontAwesomeIcon icon={faExclamationCircle} style={{ paddingRight: '4px' }} />
                                                Mật khẩu xác nhận không khớp
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                    </text>
                                </div>

                                {!saveSuccess && <button onClick={handleSubmit2} type="submit" className={classes['save__btn']}>LƯU THAY ĐỔI</button>}
                                {saveSuccess && <button onClick={handleSubmit2} type="submit" className={`${classes['save__btn']} ${classes['save__btn--successful']}`}>LƯU THÀNH CÔNG</button>}
                            </form>
                        </div>

                        <div className={classes['content__avt']}>
                            <div>
                                <img src={imgURL} alt="Ảnh nền" className={classes['background']}></img>
                            </div>
                        </div>

                        <span className={classes['nickname']}>{name}</span>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default UpdatePassword;