import React from 'react';
import HeroSlider, { Slide } from 'hero-slider';
import classes from './Slider.module.scss';

const Slider = (props) => {
    return (
        <React.Fragment>
            {/* <div className="slogan__content">
                <h2>Slide slogan</h2>
                <p>Describe</p>
                <hr />
            </div> */}
            <HeroSlider
                height={props.height}
                autoplay={{
                    autoplayDuration: 3000,
                }}
                controller={{
                    slidingDuration: 500,
                    slidingDelay: 200,
                }}
            >
                {props.sliderPage.map((slide, index) => {
                    return (
                        <Slide
                            key={index}
                            background={{
                                backgroundImageSrc: slide.image,
                                backgroundAttachment: 'fixed',
                            }}
                        />
                    );
                })}
            </HeroSlider>
            <div id={classes.box__content}>
                <h2>NO GOOD NO PAY</h2>
            </div>
        </React.Fragment>
    );
};

export default Slider;
