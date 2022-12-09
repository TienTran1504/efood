import classes from './UpdatePassword.module.scss';
import Sidebar from '~/components/Layout/DefaultLayout/Sidebar';
import React, { useState, useRef, useEffect } from 'react';
import bgrImg from './userprofile-img/bgr2.jpg';
import avatar from './userprofile-img/meome.jpg';
import axios from 'axios';

function PassworkValid(password) 
{
    if(password.length >= 6)
    {
        return true;
    }
        return false;
}

function CheckPassEqual(password1, password2)
{
    if(password2 !== password1)
    {
        return false;
    }
        return true;
}

function UpdatePassword() {
    const [name, setName] = useState('');
    const [CurrentPass, setCurrentPass] = useState('');
    const [NewPass, setNewPass] = useState('');
    const [AgainPass, setAgainPass] = useState('');
    const [checkCurrentPassValid, setCheckCurrentPassValid] = useState(false);
    const [checkNewPassValid, setCheckNewPassValid] = useState(false);
    const [checkAgainPassValid, setCheckAgainPassValid] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const CurrentPassInput = useRef();
    const NewPassInput = useRef();
    const AgainPassInput = useRef();

    function handleSubmit2(e) {
        console.log(CurrentPass + ' ' + NewPass + ' ' + AgainPass);
        e.preventDefault();

        const headers = {
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzkwYjU2MDU3MTczMWE0NGEyMzE3MTIiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NzA1NzUyMDgsImV4cCI6MTY3MzE2NzIwOH0.bGor_YwVVKp2_jc8e0tLUCFLAXjQ6jyafCT4S8ywQPo',
        };
        const obj = {
            currentPassword: CurrentPass,
            newPassword: NewPass,
        };
        axios
            .patch(`http://localhost:3000/api/v1/customer/updatepassword`, obj, { headers: headers })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                alert("Mật khẩu hiện tại không đúng");
                console.log(error);
                setSaveSuccess(false);
                return;
            });


        if (CurrentPass === '' || NewPass === '' || AgainPass === '') {
            alert('Please fill all fields!')
            setCheckCurrentPassValid(true);
            setCheckNewPassValid(true);
            setCheckAgainPassValid(true);
            e.preventDefault();
            return;
        }
        else {
            setCheckCurrentPassValid(false);
            setCheckNewPassValid(false);
            setCheckAgainPassValid(false);
        }

        if (!PassworkValid(CurrentPass)) {
            alert("Passwork is not valid.");
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
            alert("Passwork is not valid.");
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
            alert("Again passwork is wrong.");
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
            alert("New passwork is same to old password.");
            setCheckNewPassValid(true);
            setNewPass('');
            NewPassInput.current.focus();
            e.preventDefault();
            return;
        }
        else {
            setCheckNewPassValid(false);
        }
        
        setSaveSuccess(true);
        setTimeout(() => {
            setSaveSuccess(false);
        }, 2000)

    }

    useEffect(() => {
        const headers ={ 'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzgwN2ViNjllODIxYTMyMDA1N2ViZDAiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NzAwODU1NTQsImV4cCI6MTY3MjY3NzU1NH0.CbfYvU3dRalURXHYfX8sFifDyINaJHe_iJZ3X1SxjNc"};
        axios.get(`http://localhost:3000/api/v1/customer`, {headers : headers}).then((res) => {
            setName(res.data.userName);
        }).catch(error => {
          console.log(error)
        })
    }, [])

    return (
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
                            </div>

                            {!saveSuccess && <button onClick={handleSubmit2} type="submit" className={classes['save__btn']}>LƯU THAY ĐỔI</button>}
                            {saveSuccess  && <button onClick={handleSubmit2} type="submit" className={`${classes['save__btn']} ${classes['save__btn--successful']}`}>LƯU THÀNH CÔNG</button>}
                        </form>
                    </div>

                    <div className={classes['content__avt']}>
                        <div>
                            <img src={avatar} alt="Ảnh nền" className={classes['background']}></img>
                        </div>
                    </div>

                    <span className={classes['nickname']}>{name}</span>

                </div>
            </div>
        </div>
    )
}

export default UpdatePassword;