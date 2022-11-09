import Button from '~/components/Layout/DefaultLayout/Header/Button'
import styles from './Menu.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function MenuItem({ handleLogOut, data }) {
    const classes = cx('menu-item', {
        separate: data.separate,

    })

    return (
        <Button onClick={data.logOut && handleLogOut} className={classes} leftIcon={data.icon} to={data.to} disabled={data.disabled} > {
            data.title
        }
        </Button>
    );
}

export default MenuItem;
//  onClick ={data.separate===true ? {}:{}}