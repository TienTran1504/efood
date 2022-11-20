import React from 'react';
import Iframe from 'react-iframe'
import classes from './Service.module.scss';

function Service() {
    return (
        <div className={classes['map__container']}>
        <div className={classes['map__uppon']}></div>
            <Iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d504.3108111436982!2d106.68247330986283!3d10.762772649055195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1c06f4e1dd%3A0x43900f1d4539a3d!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaG9hIGjhu41jIFThu7Egbmhpw6puIC0gxJDhuqFpIGjhu41jIFF14buRYyBnaWEgVFAuSENN!5e0!3m2!1svi!2s!4v1668735924769!5m2!1svi!2s" width='100%' height='91%' style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></Iframe>
        </div>
    );
}

export default Service;