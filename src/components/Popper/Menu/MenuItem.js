import Button from '~/components/Button'
import styles from './Menu.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function MenuItem({ data }) {
    const classes = cx('menu-item', {
        separate: data.separate,

    })

    return (
        <Button className={classes} leftIcon={data.icon} to={data.to} disabled={data.disabled}>{
            data.title
        }
        </Button>
    );
}

export default MenuItem;