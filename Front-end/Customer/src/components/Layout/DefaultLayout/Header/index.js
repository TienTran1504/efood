import classes from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping,
    faCircleQuestion,
    faCoins,
    faSignIn,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '~/components/Layout/DefaultLayout/Header/Button';
import Menu from '~/components/Layout/DefaultLayout/Header/Popper/Menu';
import Image from '~/components/Image';
import Search from './Search';
import ModalFood from './ModelFood';
import images from '~/assets/images';
const USER_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'View profile',
        to: '/profile',
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Location',
        to: '/location',
    },
    {
        icon: <FontAwesomeIcon icon={faCartShopping} />,
        title: 'Shopping cart',
        to: '/cart',
    },
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Sign out',
        to: '/login',
        separate: true,
        logOut: true,
    },
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'Bonus point: 100',
        disabled: true,
    },
];
function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([]);
    const [currentUser, setCurrentUser] = useState(false);

    useEffect(() => {
        const storageUserState = JSON.parse(localStorage.getItem('user-state'));
        setCurrentUser(storageUserState);
    });

    const path = useLocation();

    const handleLogOut = () => {
        const jsonUser = JSON.stringify(!currentUser);
        localStorage.setItem('user-state', jsonUser);
        const state = setCurrentUser(!currentUser);
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        return state;
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.inner}>
                <Link to="/" className={classes.label}>
                    <div className={classes.active}>E</div>FOOD
                </Link>

                <span>
                    <Search setIsOpen={setIsOpen} setData={setData} />
                </span>

                <div className={classes.actions}>
                    <ul className={classes['menu-list']}>
                        <li className={classes['menu-item']}>
                            <Link to="/" className={`${path.pathname === '/' ? classes.active : ''}`}>
                                Home
                            </Link>
                        </li>
                        <li className={classes['menu-item']}>
                            <Link to="/menu" className={`${path.pathname.includes('/menu') ? classes.active : ''}`}>
                                Menu
                            </Link>
                        </li>
                        <li className={classes['menu-item']}>
                            <Link
                                to="/location"
                                className={`${path.pathname.includes('/location') ? classes.active : ''}`}
                            >
                                Location
                            </Link>
                        </li>
                        <li className={classes['menu-item']}>
                            <Link
                                to="/contact"
                                className={`${path.pathname.includes('/contact') ? classes.active : ''}`}
                            >
                                Contact
                            </Link>
                        </li>
                        {JSON.stringify(localStorage.getItem('token')).split('"').join('') !== 'null' && (
                            <li className={classes['menu-item']}>
                                <Link to="/cart" className={`${path.pathname.includes('/cart') ? classes.active : ''}`}>
                                    <FontAwesomeIcon icon={faCartShopping} />
                                </Link>
                            </li>
                        )}
                    </ul>

                    {currentUser ? (
                        <Menu items={USER_ITEMS} handleLogOut={handleLogOut}>
                            <div className={classes['current-user']}>
                                <Image
                                    className={classes['user-avatar']}
                                    src="data:image/jpeg;base64,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"
                                    alt="avatar"
                                    fallback={images.noImage}
                                />
                            </div>
                        </Menu>
                    ) : (
                        <Link to="/login">
                            <Button primary rightIcon={<FontAwesomeIcon icon={faSignIn} />} medium>
                                Sign in
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
            {isOpen && <ModalFood setData={data} setIsOpen={setIsOpen} />}
        </div>
    );
}

export default Header;
