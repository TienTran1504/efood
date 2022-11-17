import Footer from './Footer';
import Header from './Header';

function DefaultLayout({ children }) {
    if (children.type.name === 'Profile' || children.type.name === 'UpdatePassword' || children.type.name === 'PaymentHistory') {
        return (
            <div>
                <div className="container">
                    <div className="content">{children}</div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <Header />
                <div className="container">
                    <div className="content">{children}</div>
                </div>
                <Footer />
            </div>
        );
    }
}


export default DefaultLayout;
