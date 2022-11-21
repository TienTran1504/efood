import Sidebar from "./Sidebar";
import classes from './DefaultLayout.module.scss'

function DefaultLayout({ children }) {
    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                <Sidebar />
                <div className={classes.content}>{children}</div>
            </div>
        </div>

    );
}

export default DefaultLayout;