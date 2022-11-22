import Sidebar from './Sidebar';
import classes from './DefaultLayout.module.scss';

function DefaultLayout({ children }) {
    function check() {
        if (
            children.type.name === 'LoginPage' ||
            children.type.name === 'ForgotPassword' ||
            children.type.name === 'ChangePassword'
        )
            return false;
        return true;
    }
    console.log(children);
    return (
        <div className={classes.wrapper}>
            {!check() ? (
                <div>
                    <div>{children}</div>
                </div>
            ) : (
                <div className={classes.container}>
                    <Sidebar className={classes.sidebar__container} />
                    <div className={classes.content}>{children}</div>
                </div>
            )}
        </div>
    );
}

export default DefaultLayout;
