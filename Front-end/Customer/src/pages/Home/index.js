import { useEffect, useState } from 'react';

import Slider from '~/components/Layout/DefaultLayout/Slider/index.js';
import { sliderHomeItems } from '~/components/Layout/DefaultLayout/Slider/SliderData';
import LoginPage from '../Login';

function Home() {
    const [currentUser, setCurrentUser] = useState(() => {
        const storageUserState = JSON.parse(localStorage.getItem('switchToLoginPage'));
        return storageUserState;
    });

    // useEffect(() => {}, [currentUser]);

    const handleLogin = () => {
        localStorage.setItem('switchToLoginPage', false);
        setCurrentUser(false);
    };

    return (
        <>
            {false ? (
                <LoginPage handleLogin={handleLogin} />
            ) : (
                <Slider
                    sliderPage={sliderHomeItems.sliderImage}
                    height={sliderHomeItems.height}
                    slogan={sliderHomeItems.slogan}
                    link={sliderHomeItems.link}
                />
            )}
        </>
    );
}

export default Home;
