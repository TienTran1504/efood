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

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([]);
    const [currentUser, setCurrentUser] = useState(false);
    const profile = JSON.parse(localStorage.getItem('profile2')) || { bonus: 0, image: '' };
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
            title: `Bonus point: ${profile.bonus}`,
            disabled: true,
        },
    ];

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
                                    src={profile.image}
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
