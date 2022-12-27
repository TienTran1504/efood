import classes from './Sidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import images from '~/assets/images'
import { faChartSimple, faBox, faArrowRightFromBracket, faAddressBook } from '@fortawesome/free-solid-svg-icons';

import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
    {
        heading: 'CONTACTS',
        link: '/contacts',
        icon: faAddressBook,
    },
];

function Sidebar() {
    const usenavigate = useNavigate();
    const path = useLocation();
    const [selectedImage, setSelectedImage] = useState(null);
    var profile = JSON.parse(localStorage.getItem('profile')) || { username: '', image: '' };

    console.log(profile);

    // const [dialogConfirm, setDialogConfirm] = useState(false);

    // function areUSureDelete() {
    //     console.log(dialogConfirm);
    // }

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
        localStorage.removeItem('users');
        localStorage.removeItem('bills');
        localStorage.removeItem('profile');
        localStorage.setItem('user-state', false);

        usenavigate('/');
    }
    return (
        <div className={classes['navbar']}>
            <div className={classes['navbar__avt']}>
                <div>
                    <img
                        // src={selectedImage !== null ? URL.createObjectURL(selectedImage) : profile.image}
                        src={images.logoImage}
                        alt="Ảnh nền"
                        className={classes['background']}
                    ></img>
                </div>
            </div>

            <span className={classes['nickname']}>{profile.username}</span>


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
