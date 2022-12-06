import Footer from './Footer';
import Header from './Header';
import LoginPage from '~/pages/Login';

import { useState } from 'react';
function DefaultLayout({ children }) {
    const [currentUser, setCurrentUser] = useState(() => {
        const storageUserState = JSON.parse(localStorage.getItem('switchToLoginPage'));
        return storageUserState;
    });

    const handleLogin = () => {
        localStorage.setItem('switchToLoginPage', false);
        setCurrentUser(false);
    };

    if (
        children.type.name === 'Profile' ||
        children.type.name === 'UpdatePassword' ||
        children.type.name === 'PaymentHistory'
    ) {
        return (
            <div>
                <div className="container">
                    <div className="content">{children}</div>
                </div>
            </div>
        );
    } else if (children.type.name === 'Home') {
        return (
            <div>
                <Header />
                <div className="container">
                    <div className="content">{!currentUser ? children : <LoginPage />}</div>
                </div>
                <Footer />
            </div>
        );
    } else {
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
