import React from 'react';
import HeroSlider, { Slide } from 'hero-slider';

const img1 = 'https://i.imgur.com/j7YxcrK.jpeg';
const img2 = 'https://i.imgur.com/Gu5Cznz.jpg';
const img3 = 'https://i.imgur.com/fcsJk7e.jpeg';
const img4 = 'https://i.imgur.com/CUG0Aof.jpeg';
const img5 = 'https://i.imgur.com/mjicxPK.jpeg';

const Slider = () => {
    return (
        <HeroSlider
            height={'60vh'}
            autoplay
            controller={{
                initialSlide: 1,
                slidingDuration: 250,
                slidingDelay: 100,
            }}
        >
            <Slide
                background={{
                    backgroundImageSrc: img1,
                    backgroundAttachment: 'fixed',
                }}
            />
            <Slide
                background={{
                    backgroundImageSrc: img2,
                    backgroundAttachment: 'fixed',
                }}
            />
            <Slide
                background={{
                    backgroundImageSrc: img3,
                    backgroundAttachment: 'fixed',
                }}
            />
            <Slide
                background={{
                    backgroundImageSrc: img4,
                    backgroundAttachment: 'fixed',
                }}
            />
            <Slide
                background={{
                    backgroundImageSrc: img5,
                    backgroundAttachment: 'fixed',
                }}
            />
        </HeroSlider>
    );
};

export default Slider;
