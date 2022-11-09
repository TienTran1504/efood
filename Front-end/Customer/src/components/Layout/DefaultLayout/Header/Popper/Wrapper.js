import classes from './Popper.module.scss'
function Wrapper({ children, className }) {
    return <div className={`${classes.wrapper} ${className}`}>{children}</div>;
}

export default Wrapper;