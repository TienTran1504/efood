import classes from './Sidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef } from 'react';
import {
    faUser,
    faRectangleList,
} from '@fortawesome/free-regular-svg-icons';

import {
    faLock,
    faArrowRightFromBracket,
    faHouse,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const obj = [
    {
        heading: 'Tài khoản',
        link: '/profile',
        icon: faUser,
    },
    {
        heading: 'Đổi mật khẩu',
        link: '/updatepassword',
        icon: faLock,
    },
    {
        heading: 'Lịch sử đơn hàng',
        link: '/paymenthistory',
        icon: faRectangleList,
    },
    {
        heading: 'Về trang chủ',
        link: '/',
        icon: faHouse
    }
]

function Sidebar() {
    const usenavigate = useNavigate();
    const path = useLocation();

    function hanldeLogout() {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('products');
        localStorage.removeItem('users');
        localStorage.removeItem('bills');
        localStorage.setItem('user-state', false);

        usenavigate('/login');
    }

    return (
        <div className={classes['navbar']}>
            <Link to='/menu'>
            <div className={classes['navbar__logo']}></div>
            </Link>
            <ul className={classes['navbar__list']}>
                {
                    obj.map((item, idx) => (
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
                    )
                    )
                }
            </ul>

            <div className={classes['navbar__logout']}>
                <div onClick={hanldeLogout} className={classes['navbar__logout-link']}>
                    <FontAwesomeIcon className={classes['navbar__item-icon-logout']} icon={faArrowRightFromBracket} />
                    LOG OUT
                </div>
            </div>
        </div>
    )
}

export default Sidebar;