import classes from './Sidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { faUser } from '@fortawesome/free-regular-svg-icons';

import { faChartSimple, faBox, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import defaultavatar from './sidar-img/logo.png';

const obj = [
    {
        heading: 'DASHBOARD',
        link: '/dashboard',
        icon: faChartSimple,
    },
    {
        heading: 'PRODUCTS',
        link: '/upload',
        icon: faBox,
    },
    {
        heading: 'USER',
        link: '/users',
        icon: faUser,
    },
];

function Sidebar() {
    const usenavigate = useNavigate();
    const path = useLocation();
    const [selectedImage, setSelectedImage] = useState(null);
    const [dialogConfirm, setDialogConfirm] = useState(false);

    function areUSureDelete() {
        console.log(dialogConfirm);
    }

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
        });
    }

    function hanldeLogout() {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('products');
        localStorage.removeItem('user');
        localStorage.removeItem('bills');
        localStorage.setItem('user-state', false);

        usenavigate('/');
    }
    return (
        <div className={classes['navbar']}>
            <div className={classes['navbar__avt']}>
                <div>
                    <img
                        src={selectedImage !== null ? URL.createObjectURL(selectedImage) : defaultavatar}
                        alt="Ảnh nền"
                        className={classes['background']}
                    ></img>
                </div>
            </div>

            <span className={classes['nickname']}>Admin</span>

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
                        setSelectedImage(event.target.files[0]);
                    }}
                    id="upload-button"
                    type="file"
                    className={classes['avt__change']}
                    accept="image/*"
                />

                <label onClick={() => setSelectedImage(null)} htmlFor="upload-button"></label>
            </div>

            <ul className={classes['navbar__list']}>
                {obj.map((item, idx) => (
                    <li
                        key={idx}
                        className={`${classes['navbar__item']} 
                             ${path.pathname === item.link ? classes['navbar__item--actived'] : ''}`}
                    >
                        <Link to={item.link} className={classes['navbar__item-link']}>
                            <FontAwesomeIcon className={classes['navbar__item-icon']} icon={item.icon} />
                            {item.heading}
                        </Link>
                    </li>
                ))}
                <li>
                    <div onClick={hanldeLogout} className={classes['navbar__item']}>
                        <FontAwesomeIcon className={classes['navbar__item-icon']} icon={faArrowRightFromBracket} />
                        LOG OUT
                    </div>
                </li>
            </ul>
        </div>
    );
}
export default Sidebar;
