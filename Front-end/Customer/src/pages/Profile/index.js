import classes from './Profile.module.scss';
import Sidebar from '~/components/Layout/DefaultLayout/Sidebar';
import React, { useState, useRef, useEffect } from 'react';
import bgrImg from './userprofile-img/bgr2.jpg';
import avatar from './userprofile-img/meome.jpg';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PhoneNumberValid(number) {
    return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
}

function GenderValid(gender) {
    if (gender === 'Nam' || gender === 'nam' || gender === 'Nữ' || gender === 'nữ') {
        return true;
    }

    return false;
}

function EmailValid(email) {
    var atposition = email.indexOf('@');
    var dotposition = email.lastIndexOf('.');
    if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= email.length) {
        return false;
    } else {
        return true;
    }
}

function Profile() {
    const [Name, setName] = useState('');
    const [Phone, setPhone] = useState('');
    const [Email, setEmail] = useState('');
    const [Gender, setGender] = useState('');
    const [Address, setAddress] = useState('');
    const [checkNameValid, setCheckNameValid] = useState(false);
    const [checkPhoneValid, setCheckPhoneValid] = useState(false);
    const [checkEmailValid, setCheckEmailValid] = useState(false);
    const [checkGenderValid, setCheckGenderValid] = useState(false);
    const [checkAddressValid, setCheckAddressValid] = useState(false);
    const [imgURL, setimgURL] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const params = useParams();
    const NameInput = useRef();
    const PhoneInput = useRef();
    const EmailInput = useRef();
    const GenderInput = useRef();
    const AddressInput = useRef();

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    if (selectedImage !== null) {
        convertToBase64(selectedImage).then((data) => {
            // console.log(data);
            setimgURL(data);
        });
    }

    useEffect(() => {
        const headers = {
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzgwN2ViNjllODIxYTMyMDA1N2ViZDAiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NzAwODU1NTQsImV4cCI6MTY3MjY3NzU1NH0.CbfYvU3dRalURXHYfX8sFifDyINaJHe_iJZ3X1SxjNc',
        };
        axios
            .get(`http://localhost:3000/api/v1/customer`, { headers: headers })
            .then((res) => {
                setName(res.data.userName);
                setEmail(res.data.email);
                setGender(res.data.gender.charAt(0).toUpperCase() + res.data.gender.slice(1));
                setAddress(res.data.address);
                setPhone(res.data.phone);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function handleSubmit1(e) {
        e.preventDefault();
        const headers = {
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzgwN2ViNjllODIxYTMyMDA1N2ViZDAiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NzAwODU1NTQsImV4cCI6MTY3MjY3NzU1NH0.CbfYvU3dRalURXHYfX8sFifDyINaJHe_iJZ3X1SxjNc',
        };
        const obj = {
            phone: Phone,
            gender: Gender.charAt(0).toLowerCase() + Gender.slice(1),
            address: Address,
            image: imgURL,
        };
        axios
            .patch(`http://localhost:3000/api/v1/customer/profile`, obj, { headers: headers })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });

        if (Name === '' || Phone === '' || Email === '' || Gender === '' || Address === '') {
            alert('Please fill all fields!');
            setCheckNameValid(true);
            setCheckEmailValid(true);
            setCheckGenderValid(true);
            setCheckPhoneValid(true);
            setCheckAddressValid(true);
            e.preventDefault();
            return;
        } else {
            setCheckNameValid(false);
            setCheckEmailValid(false);
            setCheckGenderValid(false);
            setCheckPhoneValid(false);
            setCheckAddressValid(false);
        }

        if (Name.length < 3) {
            alert('This name is not exist.');
            setCheckNameValid(true);
            setName('');
            NameInput.current.focus();
            e.preventDefault();
            return;
        } else {
            setCheckNameValid(false);
        }

        if (!PhoneNumberValid(Phone)) {
            alert('Phone is not exist.');
            setCheckPhoneValid(true);
            setPhone('');
            PhoneInput.current.focus();
            e.preventDefault();
            return;
        } else {
            setCheckPhoneValid(false);
        }

        if (!EmailValid(Email)) {
            alert('Email is not exist.');
            setCheckEmailValid(true);
            setEmail('');
            EmailInput.current.focus();
            e.preventDefault();
            return;
        } else {
            setCheckEmailValid(false);
        }

        if (!GenderValid(Gender)) {
            alert('Gender is not exist.');
            setCheckGenderValid(true);
            setGender('');
            GenderInput.current.focus();
            e.preventDefault();
            return;
        } else {
            setCheckGenderValid(false);
        }

        setSaveSuccess(true);
        setTimeout(() => {
            setSaveSuccess(false);
        }, 2000);
    }

    return (
        <div className={classes['main']}>
            <Sidebar />

            <div className={classes['contain__main']}>
                <div className={classes['content']}>
                    <div className={classes['background__contain']}>
                        <img src={bgrImg} alt="Background Image" className={classes['content__background']} />
                    </div>
                    <div className={classes['content__information']}>
                        <form className={classes['content__form']}>
                            <div className={classes['content__form-text']}>
                                <div className={classes['content__form-start']}>
                                    <label htmlFor="ipname"></label>
                                    <p>Họ và tên</p>
                                    <p style={{ color: 'red' }}>*</p>
                                </div>
                                <input
                                    id="ipname"
                                    className={classes['content__form-input']}
                                    placeholder="Nhập họ và tên"
                                    ref={NameInput}
                                    value={Name}
                                    onChange={(e) => setName(e.target.value)}
                                ></input>
                            </div>
                            <div className={classes['content__form-text']}>
                                <div className={classes['content__form-start']}>
                                    <label htmlFor="iddate"></label>
                                    <p>Ngày sinh</p>
                                </div>
                                <input
                                    id="iddate"
                                    type="date"
                                    className={classes['content__form-input']}
                                    placeholder="Nhập ngày sinh"
                                ></input>
                            </div>
                            <div className={classes['content__form-text']}>
                                <div className={classes['content__form-start']}>
                                    <label htmlFor="idphone"></label>
                                    <p>Số điện thoại</p>
                                    <p style={{ color: 'red' }}>*</p>
                                </div>
                                <input
                                    id="idphone"
                                    className={classes['content__form-input']}
                                    placeholder="Nhập số điện thoại"
                                    ref={PhoneInput}
                                    value={Phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                ></input>
                            </div>
                            <div className={classes['content__form-text']}>
                                <div className={classes['content__form-start']}>
                                    <label htmlFor="idemail"></label>
                                    <p>Email</p>
                                    <p style={{ color: 'red' }}>*</p>
                                </div>
                                <input
                                    id="idemail"
                                    type="email"
                                    className={classes['content__form-input']}
                                    placeholder="Nhập email"
                                    ref={EmailInput}
                                    value={Email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></input>
                            </div>
                            <div className={classes['content__form-text']}>
                                <div className={classes['content__form-start']}>
                                    <label htmlFor="idgender"></label>
                                    <p>Giới tính</p>
                                    <p style={{ color: 'red' }}>*</p>
                                </div>
                                <input
                                    id="idgender"
                                    className={classes['content__form-input']}
                                    placeholder="Nam/Nữ"
                                    ref={GenderInput}
                                    value={Gender}
                                    onChange={(e) => setGender(e.target.value)}
                                ></input>
                            </div>
                            <div className={classes['content__form-text']}>
                                <div className={classes['content__form-start']}>
                                    <label htmlFor="idaddress"></label>
                                    <p>Địa chỉ mặc định</p>
                                    <p style={{ color: 'red' }}>*</p>
                                </div>
                                <input
                                    id="idaddress"
                                    className={classes['content__form-input']}
                                    placeholder="Nhập địa chỉ"
                                    ref={AddressInput}
                                    value={Address}
                                    onChange={(e) => setAddress(e.target.value)}
                                ></input>
                            </div>

                            {!saveSuccess && (
                                <button onClick={handleSubmit1} type="submit" className={classes['save__btn']}>
                                    LƯU THAY ĐỔI
                                </button>
                            )}
                            {saveSuccess && (
                                <button
                                    onClick={handleSubmit1}
                                    type="submit"
                                    className={`${classes['save__btn']} ${classes['save__btn--successful']}`}
                                >
                                    LƯU THÀNH CÔNG
                                </button>
                            )}
                        </form>
                    </div>

                    <div className={classes['content__avt']}>
                        <div>
                            <img
                                src={selectedImage !== null ? URL.createObjectURL(selectedImage) : avatar}
                                alt="Ảnh nền"
                                className={classes['background']}
                            ></img>
                        </div>
                    </div>

                    <span className={classes['nickname']}>{Name}</span>

                    <div className={classes['choose__avt']}>
                        <svg width="20" height="18" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M18.05 17H0.95C0.425125 17 0 16.5774 0 16.0556V2.83333C0 2.31153 0.425125 1.88889 0.95 1.88889H4.75V0.944444C4.75 0.422639 5.17513 0 5.7 0H13.3C13.8249 0 14.25 0.422639 14.25 0.944444V1.88889H18.05C18.5749 1.88889 19 2.31153 19 2.83333V16.0556C19 16.5774 18.5749 17 18.05 17ZM1.9 15.1111H17.1V3.77778H13.3C12.7751 3.77778 12.35 3.35514 12.35 2.83333V1.88889H6.65V2.83333C6.65 3.35514 6.22487 3.77778 5.7 3.77778H1.9V15.1111Z"
                                fill="#969695"
                            ></path>
                            <path
                                d="M9.5 14.1666C6.88038 14.1666 4.75 12.0487 4.75 9.44439C4.75 6.84008 6.88038 4.72217 9.5 4.72217C12.1196 4.72217 14.25 6.84008 14.25 9.44439C14.25 12.0487 12.1196 14.1666 9.5 14.1666ZM9.5 6.61106C7.92775 6.61106 6.65 7.88133 6.65 9.44439C6.65 11.0074 7.92775 12.2777 9.5 12.2777C11.0722 12.2777 12.35 11.0074 12.35 9.44439C12.35 7.88133 11.0722 6.61106 9.5 6.61106Z"
                                fill="#969695"
                            ></path>
                        </svg>

                        <input
                            name="myImage"
                            onChange={(event) => {
                                console.log(event.target.files[0]);
                                setSelectedImage(event.target.files[0]);
                            }}
                            id="upload-button"
                            type="file"
                            className={classes['avt__change']}
                            accept="image/*"
                        />

                        <label onClick={() => setSelectedImage(null)} htmlFor="upload-button"></label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
