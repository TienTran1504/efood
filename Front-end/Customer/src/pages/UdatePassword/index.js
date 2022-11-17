import classes from './UpdatePassword.module.scss';
import Sidebar from '~/components/Layout/DefaultLayout/Sidebar';
import React, { useState, useRef } from 'react';
import bgrImg from './userprofile-img/bgr2.jpg';
import avatar from './userprofile-img/meome.jpg';

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
    const [CurrentPass, setCurrentPass] = useState('');
    const [NewPass, setNewPass] = useState('');
    const [AgainPass, setAgainPass] = useState('');
    const [checkCurrentPassValid, setCheckCurrentPassValid] = useState(false);
    const [checkNewPassValid, setCheckNewPassValid] = useState(false);
    const [checkAgainPassValid, setCheckAgainPassValid] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const CurrentPassInput = useRef();
    const NewPassInput = useRef();
    const AgainPassInput = useRef();

    function handleSubmit2(e) {
        console.log(CurrentPass + ' ' + NewPass + ' ' + AgainPass);
        e.preventDefault();

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
                            <img src={selectedImage !== null ? URL.createObjectURL(selectedImage) : avatar} alt="Ảnh nền" className={classes['background']}></img>
                        </div>
                    </div>

                    <span className={classes['nickname']}>AnhKhoi123</span>

                    <div className={classes['choose__avt']}>
                        <svg width="20" height="18" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.05 17H0.95C0.425125 17 0 16.5774 0 16.0556V2.83333C0 2.31153 0.425125 1.88889 0.95 1.88889H4.75V0.944444C4.75 0.422639 5.17513 0 5.7 0H13.3C13.8249 0 14.25 0.422639 14.25 0.944444V1.88889H18.05C18.5749 1.88889 19 2.31153 19 2.83333V16.0556C19 16.5774 18.5749 17 18.05 17ZM1.9 15.1111H17.1V3.77778H13.3C12.7751 3.77778 12.35 3.35514 12.35 2.83333V1.88889H6.65V2.83333C6.65 3.35514 6.22487 3.77778 5.7 3.77778H1.9V15.1111Z" fill="#969695"></path><path d="M9.5 14.1666C6.88038 14.1666 4.75 12.0487 4.75 9.44439C4.75 6.84008 6.88038 4.72217 9.5 4.72217C12.1196 4.72217 14.25 6.84008 14.25 9.44439C14.25 12.0487 12.1196 14.1666 9.5 14.1666ZM9.5 6.61106C7.92775 6.61106 6.65 7.88133 6.65 9.44439C6.65 11.0074 7.92775 12.2777 9.5 12.2777C11.0722 12.2777 12.35 11.0074 12.35 9.44439C12.35 7.88133 11.0722 6.61106 9.5 6.61106Z" fill="#969695"></path></svg>

                        <input name="myImage"
                            onChange={(event) => {
                                console.log(event.target.files[0]);
                                setSelectedImage(event.target.files[0]);
                            }}
                            id="upload-button" type="file" className={classes['avt__change']} accept="image/*" />

                        <label onClick={() => setSelectedImage(null)} htmlFor="upload-button"></label>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default UpdatePassword;