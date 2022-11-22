import classes from './Sidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef } from 'react';
import { faUser } from '@fortawesome/free-regular-svg-icons';

import { faChartSimple, faBox, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { Link, useLocation } from 'react-router-dom';

const obj = [
    {
        heading: 'DASHBOARD',
        link: '/',
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
        heading: 'LOG OUT',
        link: '/login',
        icon: faArrowRightFromBracket,
    },
];

function Sidebar() {
    const path = useLocation();

    return (
        <div className={classes['navbar']}>
            <Link to="/">
                <div className={classes['navbar__logo']}></div>
            </Link>
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
            </ul>
        </div>
    );
}
export default Sidebar;
