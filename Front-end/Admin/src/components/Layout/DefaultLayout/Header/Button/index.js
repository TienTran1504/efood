import styles from './Button.module.scss';
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles)
function Button({
    to,
    href,
    onClick,
    small = false,
    medium = false,
    large = false,
    primary = false,
    disabled = false,
    rightIcon = false,
    leftIcon = false,
    className,
    children,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };
    //Remove event listener when btn is disabled
    if (disabled) {
        Object.keys(props).forEach(key => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a'
    }
    const classes = cx('wrapper', {
        [className]: className,
        primary,
        small,
        medium,
        large,
        disabled,
    })

    return (
        <Comp className={classes} {...props} >
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {/* Nếu có left icon thì thêm vào thẻ span */}
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;