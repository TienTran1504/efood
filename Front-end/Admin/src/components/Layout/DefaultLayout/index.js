import Footer from "./Footer";
import Header from "./Header"
import Sidebar from "./Sidebar";
import classes from './DefaultLayout.module.scss'

function DefaultLayout({ children }) {
    return (
        <div className={classes.wrapper}>
            <Header />
            <div className={classes.container}>
                <Sidebar />
                <div className={classes.content}>{children}</div>
            </div>
            <Footer />

        </div>

    );
}

export default DefaultLayout;