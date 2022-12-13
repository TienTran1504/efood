import Footer from './Footer';
import Header from './Header';
import classes from './DefaultLayout.module.scss';
function DefaultLayout({ children }) {
    if (
        children.type.name === 'Profile' ||
        children.type.name === 'UpdatePassword' ||
        children.type.name === 'PaymentHistory'
    ) {
        return (
            <div>
                <div className={classes.container}>
                    <div className={classes.content}>{children}</div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <Header />
                <div className={classes.container}>
                    <div className={classes.content}>{children}</div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default DefaultLayout;
